import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../posts/${params.slug}.md`);
		console.log(post);
		console.log(JSON.stringify(post));

		return {
			Content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		error(404, `${e}`);
	}
}
