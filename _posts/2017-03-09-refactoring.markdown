---
layout: post
title: "A refactoring story; Protocols, Keychain & More"
date: 2017-03-20 20:00:00
categories: swift refactoring app
---

_This is a bit of a random post about re-factoring some code that I wrote 16 months ago that was terrible, and ended up pretty happy with it._

This week at work I helped my colleague refactor a very small part of a cients' app - some code that I'd written 16 months prior that I knew needed attention. The goal was to add an App extension to the app, which involved refactoring the code that handles the OAuthToken in order to allow the extension to access it via a shared keychain.

When we sat down and looked at the problem, we identified the following that we would aim for:

- Migrate the keychain usage to a shared keychain
- Remove a singleton that stored the AccessToken
- Ensure there is one data store that both the App & Today Widget can share an OAuthAccessToken for their API requests
- Add some tests

<center>🤔</center>

To give you an idea of where we started, the APIClient looked like this:

```swift
final class APIClient {

    /// The `OAuthAccessToken` to use for authenticated requests.
    public var accessToken: OAuthAccessToken? = nil {
        didSet {
            if let accessToken = accessToken {
                let account = AccountManager.sharedInstance.account?.accountWithAccessToken(accessToken)
                AccountManager.sharedInstance.account = account
            } else {
                AccountManager.sharedInstance.account = nil
            }
        }
    }
    
    public init(accessToken: OAuthAccessToken? = nil) {
        self.accessToken = accessToken
    }
}
```

The APIClient used this `accessToken` to add the authorisation headers to any outgoing requests. Inside the `didSet` it also creates an Account which 'saves' it in the `AccountManager`.

One of the problems that we'd have when both the App and the Today Widget instantiated their own APIClient is the tokens becoming invalid after refreshing them. They would get out of sync as the token is not read from the same location, being an instance variable.

We found that there was one gotcha that wasn't clear with this code. If you initialise an `APIClient` using `init(accessToken: nil)`, you'd half expect `AccountManager.sharedInstance.account` to equal `nil`. This assumption is wrong, and looking into the Swift docs, `willSet` & `didSet` [observers are not called during initialization of the property](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-XID_368). Turned out that we didn't understand this behaviour, and it somehow allowed the logic in the app to work! There were points in the lifecycle where the local variable in the APIClient was different to the Account stored in the singleton, and it was partly due to this! That was a confusing hour or so figuring that out, and re-affirmed our belief that this needed refactoring.

There was Account model, which consists of a name & the OAuthToken, there was a singleton that stored the account that was used around the app, there were multiple places where instances of this Account model lived. It was near impossible to test & it was a mess.

## Removing the Singleton

In order to remove the `AccountManager` singleton, we decided to define a Swift Protocol. This would have the same interface as the singleton so we can swap it out with minimal hassel.

```swift
protocol AccountProvider {    
    var account: Account? { get set }
}

struct Account {
    let name: String?
    let accessToken: OAuthToken
}
```

And now we can replace the `accessToken` with our new `AccountProvider` protocol in the `APIClient`:

```swift
final class APIClient {

    public let accountProvider: AccountProvider

    public init(accountProvider: AccountProvider? = nil) {
        self.accountProvider = accountProvider
    }
}
```

Now we've made a generic AccountProvider who's job it is to provide get & set access to an `Account`. Let's make an `AccountProvider` that will persists the `Account` in a KeyValue store.

```swift
protocol KeyValueStoreType {
    func setValue(value: String?, for key: String)
    func get(for key: String) -> String?
}

final class KeyValueAccountProvider: AccountProvider {
    
    let store: KeyValueStoreType
    
    public init(store: KeyValueStoreType) {
        self.store = store
    }
    
    public var account: Account? {
        get { return self.fetchAccount() }
        set { self.saveAccount(newValue) }
    }

    private func fetchAccount() -> Account? {
        // Code to load the account from the keychain
    }

    private func saveAccount(account: Account?) {
        // Code to save the account into the keychain
    }
}
```

We introduced another protocol, `KeyValueStoreType` that will provide the backing store to this `KeyValueAccountProvider`. We did this for to allow us to create a mock `KeyValueStoreType` for our tests and test the behaviour of the `KeyValueAccountProvider`.

