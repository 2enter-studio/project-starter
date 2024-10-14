import { error } from '@sveltejs/kit';

const posts = import.meta.glob('../../posts/**/*.md', { eager: true });

export async function load({ params }) {
	try {
		const { slug } = params;
		const key = `../../posts/${slug}.md`;
		const post = posts[key] as any;

		return {
			Content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		console.log('error occurred in /api/[slug]', e);
		error(404, `${e}`);
	}
}

