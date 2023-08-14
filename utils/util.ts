import { getCollection } from 'astro:content';

export async function loadAndFormatCollection(name) {

	const posts = await getCollection(name);

    posts.forEach(post => {
        // const date = post.data.pubDate;
        // const year = date.getFullYear();
        // const month = (date.getMonth() + 1).toString().padStart(2, "0");
/// https://chat.openai.com/share/8e020adb-b695-4189-88ce-2c78af3b0224


        const path = post.id
        const pathContent = path.split('/')
        const fileName = pathContent[pathContent.length - 1]
        const [file, _extension] = fileName.split('.')

        /// https://chat.openai.com/share/8e020adb-b695-4189-88ce-2c78af3b0224
        const inputString = file;
        const parts = inputString.split("-");
        const result = parts[0] + "/" + parts.slice(3).join("-");

        const slug = `${result}`;
console.log(slug)
        post.slug = slug
    });

    return posts;
};