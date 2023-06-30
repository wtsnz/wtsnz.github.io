
import { getPostSlugs } from "@/utils/utils.js";
 
const URL = "https://will.townsend.io";

export default async function sitemap() {
    const allPosts = await getPostSlugs();
   
    const posts = allPosts.map((post) => ({
      url: `${URL}/blog/${post.slug}`,
      lastModified: post.publishedAt,
    }));
   
    const routes = ['', '/about', '/blog'].map((route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
    }));
   
    return [...routes, ...posts];
}