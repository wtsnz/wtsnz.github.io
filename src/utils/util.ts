import { getCollection } from 'astro:content';

export function computeSlug(id: string): string {
	// The glob loader uses the frontmatter `slug` field as the id when present.
	// Format: "2013/automagical-ios-testflight-deployments" (from frontmatter slug)
	// Or: "2024-05-26-jwt-tokens-mobile-apps" (from filename when no frontmatter slug)
	// Or: "2013-10-11-new-york-new-york/2013-10-11-new-york-new-york" (subdirectory, no frontmatter slug)

	// If id already looks like "YYYY/slug" (from frontmatter slug), use it directly
	if (/^\d{4}\//.test(id)) {
		return id;
	}

	// For file-based IDs, extract filename and compute slug from "YYYY-MM-DD-title" pattern
	const segments = id.split('/');
	const fileName = segments[segments.length - 1];
	if (!/^\d{4}-\d{1,2}-\d{1,2}-.+/.test(fileName)) {
		return id;
	}

	const parts = fileName.split('-');
	return parts[0] + '/' + parts.slice(3).join('-');
}

export async function loadAndFormatCollection(name: string) {
	const posts = await getCollection(name, ({ data }) => {
		return data.draft === false;
	});

	return posts.map(post => ({
		...post,
		computedSlug: computeSlug(post.id),
	}));
}

export async function loadAndFormatListedCollection(name: string) {
	const posts = await getCollection(name, ({ data }) => {
		return data.draft === false && (data.listed !== false || import.meta.env.DEV);
	});

	return posts.map(post => ({
		...post,
		computedSlug: computeSlug(post.id),
	}));
}
