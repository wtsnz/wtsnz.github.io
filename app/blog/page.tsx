import { getPostSlugs, getArticleFromSlug } from "@/utils/utils.js";
import * as React from "react";
import Link from "next/link";
import formatDate from "@/utils/formatDate";

export default async function Page({
  params,
}: {
  params: { slug: string; year: string };
}) {
  const posts = await getPostSlugs();

  return (
    <>
      <section className="container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-xl md:leading-14">
            Blog
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Here are the collection of words that I{"'"}ve tried to arrange into an
            original, interesting order that somewhat relate to the title of the
            post, for you to consume.
          </p>
        </div>

        {posts.map((post) => {
          // const { slug, date, title, summary, tags } = frontMatter;
          return (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="-mx-4 flex px-4 py-2 font-medium hover:bg-orange-50 hover:text-orange-400 md:rounded-md dark:hover:bg-gray-800"
            >
              <div className="flex-1">{post.frontmatter.title}</div>
              <div className="text-gray-600">
                <small>
                  <time dateTime={post.date ?? ""}>{formatDate(post.date)}</time>
                </small>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
