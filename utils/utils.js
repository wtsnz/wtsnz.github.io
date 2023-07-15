import { promises as fs } from 'fs';
import path from 'path'
import matter from 'gray-matter'
import { sync } from 'glob'

export async function getPostSlugs() {
  // const posts = await getAllFilesFrontMatter('blog')
  // return { props: { posts } }

  const postsDirectory = path.join(process.cwd(), 'content/posts');
  // const filenames = await fs.readdir(postsDirectory);

  const paths = sync(`${postsDirectory}/**/**.{mdx,md,markdown}`)

  let posts = await Promise.all(paths.map(async (path) => {
    // holds the paths to the directory of the article
    const pathContent = path.split('/')
    const fileName = pathContent[pathContent.length - 1]
    const [file, _extension] = fileName.split('.')

    const source = await fs.readFile(path)
    const { content, data } = matter(source)

    /// https://chat.openai.com/share/8e020adb-b695-4189-88ce-2c78af3b0224
    const inputString = file;
    const parts = inputString.split("-");
    const result = parts[0] + "/" + parts.slice(3).join("-");

    // console.log(data)

    return {
      slug: result,
      frontmatter: data,
      date: data.date ? new Date(data.date).toISOString() : null,
    }
  }))

  console.log(postsDirectory)
  posts = posts.sort((a, b) => dateSortDesc(a.date, b.date))


  return posts
}

// "2013/automagical-ios-testflight-deployments"
export async function getArticleFromSlug(slug) {

    const articlesPath = path.join(process.cwd(), 'content/posts');
    const filePath = sync(`${articlesPath}/**/${slug.year}*${slug.slug}.{mdx,md,markdown}`)[0]
    const source = await fs.readFile(filePath)
    const { content, data } = matter(source)
  
    const hhh = await getCompiledMDX(content)
    console.log(data);

    return {
      content: hhh.code,
      code: hhh.code,
      // content,
      frontmatter: {
        slug,
        excerpt: data.excerpt,
        title: data.title,
        publishedAt: data.publishedAt,
        // readingTime: readingTime(source).text,
        ...data,
      },
    }
  }

  const rehypePrettyCode = require('rehype-pretty-code');
  import {bundleMDX} from 'mdx-bundler'
  
  const getCompiledMDX = async (source) => {
    // Add your remark and rehype plugins here
    const remarkPlugins = [
      // remarkPrism
      // rehypePrettyCode
    ];

    const rehypePlugins = [
      // rehypePrettyCode
    ];
  
    try {
      return await bundleMDX({
        source: source,
        mdxOptions(options) {
          options.remarkPlugins = [
            ...(options.remarkPlugins ?? []),
            ...remarkPlugins,
          ];
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            ...rehypePlugins,
          ];
  
          return options;
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  export function dateSortDesc(a, b) {
    if (a > b) return -1
    if (a < b) return 1
    return 0
  }
  