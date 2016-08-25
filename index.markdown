---
layout: default
title: Will Townsend
mainfeature: true
---

I'm a __software engineer__ currently living in Windy Wellington, New Zealand. I create [software](https://github.com/wtsnz) for the Apple devices that live in your pocket using __Swift__ and __Objective-C__. I adore __clean code__, __beautiful design__ and a perfectly brewed __cup of tea__ ☕️.

I'm the Technical Lead at [PaperKite](http://paperkite.co.nz), where I've been since March 2013, and have been involved with projects of all shapes and sizes. Being a service company we're lucky enough to play with a lot of new (_and old!_) technology and create apps that an incredible amount of people use everyday 🎉.

# Writing

When I have nothing to do I sometime ramble about things on my [blog](/blog). Maybe one day there will be something of use to you. Here's my latest posts.

<ul class="posts">
	{% for post in site.posts limit:5 %}
	<li><a href="{{ post.url }}">{{ post.title }}</a> <span class="when hidden-xs">{{ post.date | date_to_long_string }}</span></li>
	{% endfor %}
</ul>

<hr />

# Personal Projects

I get a kick out of making things, so it doesn't stop when I get home. I'd love to make something that people love to use. Check out my [GitHub](https://github.com/wtsnz) page to see what I've been up to recently.

My product journey so far has been extremely educational. There's so much more to consider than a few lines of code! The most successful personal project of mine <a href="http://tidesapp.co.nz">Tides NZ</a>, has been a great success and has enjoyed being the #1 Navigation app in New Zealand since it's release in May 2011!

<div class="row project project-first">
	<div class="col-xs-2">
		<a href="http://tidesapp.co.nz/" target="_blank" title="Tides NZ">
	        <img class="project-img" src="/img/icon_tides_nz.png"></img>
	    </a>
	</div>
	<div class="col-md-10">
			<h3><a href="http://tidesapp.co.nz" target="_blank">Tides NZ</a></h3>
			<p>Tides NZ was the first iOS app I created. I got the idea through a summer of skim-boarding, which knowing what the tide was doing was essential for me and my mates.</p>
			<!-- <p> -->
				<center>
					<a href="https://itunes.apple.com/nz/app/tides-us/id590041098?mt=8" target="_blank">Tides US</a> • <a href="https://itunes.apple.com/nz/app/tides-aus/id593206209?mt=8" target="_blank">Tides AUS</a> • <a href="https://itunes.apple.com/nz/app/tides-uk/id571880354?mt=8" target="_blank">Tides UK</a>
				</center>
			<!-- </p> -->
	</div>
</div>

<hr />

<div class="row project">
	<div class="col-xs-2">
		<a href="http://getsalesapp.com/" target="_blank" title="Sales for AppFigures">
	        <img class="project-img" src="/img/icon_sales.png" />
	    </a>
	</div>
	<div class="col-md-10">
			<h3><a href="http://getsalesapp.com" target="_blank">Sales</a></h3>
			<p>After launching Tides NZ, I came across AppFigures. While they don't have a companion app, they do provide a public API for third parties to play with. Hence Sales was born.</p>
	</div>
</div>

<hr />

<h1>Experiments</h1>
<p>Things that haven't ended up in the AppStore.</p>
<div class="row project project-first">
	<div class="col-xs-2">
		<a href="https://github.com/wtsnz/NZHerald" target="_blank" title="Alternate NZHerald Client">
	        <img class="project-img" src="/img/icon_nzh.png"></img>
	    </a>
	</div>
	<div class="col-md-10">
			<h3><a href="https://github.com/wtsnz/NZHerald" target="_blank">Alternate NZ Herald Client</a></h3>
			<p>I decided to reverse engineer the NZ Herald API and attempt to make a simple news client that replicates Medium's fantastic app (especially the scrolling).</p>
	</div>
</div>

<div class="row project project-first">
	<div class="col-xs-2">
		<a href="https://github.com/wtsnz/Swift-Particles" target="_blank" title="Swift Particles">
	        <img class="project-img" src="/img/swift-particles.png"></img>
	    </a>
	</div>
	<div class="col-md-10">
			<h3><a href="https://github.com/wtsnz/Swift-Particles" target="_blank">Swift Particles</a></h3>
			<p>I came across Sketch.js and a <a href="http://soulwire.github.io/sketch.js/examples/particles.html">Particle demo</a>. I quite liked it so spent an hour or so to implement (port js really..) something similar in Swift. It brought back memories of writing games in action script.</p>
	</div>
</div>
