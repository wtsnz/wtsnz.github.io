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
          <h2 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-xl md:leading-14">
            Work
          </h2>
          <p>While I’ve been writing software since I remember, I’ve so far been employed by two brilliant companies where I’ve been able to work and learn from some fantastic people.</p>
        </div>
      </section>
    </>
  );
}
