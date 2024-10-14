<script lang="ts">
	import type { Post } from '@/types';
	import { page } from '$app/stores';
	import { capitalize } from '@repo/lib/utils/calc';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	async function getRoutes(): Promise<{ routes: Post[]; collections: Record<string, Post[]> }> {
		const res = await fetch('/api/posts');
		const posts = (await res.json()) as Post[];
		const routes: Post[] = [];

		let collections: Record<string, Post[]> = {};

		for (const post of posts) {
			const { slug } = post;
			if (!slug.slice(1).includes('/')) {
				routes.push(post);
				continue;
			}
			const collection = slug.slice(1).split('/')[0];
			if (!collection) continue;
			if (!collections[collection]) {
				collections[collection] = [post];
			} else {
				collections[collection].push(post);
			}
		}
		return { routes, collections };
	}
	type PageLink = Pick<Post, 'slug' | 'title'>;
</script>

{#snippet link(route: PageLink)}
	{@const { slug, title } = route}
	{@const classes = $page.url.pathname === slug ? 'pointer-events-none bg-primary text-primary-content' : ''}
	<a href={slug} class="link-hover link mb-1 hover:text-accent {classes}">{title}</a>
{/snippet}

{#snippet links(routes: PageLink[])}
	{#each routes as route}
		<li>{@render link(route)}</li>
	{/each}
{/snippet}

<ul class="{className} menu w-full rounded-box bg-base-100">
	{#await getRoutes() then { routes, collections }}
		{@render links(routes)}
		{#each Object.entries(collections) as [name, routes]}
			<li>
				{@render link({ slug: `/${name}/index`, title: capitalize(name) })}
				<ul>
					{@render links(routes)}
				</ul>
			</li>
		{/each}
	{/await}
</ul>
