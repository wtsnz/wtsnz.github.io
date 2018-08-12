---
layout: post
title: "Monitoring new users with Pushover"
date: 2017-02-17 20:00:00
categories: swift development notification app store push pushover
---

![fabric](./notification.png)

I recently release a [side project](https://itunes.apple.com/nz/app/road-code-nz-theory-test-practice/id1163987935) I worked on with a friend of mine. As I'm sure you know, when you release something into the world it's really hard to go by your day without checking the analytics!

As the stats freaks that we are, we decided to use [Fabric](https://fabric.io) for the app. We chose Fabric as they have a great mobile app with a widget (great for quickly monitoring active users when you're out and about) and they have an incredible live web dashboard too:

![fabric](./fabric.png)

However, during the day we've found ourselves only looking at one stat, _new users_. As all the stats are live, I thought it might be a fun challenge to try and use my skills to figure out if it would be possible to send myself an alert when we get a new user. _This might be annoying if you're app is super popular, although the script sends at most one notification per 5 minutes_

I time-boxed two hours after work to try figure something out, to give myself a deadline to ensure that I actually produce something.

Me being me, when I sit down to write a script I turn to [Node.js](https://nodejs.org/). I find nothing easier/faster than to write a quick hacky js file and being able to make use of all the great modules via npm/[yarn](https://yarnpkg.com/en/).

As I gave myself a couple of hours, I didn't want to create an iOS app to receive the notifications and had recently come across a service called [Pushover](https://pushover.net/). Pushover allows you to quickly send notifications to your devices (and groups of devices - perfect for me and my friend) via a REST API.

Here's the script:

<script src="https://gist.github.com/wtsnz/9394638ebc7fde8ea3a63678efaa58ae.js"></script>

The premise is simple, run it on a computer that is always on and every 5 minutes the script will poll the Fabric API for the new users stats, and if it's different to the last known value, send a Pushover notification to alert us that we've a new user!

If this gets annoying, it can only be a good thing 😎
