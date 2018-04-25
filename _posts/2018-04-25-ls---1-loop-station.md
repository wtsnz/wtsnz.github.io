---
layout: post
title: "🌀 LS-1: Loop Station"
description: "LS-1 Loopstation. Custom loopstation inspired by Ed Sheerans' Chewie Monsta 2"
categories: loopstation
image:
  path: /img/lp13.jpg
  height: 720
  width: 1280
---

![The complete LS-1!](/img/ls1.jpg)

If you've been following me on any sort of social media over the last 6 months, you will have seen the progress I've made on the loop station that I've been building. Since my [last post](/2018/loop-pedal), I've been hard at work building the physical loop station box. It's been a fun month, full of soldering, sanding, driving back and forward to the workshop, and - ew! - countless phone calls. 😅 

The loop station is inspired by Ed Sheerans' Chewie Monsta II, a 4 track looper with configurable input/outputs along with waveform and track monitor displays. I've been looping for a little while with a Boss RC-30 and wanted to explore the flexibility that having more loopable tracks will allow.

Just over one year ago I started work on designing the software and hardware that have evolved into what I have today. And today was a monumental day: I just signed the _first ever complete LS-1_ (For lack of a better name!) and boy it feels good!

<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/Bh-enHpHTHA/" data-instgrm-version="8" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/Bh-enHpHTHA/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Will Townsend (@wtsnz)</a> on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2018-04-25T02:12:39+00:00">Apr 24, 2018 at 7:12pm PDT</time></p></div></blockquote>
<script async defer src="//www.instagram.com/embed.js"></script>

---

## The Software

I've been working on the software on and off for about 2 months now, and I've finally started to get it going in a direction that I like. It runs as a standalone app on Mac and Windows, as well as inside your favourite DAW (such as Ableton Live) which allows for some very creative routing capabilities.

You can have each track record from any input channel and then output into their own track in Ableton Live (or Logic Pro X). This allows you to apply different audio effects, in your DAW of choice, to each loop track.

I'm in the process of splitting each of the ideas into _Need to Have_ and _Nice To Have_ columns in Trello. I have a lot of ideas for the software that I'd love to implement, but as with any project, you've got to start small and work towards a larger goal The great thing with software is that it can be updated! Now I've got the hardware to a point that I am happy with, it's time to focus on the software features.


![image](/img/loop-station-software.png)

Above is a screenshot of last nights build of the app. There are many more things to tweak and improve. It's been a lot of fun to do something different to my normal day-to-day work (iOS development) and write code using C++.


<!-- I plan to add Midi mapping so that the software work with any midi controller, so you can build yourself one and map the controller to the actions in the software. -->

---

## Can I pay you money to make me one?

I'm incredibly humbled by the response I've got on Instagram. There are a lot of Ed Sheeran fans out there, who are also looping enthusiasts! A lot of you are asking if I'll ever make this loop station available to purchase. 

I have a few more things to figure out before I can say if making the hardware is a viable option for me, this pedal was quite expensive to make - if you're interested in anyway, please get in touch and let me know how much you'd pay.

Tangentially, I do plan on releasing the software for purchase when it's ready later this year.

I've setup the [Loft Labs](https://loftlabs.co/) website, where you can sign up to the mailing list, and I'll post more information after I've settled into my new home in Canada 🇨🇦🍁 - I'm flying out of New Zealand in 5 days.