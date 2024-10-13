<script lang="ts">
	import type { Post } from '@/types';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	async function getRoutes() {
		const res = await fetch('/api/posts');
		return (await res.json()) as Post[];
	}
</script>

<div class="{className} w-full">
	{#await getRoutes() then routes}
		{#each routes as { title, slug }}
			<a href="/{slug}" class="link-hover link link-primary">{title}</a>
		{/each}
	{/await}
</div>
