import { promises as fs } from 'fs';
import path from 'path'
import matter from 'gray-matter'
import { sync } from 'glob'
import { getPostSlugs, getArticleFromSlug } from '@/utils/utils.js'
import { getMDXComponent } from 'mdx-bundler/client'
import * as React from 'react'


export async function generateStaticParams() {
  // const posts = await getAllFilesFrontMatter('blog')
  // return { props: { posts } }

  let slugs = await getPostSlugs()

  // let test = await getArticleFromSlug()

  // console.log(slugs)

  return slugs.map((slug) => {
    { 
      slug
    }
  })
  // const postsDirectory = path.join(process.cwd(), 'content/posts');
  // // const filenames = await fs.readdir(postsDirectory);

  // const paths = sync(`${postsDirectory}/**/**.mdx`)


  // let slugs = paths.map((path) => {
  //   // holds the paths to the directory of the article
  //   const pathContent = path.split('/')
  //   const fileName = pathContent[pathContent.length - 1]
  //   const [slug, _extension] = fileName.split('.')

  //   return slug
  // })

  // console.log(slugs)

  // const files = await Promise.all(filenames.map(async filename => {
  //   const filePath = path.join(postsDirectory, filename)
  //   const content = await fs.readFile(filePath, 'utf8')
  //   const matter = grayMatter(content);
  //   return {
  //     filename,
  //     matter
  //   }
  // }));


  // console.log(filenames)
  // return [{ id: "1" }, { id: "2" }];
}

export default async function Page({ params }: { params: { slug: string, year: string } }) {

  // let fullSlug = `${params}/${params.slug}`;
  const post = await getArticleFromSlug(params);
  const Component = getMDXComponent(post.code)

  return <>
  <div className='container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl prose dark:prose-invert'>
    <h1 >{post.frontmatter.title}</h1>
    <div>
    <Component />
    </div>
  </div>
  </>
}