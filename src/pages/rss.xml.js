import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { loadAndFormatListedCollection } from '../utils/util.js';

export async function GET(context) {
	const posts = await loadAndFormatListedCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description || '',
			pubDate: post.data.pubDate,
			link: `/${post.computedSlug}/`,
		})),
	});
}
