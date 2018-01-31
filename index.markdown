---
layout: page
title: Will Townsend
---

I'm a __iOS software engineer__ from New Zealand. I create [software](https://github.com/wtsnz) for the Apple devices that live on your wrist, your pocket and under your tv using __Swift__ <s>and Objective-C</s>. I adore __clean code__, __beautiful design__ and a perfectly brewed __cup of tea__ ☕️.

<b>I've worked as an iOS Developer, iOS Team Lead & Technical Lead, and am looking for iOS opportunities to join a company located in Vancouver, BC that would be able to help with a visa.</b>

You can checkout my **[github](https://github.com/wtsnz)** profile for things I'm working on, my **[instagram](https://www.instagram.com/wtsnz/)** profile for photos that I take, and my **[twitter](https://twitter.com/wtsnz)** profile for whatever I feel like retweeting on a given day.


# Writing

I like to sporadically write the occasional thing on my [blog](/blog). Here's my latest posts.

<ul class="posts">
	{% for post in site.posts limit:6 %}
	<li><a href="{{ post.url }}">{{ post.title }}</a> <span class="when hidden-xs">{{ post.date | date_to_long_string }}</span></li>
	{% endfor %}
</ul>

<hr />

# Personal Projects

My product journey so far has been extremely educational. There's so much more to consider than a few lines of code! 

I've created a few apps on my own, with the most successful personal project of mine <a href="https://itunes.apple.com/nz/app/tides-nz/id521561961?mt=8">Tides NZ</a>, has been a great success and has enjoyed being the #1 Navigation app in New Zealand since it's release in May 2011! 500+ ratings with an average of 4.8, not bad!


<div class="grid-container">
	<div class="grid-project-icon">
		<a href="https://itunes.apple.com/nz/app/tides-nz/id521561961?mt=8" target="_blank" title="Tides NZ">
	        <img class="project-img" src="/img/icon_tides_nz.png" />
	    </a>
	</div>
	<div class="grid-project">
		<h3><a href="https://itunes.apple.com/nz/app/tides-nz/id521561961?mt=8" target="_blank">Tides NZ</a></h3>
		<p>Tides NZ was the first iOS app I created. I got the idea through a summer of skim-boarding, which knowing what the tide was doing was essential for me and a few friends. Turns out that other people like to know what the tide is doing!</p>
	</div>
</div>


<p>I also collaborate with my good friend Walig via <a href="https://overflight.io" target="_blank">Overflight</a></p>


<hr />

<h1>Experiments</h1>
<p>Things that aren't available in the AppStore.</p>

<div class="grid-container">
	<div class="grid-project-icon">
		<a href="http://getsalesapp.com/" target="_blank" title="Sales for AppFigures">
	        <img class="project-img" src="/img/icon_sales.png" />
	    </a>
	</div>
	<div class="grid-project">
		<h3><a href="http://getsalesapp.com" target="_blank">Sales</a></h3>
			<p>After launching Tides NZ, I came across AppFigures. While they don't have a companion app, they do provide a public API for third parties to play with. Hence Sales was born.</p>
	</div>
</div>

<div class="grid-container">
	<div class="grid-project-icon">
		<a href="https://github.com/wtsnz/NZHerald" target="_blank" title="Alternate NZHerald Client">
	        <img class="project-img" src="/img/icon_nzh.png" />
	    </a>
	</div>
	<div class="grid-project">
		<h3><a href="https://github.com/wtsnz/NZHerald" target="_blank">Alternate NZ Herald Client</a></h3>
			<p>I decided to reverse engineer the NZ Herald API and attempt to make a simple news client that replicates Medium's fantastic app (especially the scrolling).</p>
	</div>
</div>

<div class="grid-container">
	<div class="grid-project-icon">
		<a href="https://github.com/wtsnz/Swift-Particles" target="_blank" title="Swift Particles">
	        <img class="project-img" src="/img/swift-particles.png" />
	    </a>
	</div>
	<div class="grid-project">
			<h3><a href="https://github.com/wtsnz/Swift-Particles" target="_blank">Swift Particles</a></h3>
			<p>I came across Sketch.js and a <a href="http://soulwire.github.io/sketch.js/examples/particles.html">Particle demo</a>. I quite liked it so spent an hour or so to implement (port js really..) something similar in Swift. It brought back memories of writing games in action script.</p>
	</div>
</div>
