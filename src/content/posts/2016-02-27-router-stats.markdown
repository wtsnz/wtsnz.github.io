---
layout: post
title: "Router Stats"
date: 2016-02-26 23:00:00
categories: dev script graph
---

Since I moved into my new flat a month ago I've been monitoring the ADSL line stats like a mad man.
The line in this flat isn't as good so I've had to tweak the SNR ratios on my modem to get the most out of the connection. This has added an additional 30% to my connection speed! However, tweaking your modems SNR ratio can make your line a little unstable so I wanted to keep my eyes on them.

For a while now I've wanted to play around with the [Influxdata](https://influxdata.com/) stack, and now I have a good excuse!

<img src="/img/grafana.png">

*(I know the stats look boring there, but when everything is working as it should this what I want to see!)*

### Project

I wrote a small python script that telnets into my modem and sends the line stats to a Telegraf server. Telegraf supports the statsd
protocol and stores the data into an InfluxDB database.

The source, and result of an hour or so of intense googling can be found on my github profile [github/wtsnz/router-stats](https://github.com/wtsnz/router-stats).

### Server Side Setup

I have a Droplet from Digital Ocean running Docker managing the application containers. This was the first time I've played around with Docker. So I had to spend a night or two getting familiar with the concept and how it works.

There were a few Docker images already created in Docker Hub based on InfluxDB and Telegraf that I was able to modify and customise to my liking.

[github/wtsnz/docker-telegraf](https://github.com/wtsnz/docker-telegraf) <br />[github/wtsnz/influxdb](https://github.com/wtsnz/influxdb)

Since then I've found out about docker-compose, which allows you to describe your entire application stack. This allows one to quickly spin up, or destroy a bunch of containers.

[github/wtsnz/stats-server](https://github.com/wtsnz/stats-server)

### Future

Now that I have a stats server and a way to visualize the data, I would love to record more stats. I haven't delved much into embedded hardware/arduino so trying to log the temperature of each room in my flat would be a good excuse to do so.
