---
layout: post
title: "An iOS Coordinator Pattern"
date: 2016-12-18 00:00:00
categories: ios dev
---

In the past 18 months I've been working one of the largest iOS apps of my career to date. We switched it up a little and wrote it using the MVVM pattern mixed with ReactiveCocoa.

When we sat down and tried to figure out a plan of attack the apps were pretty complex; ~50 unique view controllers with multiple states, wrapped in flows that:

- were reused in multiple places (login, registration)
- contained multiple paths to the same place
- shared the same `UIViewController`'s
- appeared to have a lifecycle

I had no idea how to best structure this.

After breaking the flows down I decided that I needed some sort of 'flow controller' that was contained view controllers that represents a certain use case of the app such as registration. This object was going to look after the flow logic, removing that responsibility from the view controllers. I'd never done or seen anything like this before so was a little worried that I was doing it wrong™, or leading the project down a path that will have a negative impact.

As you do, I googled 'ios flow controller' to verify my thinking and to see if some smart people had similar thoughts to no avail. Even more, this made me think I was heading the wrong way.

It wasn't until a few weeks later that I came across this incredible post titled '[The Coordinator](http://khanlou.com/2015/01/the-coordinator/)' by [Soroush Khanlou](http://khanlou.com/) that detailed a similar situation along with a pattern to follow, only under a different name! There was also follow up [Coordinators Redux](http://khanlou.com/2015/10/coordinators-redux/) post, [a presentation](https://vimeo.com/144116310) (and [slides](https://www.slideshare.net/secret/3jJlEE1weo0RRl)) that had a line that flipped my entire understanding of iOS development upside down and blew my mind.


> The behavior of your app is a completely transparent to you, and UIKit is now just a library that you call when you want to use it.
>
> _Soroush Khanlou [Coordinators Redux](http://khanlou.com/2015/10/coordinators-redux/)_

In other word let's use UIKit as a framework inside our app, not put our app inside UIKit.

After reading that Soroush had a similar line of thinking, I felt slightly better about the concept and decided to take the plunge and give it a go.

---

## What is a Coordinator?

A Coordinator is an object the encapsulates a lifecycle that is spread over a collection of view controllers.

> So what is a coordinator? A coordinator is an object that bosses one or more view controllers around. Taking all of the driving logic out of your view controllers, and moving that stuff one layer up is gonna make your life a lot more awesome.
>
> _Soroush Khanlou [Coordinators Redux](http://khanlou.com/2015/10/coordinators-redux/)_

And boy, has my life been made a lot more awesome 🙌

I have found that the Coordinator pattern is a great way to represent a lifecycle that's made up of a bunch of view controllers. Any user flow that has multiple steps over multiple view controllers such as user registration, adding a payment method (credit card) to an account, ordering a pizza is a perfect candidate.
These examples work well because each have a clear "horizontal" flow that is made up of multiple steps that can be hosted inside of a `UINavigationController`, to which I have found the coordinator pattern perfect for.

![](./coordinator-diagram.svg)
_A, B, C are View Controllers that are used by the Coordinator. Each view controller has a delegate to request any mutations to data, along with any interactions. The Coordinator then responds to these messages, and can perform the appropriate action, potentially 'completing' itself and sending a message to it's own delegate, which would be the coordinator that presented this coordinator! 💥_

The Coordinator is in charge of creating the navigation controller and any of the child view controllers. The view controllers then are completely independent and have no knowledge of the context in which they are used, improving their reusability & testing.

View controllers are then simply the puzzle pieces to your app, and Coordinators simply contain 'horizontal' flows of view controllers.

Your application is then essentially a collection of Coordinators that are connected to each other.

---

## The Pattern

The Coordinator pattern is really quite simple. As Soroush said (and if you haven't already read his post [Coordinators Redux](http://khanlou.com/2015/10/coordinators-redux/), please do as I assume you have from now on 🙂):

> Ultimately, coordinators are just an organizational pattern. There’s no library you can use for coordinators because they’re so simple. There’s no pod you can install and nothing to subclass from. There’s not even really a protocol to conform to.

After playing around with the pattern for the last 12 months, I think I understand why Soroush said that there is not _really_ a protocol to conform to. However, in Swift I believe there are benefits from defining a protocol to use. I've found that it helps provide consistency when working with multiple teammates and provides some helpful additions using Swift's protocol extensions.

To show you what I mean let's get into a possible definition of a Coordinator protocol:

```swift
/// The Coordinator protocol
protocol Coordinator: class {

    /// The services that the coordinator can use
    var services: Services { get }

    /// The array containing any child Coordinators
    var childCoordinators: [Coordinator] { get set }

}
```

The protocol requires the Coordinator to have a services object, and an array of child Coordinators.

Our services object is essentially a struct that provides access to the database or webservice. This gives us the advantage to mock these dependencies during testing.

Our Coordinator must keep a reference to any child Coordinators to prevent them from being deallocated. This is why when presenting a new coordinator the parent must add it to the `childCoordinators` array and remove it when the child coordinator is removed.

We can provide a few functions that help with managing child coordinators in a protocol extension:

```swift
extension Coordinator {

    /// Add a child coordinator to the parent
    func addChildCoordinator(childCoordinator: Coordinator) {
        self.childCoordinators.append(childCoordinator)
    }

    /// Remove a child coordinator from the parent
    func removeChildCoordinator(childCoordinator: Coordinator) {
        self.childCoordinators = self.childCoordinators.filter { $0 !== childCoordinator }
    }

}
```

---

## An implementation

Now let's have a look at a real life example from the brand new [BPMe NZ app](https://itunes.apple.com/nz/app/bpme-pay-for-fuel-from-your-car/id1116524739?mt=8) where the Coordinator pattern was used. There is a clear 'horizontal' flow during the pay in car process when you're paying for fuel.

![](./bp-pic-coordinator-flow.png)

The flow is as follows:

1. If there are multiple sites nearby, confirm which location you are at
1. Select your pump number, fuel grade & amount you'd like to fill
1. If you're required by your business to enter odometer, show the odometer entry
1. If you have a passcode, enter it to authorize the pump & payment
1. Ready To Pump UIViewController is displayed, with the option to cancel
1. You're Filling Up UIViewController is displayed
1. Completion UIViewController is displayed

This flow has a lot of 'if x do y', 'if y show z'. This gets messy very quickly when the view controllers themselves are the ones that decide the next view controller to push into `self.navigationController`. In most cases, children should never tell their parents what to do. So why should a UIViewController tell the UINavigationController that it is contained in what to do?

The coordinator solves this by removing this logic from the children. In the BPMe example, there is a `PayInCarCoordinator` that has a `rootViewController` which is a `UINavigationController`. The `PayInCarCoordinator` is then in charge of initializing the view controllers and pushing them into the navigationController. The `PayInCarCoordinator` is also the delegate of all the child view controllers, as this is how each informs the coordinator that their task is complete.


So a little bit of code that shows the basic concept. I've written this straight into Atom, so it won't compile - and I should probably say that it doesn't represent what we ended up using in production in anything other than the concept.

```swift
/// The Coordinator protocol
public class PayInCarCoordinator: Coordinator {

    public var rootViewController: UIViewController {
        return self.navigationController
    }

    private let navigationController: UINavigationController

    public init(services: Services) {
        self.services = services
        self.childCoordinators = []
        self.navigationController = UINavigationController()
    }

    public func start() {

        if multipleSites {
            self.showMultipleSitesPicker()
        } else {
            self.showPayInCarConfiguration()
        }
    }

    private func showMultipleSitesPicker() {
        let multipleSitesPicker = MultipleSitesPickerViewController()
        multipleSitesPickerViewController.delegate = self
        self.navigationController.setViewControllers([multipleSitesPicker], animated: true)
    }

    private func showPayInCarConfiguration() {
        let payInCarConfigurationViewController = PayInCarConfigurationViewController()
        payInCarConfigurationViewController.delegate = self
        self.navigationController.setViewControllers([payInCarConfigurationViewController], animated: true)
    }

}
```

We create a basic structure of the Coordinator, with the `start()` method determining which view controller to display in the navigation controller.

Further on, we can conform to the PayInCarPasscodeViewControllerDelegate in an extension and perform an async operation before transitioning to another view controller.

```swift
public extension PayInCarCoordinator: PayInCarPasscodeViewControllerDelegate {

  func payInCarPasscode(viewController viewController: PayInCarPasscodeViewController, didEnterPasscode passcode: String) {

    // Set the view controller to loading state
    viewController.setState(.Loading)

    // Perform async action
    self.services.api.authorisePayInCarSession(payload) { let error, let authorisedSession in

      if let error = error {
        viewController.setState(.Default)
        // Handle error. This could be a function on the Coordinator that
        // presents an error coordinator or error UIAlertController.
        self?.handleError(error)
        return
      }

      // All going well, show the "next" view controller
      self?.showReadyToPump(with: authorisedSession)

    }
  }
}

```

_Using the [BPMe NZ app](https://itunes.apple.com/nz/app/bpme-pay-for-fuel-from-your-car/id1116524739?mt=8)  as an example was used with permission from both BP New Zealand and [PaperKite](http://paperkite.co.nz/) my employer - thanks for the opportunity!_

---

## An example project

So, that might have been a lot of information to some of you. In attempt to make the pattern clearer I spent a few hours putting together a small runnable example.

The example project is an extremely simple ordering app that shows how an app following the Coordinator pattern might work.

Imagine the app is running on a self service kiosk iOS device in which customers can walk up to and order a drink and a snack. The user can see how many orders have been ordered, and add their own order.

Upon tapping add an order, the `OrderCoordinator` is started and the order flow begins. The example is very simple, but I hope that along with some of the examples in this post it shows you the structure 🙂

It's available on github [github.com/wtsnz/Coordinator-Example](https://github.com/wtsnz/Coordinator-Example)

**I hope you find the Coordinator pattern as cool, and as useful as I did when I first came across it!**

---

_I have been inspired countless times, and learnt **loads** (essentially everything I know) from other people's blogs and articles online and would love to start returning the favor._

_Writing is not my forte, so if you see any mistakes or have any feedback on the structure I would love to hear it so I can improve - tweet me (link below)_

_Thanks for reading & have a great day 🙏❤️_
