import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.resolve(process.cwd(), 'src/content/blog');
const BLOG_FILE_EXTENSIONS = new Set(['.md', '.mdx', '.markdown']);

function computeSlug(id) {
	if (/^\d{4}\//.test(id)) {
		return id;
	}

	const fileName = id.split('/').at(-1);
	if (!/^\d{4}-\d{1,2}-\d{1,2}-.+/.test(fileName)) {
		return id;
	}

	const parts = fileName.split('-');
	return `${parts[0]}/${parts.slice(3).join('-')}`;
}

function getFrontmatterValue(frontmatter, key) {
	const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)\\s*$`, 'm'));
	if (!match) {
		return undefined;
	}

	return match[1].trim().replace(/^['"]|['"]$/g, '');
}

function readBlogFiles(dir, relativeDir = '') {
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const absolutePath = path.join(dir, entry.name);
		const relativePath = path.posix.join(relativeDir, entry.name);

		if (entry.isDirectory()) {
			return readBlogFiles(absolutePath, relativePath);
		}

		if (!BLOG_FILE_EXTENSIONS.has(path.extname(entry.name))) {
			return [];
		}

		return [relativePath];
	});
}

export function getUnlistedBlogPaths() {
	return new Set(
		readBlogFiles(BLOG_DIR)
			.map((relativePath) => {
				const absolutePath = path.join(BLOG_DIR, relativePath);
				const contents = fs.readFileSync(absolutePath, 'utf8');
				const frontmatterMatch = contents.match(/^---\r?\n([\s\S]*?)\r?\n---/);
				const frontmatter = frontmatterMatch?.[1] ?? '';
				const draft = getFrontmatterValue(frontmatter, 'draft');
				const listed = getFrontmatterValue(frontmatter, 'listed');

				if (draft === 'true' || listed !== 'false') {
					return null;
				}

				const slug = getFrontmatterValue(frontmatter, 'slug');
				const id = slug ?? relativePath.replace(/\.(md|mdx|markdown)$/i, '');
				return `/${computeSlug(id)}/`;
			})
			.filter(Boolean),
	);
}
