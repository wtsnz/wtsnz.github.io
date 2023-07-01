import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { sync } from "glob";
import { getPostSlugs, getArticleFromSlug } from "@/utils/utils.js";
import { getMDXComponent } from "mdx-bundler/client";
import * as React from "react";

export default async function Page({
  params,
}: {
  params: { slug: string; year: string };
}) {
  return (
    <>
      <section className="container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5 prose dark:prose-invert">
          <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-xl md:leading-14">
            About
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400"></p>
          <ul>
            <li>🌎 I was born in England, grew up in New Zealand, and now, I live in Canada!</li>
            <li>🚢 I enjoy shipping great software, learning how to write clean code, and creating great user experiences using Swift (previously Objective-C).</li>
            <li>✈️ I took a year off to ‘travel the world’ and recover from burnout out halfway through 2017 - 2018.</li>
            <li>🎙 I was interviewed for the Swift Coders podcast a while back. You can <a href="https://swiftcoders.podbean.com/e/53-will-townsend-ios-team-lead-at-paperkite/">listen to the podcast</a> for an in-depth history of how I ended up here!</li>
            <li>
            🎸 I can loop a few songs on guitar with a loop pedal (inspired by Ed
              Sheeran)
            </li>
            <li>
              ✋ I’ve{" "}
              <a href="https://www.youtube.com/watch?v=cUsj6-PlDk8">
                high-fived Paul Mccartney
              </a>{" "}
              ✋
            </li>
          </ul>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5 prose dark:prose-invert">
          <h2>Work</h2>

          <p>I’ve tinkered with computers for as long as I remember and, naturally, that's led me down a path that's gotten me into the tech industry. Over the last decade I've worked at a bunch of great companies and worked on a large variety of projects, products and technologies. I've found a niche developing on Apple platforms in the industry that I thorougly enjoy, and met some great people along the way.</p>

          <p>Here's a list of the companies I've worked with:</p>
        </div>

        <WorkRow
          title="Clued, Inc"
          subtitle="Founding Engineer / 2023 - Current"
          description="A startup working on something new."
          url="https://clued.xyz/"
          icon="/images/work_clued.jpeg"
        />

        <WorkRow
          title="Loft Labs Interactive Inc."
          subtitle="Founder / 2020 - Current"
          description="My own studio for apps and hardware projects."
          url="https://loftlabs.co/"
          icon="/images/work_loftlabs.png"
        />

        <WorkRow
          title="MetaLab"
          subtitle="iOS Developer / 2018 - 2020"
          description="After moving to Vancouver, BC, I managed to land a job at an agency that I’ve admired from afar for a while. The people I worked with here were great. I worked on a bunch of projects during my time at MetaLab. It was a very hard decision to leave because of what we worked on, the people and the mindset."
          url="https://www.metalab.com/"
          icon="/images/work_metalab.png"
        />

        <WorkRow
          title="PaperKite"
          subtitle="iOS Technical Lead / 2012 - 2017"
          description="I joined PaperKite as the first full-time engineering hire. I wore a bunch of hats over the 5 years; I helped build products for our clients, build out the technical team, and over the 5 years, grow from 3 employees to 24. I learned a lot, and I’ll never forget the experience. In terms of iOS projects, I worked on creating around 30 Objective-C & Swift based iOS applications for wide variety of clients and use cases."
          url="https://paperkite.co.nz"
          icon="/images/work_paperkite.png"
        />
      </section>

    </>
  );
}

const WorkRow = ({ title, subtitle, description, url, icon }: {title: string, subtitle: string, description: string, url: string, icon: string})  => {
  return (
    <div className="py-2">
      <div className="flex px-4 -mx-4 space-x-4 py-4 md:rounded-lg">
        <img
          width="80"
          height="80"
          src={icon}
          className="rounded-2xl w-16 h-16"
        />
        <div className="flex-1">
          <div className="text-lg font-semibold">
            <a href={url}>{title}</a>
          </div>
          <div className="font-mono text-sm text-gray-500">{subtitle}</div>
          <div className="">{description}</div>
        </div>
      </div>
    </div>
  );
};