The Keychain is essentially a key-value store anyway, and to create a `KeyValueStoreType` from our keychain, we can write an extension to our`Keychain` class (from [KeychainAccess](https://github.com/kishikawakatsumi/KeychainAccess)) that will allow us to create our `KeyValueAccountProvider` with it.

```swift
import KeychainAccess

extension Keychain: KeyValueStoreType {

    func setValue(value: String?, for key: String) {
        self[key] = value
    }

    func get(for key: String) -> String {
        return self[key]
    }

}
```

You could even add an extenstion to `UserDefaults` to use as the backing store to our `KeyValueAccountProvider`, but as we're storing secret OAuthTokens, the keychain is the right choice for us.

And when we put all of this together, we can instantiate our APIClient with our `KeyValueAccountProvider` that uses the secure keychain as the backing store!

```swift
let keychain = Keychain(service: keychainService)
let keychainAccountProvider = AccountProvider(store: keychain)
let api = APIClient(accountProvider: keychainAccountProvider)
```

Gotta love that dependency injection! 💉

If we build and run, the app should work exactly like it did before. We're using the same Keychain keys when loading the `Account` so we'll still be logged in. However when running the code in the Today Extension there will be no `Account` in the `AccountProvider` as we're not using a shared keychain.

We can't simply change the keychain to a shared keychain as that will log every existing user out when they update the app 🤔.

Time for a new `AccountProvider`...

## Migrating to a shared keychain

Migrating data is always a pain as the migration code can become unweildy. It also must stay in your app's code for life.

What we need to do is attempt to read data from one `KeyValueAccountProvider`, and write data into another. As we defined our `AccountProvider` protocol we can do something really cool; We can create a new abstract type of `AccountProvider` that composes multiple `AccountProvider`'s together, which uses it's internal `AccountProvider`'s as it's backing store. The migration will then happen internally, and it'll be completely transparent to the outside!

Check out the implementation

```swift
final class MigrationAccountProvider: AccountProvider {
    
    let current: AccountProvider
    let previous: AccountProvider
    
    public init(current: AccountProvider, previous: AccountProvider) {
        self.current = current
        self.previous = previous
    }
    
    public var account: Account? {
        get { return self.fetchAccount() }
        set { self.saveAccount(newValue) }
    }

    private func fetchAccount() -> Account? {
        if let account = self.current.account {
            return account
        }

        return self.previous.account
    }

    private func saveAccount(account: Account?) {
        self.current.account = account
        // Clear old data
        self.previous.account = nil
    }
}
```

The class is a little bigger than the other `KeyValueAccountProvider`, but you should be able to understand whats going on. When we read a value, we first query the `current` `AccountProvider`, and if the value doesn't exist we then fallback to the previous (old) `AccountProvider`.

We should also be good citizens and clean up the previous AccountStore by setting the values as nil after setting them in the current provider. If you're using something other than a key-value store it may make sense to add a dedicated `clear()` function to the `AccountProvider` protocol, but this wasn't necessary for us.

```swift
let keychain = Keychain(service: keychainService)
let sharedKeychain = Keychain(service: keychainService, accessGroup: accessGroup)

let oldKeychainAccountProvider = KeyValueAccountProvider(store: keychain)
let sharedKeychainAccountProvider = KeyValueAccountProvider(store: sharedKeychain)

let accountProvider = MigrationAccountProvider(current: sharedKeychainAccountProvider, previous: oldKeychainAccountProvider)

let api = APIClient(accountProvider: accountProvider)
```

![image](/img/refactoring/migration-.svg)

How cool is that!? 👍

Eventually the account data will be sourced from the `current` provider, making the migration complete! I'd be tempted to remove the `MigrationAccountProvider` after six months or so, or whenever you can assume that every active user has used a version that has migrated their data to the shared keychain.

## Testing the migration

Writing tests that interface with the iOS keychain is difficult. Writing tests for our `KeyValueAccountStore` is not. Based on the assumption that our KeyValueType will work (that's okay, right? - we could write separate tests for it), we want to write some tests for our `MigrationAccountProvider` to ensure that we read from the correct backing `KeyValueType`. In our case this will be the Keychain & the shared Keychain.

One of the reason why we created the `KeyValueType` was so that we can create an object to use instead of the Keychain in our tests.

We can create a simple `MockKeyValueStore` to inject into our `KeyValueAccountStore` that uses a dictionary to store data.

```swift
class MockKeyValueStore: KeyValueType {

    var dictionary: [AnyHashable: String]

    init(dictionary: [AnyHashable: String]) {
        self.dictionary = dictionary
    }

    func setValue(value: String?, for key: String) {
        self.dictionary[key] = value
    }

    func get(for key: String) -> String {
        return self.dictionary[key]
    }
}
```

When writing tests I like to follow the **Given**, **When**, **Then** test layout. I am not very experienced in testing - something I'm working on - and I find it helps when trying to break down the test. First you set up the state (given), then you perform an action (when) and then you test the state (when).

![image](/img/refactoring/given-when-then.svg)

So basically we want to test 

```swift
func testKeyValueAccountProviderReturnsNoAccountWhenEmpty() {

    // Given
    let dictionary = [String: String]()
    let store = MockKeyValueStore(dictionary: dictionary)
    let accountProvider = KeyValueAccountProvider(store: store)

    // When
    let loadedAccount = accountProvider.account

    // Then
    XCAssertNil(loadedAccount)
}

func testKeyValueAccountProviderSavesAccount() {

    // Given
    let dictionary = [
        "account-name": "Will",
        "account-token": "123",
        "account-refresh-token": "456"
        "account-expires-at": "a date"
    ]
    let account = accountFromDictionary(dictionary)

    let store = MockKeyValueStore(dictionary: [:])
    let accountProvider = KeyValueAccountProvider(store: store)

    // When
    accountProvider.account = account

    // Then
    XCAssertNotNil(accountProvider.account)
    XCAssertEqual(dictionary, store.dictionary)
}
```

We can test the migration account provider with our `MockKeyValueStore` by creating a standard dictionary of values, instantiating our `KeyValueAccountProvider`'s and `MigrationAccountProvider`, performing an action, and finally asserting that the `MockKeyValueStore`'s dictionary has been modified in a way that we expect.

Our first `MigrationAccountProvider` tests that it returns an account from the `previousAccountProvider` if the `currentAccountProvider` is empty.

```swift
func testMigrationAccountProviderLoadsExistingAccount() {

    // Given
    let dictionary = [
        "account-name": "Will",
        "account-token": "123",
        "account-refresh-token": "456"
        "account-expires-at": "a date"
    ]
    let account = accountFromDictionary(dictionary)

    let oldStore = MockKeyValueStore(dictionary: dictionary)
    let newStore = MockKeyValueStore(dictionary: [:])
    let previousAccountProvider = KeyValueAccountProvider(store: oldStore)
    let currentAccountProvider = KeyValueAccountProvider(store: newStore)

    let migrationAccountProvider = MigrationAccountProvider(current: currentAccountProvider, previous: previousAccountProvider)

    // When
    let loadedAccount = migrationAccountProvider.account

    // Then
    XCAssertNotNil(loadedAccount)
}
```

Our second test ensures that when we write to the `MigrationAccountProvider`, the account is stored in the `currentAccountProvider`'s store and the `previousAccountProvider`'s store is cleared.

```swift
func testMigrationAccountProviderSavesToCurrentStore() {

    // Given
    let dictionary = [
        "account-name": "Will",
        "account-token": "123",
        "account-refresh-token": "456"
        "account-expires-at": "a date"
    ]
    let emptyDictionary = [AnyHashable: String]()
    
    let account = accountFromDictionary(dictionary)

    let oldStore = MockKeyValueStore(dictionary: dictionary)
    let newStore = MockKeyValueStore(dictionary: [:])
    let previousAccountProvider = KeyValueAccountProvider(store: oldStore)
    let currentAccountProvider = KeyValueAccountProvider(store: newStore)

    let migrationAccountProvider = MigrationAccountProvider(current: currentAccountProvider, previous: previousAccountProvider)

    // When
    migrationAccountProvider.account = account

    // Then
    XCAssertEqual(dictionary, newStore.dictionary)
    XCAssertEqual(emptyDictionary, oldStore.dictionary) // ensure the previous has been cleared
}
```

## =

Well that was a little random, and if you made it to here, well done for following! 🙌

I have been loving protocol based programming in Swift, and was really chuffed with the way this turned out. Protocols allow you to make abstract types that are capable of being composed to come up with some novel solutions to problems, and improve the ability to test your code.

> Food for thought: 
> What about a `MirrorAccountProvider` that uses multiple Providers as its store and keeps them in sync 🤔

So we took a part of an app - a crazy patched-in-singleton-based implementation - and made it easier to reason with, easier to test and managed to perform a keychain migration all without logging people out! Job done 👌

---

_Thanks for reading & have a great day 🙏❤️_

_If you have any questions about this, I'd love to chat. Hit me up on Twitter [@wtsnz](https://twitter.com/wtsnz/)_


