---
title:  "Swift Scripts"
pubDate:   2015-09-20 21:30:00
categories: swift development
slug: "2015/swift-scripts"
---

Here's a little trick that you can try; using Swift as a scripting language and running .swift files from the command line.

Say you want to make a command line tool that prints out "Hello, World!", open up terminal in an empty directory and let's create the source file

```sh
$ touch helloWorld.swift
$ atom helloWorld.swift
```

Now we have created our source file we can fill it with our Swift script.

```sh
#!/usr/bin/env xcrun swift

import Cocoa
print("Hello, World!")
```

We've added a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) that instructs the OS to run the script using `xcrun`. This allows us to execute the script from the command line directly without remembering the xcrun commands to do so.

We also must mark the file as executable with a chmod command.

	$ chmod +x hello-world.swift

Now we can run our helloWorld.swift like any other script we usually do!

	$ ./hello-world.swift
	Hello, World!

Easy! There are a few things I've yet to figure out, such as how third party frameworks can be included, but I'll be sure to update this post when I have the need and figure it out.

As for my plans with this, I wouldn't mind making something like [ab](http://httpd.apache.org/docs/2.0/programs/ab.html) in Swift. A command line server benchmarking tool. Anyway I don't need more project ideas - I simply need to find the time to actually finish one of them 😀

Apple have promised in their keynote that they'll open source the language at the end of the year. I predict that we'll then start see compilers that will allow us to write applications in Swift that will be able to run on Mac, Linux and eventually Windows allowing Swift to take over the world! 🌟
