---
layout: post
title: "Theme.swift"
date: 2015-10-28 23:00:00
categories: swift ios dev
---

I've been using (well I think, what is) an interesting pattern in some Swift projects recently. Rather than littering the code with random UIFont, UIColor initializers/magic variables we can define a struct that we'll use as a container for all of our brand styles.

Defining common app wide constants such as view padding also allows us to remove magic numbers from our autolayout code (I am using [SnapKit](https://github.com/SnapKit/SnapKit) here)

```swift
self.loginButton.snp_makeConstraints { (make) -> Void in
    make.bottom.equalTo(self).offset(-Theme.Padding)
    make.left.equalTo(self).offset(Theme.Padding)
    make.right.equalTo(self).offset(-Theme.Padding)
    make.height.equalTo(60)
}
```

I also usually let the Theme struct contain my UIAppearance Proxy configuration too. In my `applicationDidFinishLaunching` I can now add a call to `Theme.applyAppearance()`

## The Template
The standard Theme.swift file I usually start out with:

`gist:wtsnz/a10e091a476dcbf4e818`

It's a simple yet effective way to manage all things theme related in one place.

Reading through this I realise that I suck at writing! I'll get better, eventually.
