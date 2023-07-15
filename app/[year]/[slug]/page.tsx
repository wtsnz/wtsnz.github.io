import { promises as fs } from 'fs';
import path from 'path'
import matter from 'gray-matter'
import { sync } from 'glob'
import { getPostSlugs, getArticleFromSlug } from '@/utils/utils.js'
import { getMDXComponent } from 'mdx-bundler/client'
import * as React from 'react'

export async function generateStaticParams() {
  let slugs = await getPostSlugs()

  return slugs.map((slug) => {
    { 
      slug
    }
  })
}

export default async function Page({ params }: { params: { slug: string, year: string } }) {
  const post = await getArticleFromSlug(params);
  const ContentComponent = getMDXComponent(post.code)

  return <>
  <div className='container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl prose dark:prose-invert'>
    <h1>{post.frontmatter.title}</h1>
    <div>
    <ContentComponent />
    </div>
  </div>
  </>
}