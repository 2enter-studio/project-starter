import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../posts/${params.slug}.md`);

		return {
			Content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		console.log('error occurred in /api/[slug]', e);
		error(404, `${e}`);
	}
}
