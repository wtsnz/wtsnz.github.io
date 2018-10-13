---
layout: post
title: "Environment based NSAppTransportSecurity "
date: 2016-07-20 00:00:00
categories: ios dev
---

import Gist from 'components/Gist'

The latest client project I've been working on required us to figure out a way to have different NSAppTransportSecurity configurations based on the app's environment.

This project has three server environments, `dev`, `qa` & `prod` along with three build configurations that allow us to change various parts of the app at compile time.

There was a requirement for the `dev` & `qa` builds to point at a server that doesn't support HTTPS and we didn't want to leak out the urls of the other api servers in the production apps' Info.plist for everyone to see.

The configuration of NSAppTransportSecurity is inside your apps' Info.plist file, which makes it slightly more complex to change based on the build configuration of your Xcode project. We had to add a Build Phase that will change the generated Info.plist of the compiled application. We can use the the `$CONFIGURATION` environment variable to determine which configuration we're building and make the changes accordingly.

To modify the Info.plist file in a shell script, OSX comes with a tool called PlistBuddy which, once you understand some of how it works makes this 'easy'.

<hr />

## The build script

First we must delete any existing NSAppTransportSecurity entries from the plist. If we don't do this, PlistBuddy fails when we try to add the dictionary, causing the build to fail.

```sh
# Delete any existing NSAppTransportSecurity configurations
/usr/libexec/PlistBuddy -c "Delete :NSAppTransportSecurity" "${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
```

Then we create the NSAppTransportSecurity dictionary again

```sh
# Add the NSAppTransportSecurity dictionary again
/usr/libexec/PlistBuddy -c "Add :NSAppTransportSecurity dict" "${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
/usr/libexec/PlistBuddy -c "Add :NSAppTransportSecurity:NSExceptionDomains dict" "${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
```

Then we can add the entries that must be included for all the build configurations. This app uses Carnival.io which requires an entry for s3.amazonaws.com as it doesn't support Forward Secrecy.

```sh
# Add s3.amazonaws.com NSExceptionRequiresForwardSecrecy and set it to false
# This is a requirement of the Carnival.io SDK
/usr/libexec/PlistBuddy -c "Add :NSAppTransportSecurity:NSExceptionDomains:s3.amazonaws.com dict" "${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
/usr/libexec/PlistBuddy -c "Add :NSAppTransportSecurity:NSExceptionDomains:s3.amazonaws.com:NSExceptionRequiresForwardSecrecy bool false" "${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
```

Finally we can add the entries based on the build configuration using an if statement

```sh
# For the Dev & QA servers we need to allow insecure loads as the third party api doesn't have ssl on dev/staging
if [ $CONFIGURATION = "Dev" ] || [ $CONFIGURATION = "QA" ] || [ $CONFIGURATION = "QA-Release" ]; then
  # Add *api.client.com to allow insecure HTTP loads
  /usr/libexec/PlistBuddy -c "Add :NSAppTransportSecurity:NSExceptionDomains:api.client.com dict" "${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
  /usr/libexec/PlistBuddy -c "Add :NSAppTransportSecurity:NSExceptionDomains:api.client.com:NSTemporaryExceptionAllowsInsecureHTTPLoads bool true" "${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
  /usr/libexec/PlistBuddy -c "Add :NSAppTransportSecurity:NSExceptionDomains:api.client.com:NSIncludesSubdomains bool true" "${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"
fi
```


<hr />

## TLDR;

And for completeness, [here's a gist of the entire thing](https://gist.github.com/wtsnz/938f8c9f304207d7fa01a3fd42a7c96c).

<Gist id='938f8c9f304207d7fa01a3fd42a7c96c' />

I hope this might help you out one day ✌️
