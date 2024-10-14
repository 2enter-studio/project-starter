<script lang="ts">
	import moment from 'moment';
	import { page } from '$app/stores';
	import { watch } from 'runed';

	let { data } = $props();
	const Content = $derived(data.Content);

	let tocWrapper = $state<HTMLDivElement>();

	// update toc while routing
	watch(
		() => $page.url.pathname,
		() => {
			const nav = document.querySelector('nav');
			if (tocWrapper && nav) {
				const oldNav = tocWrapper.querySelector('nav');
				if (oldNav) tocWrapper.removeChild(oldNav);
				tocWrapper.appendChild(nav);
				nav.hidden = false;
				nav.classList.add('dropdown-content');
			}
		}
	);
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="prose w-fit max-w-full">
	<!-- Title -->
	<hgroup class="mb-10 *:my-0">
		<h1>{data.meta.title}</h1>
		<p>
			<i class="fa-solid fa-calendar"></i>
			{moment(data.meta.date).format('MMM D, YYYY')}
		</p>
		<p>| {data.meta.description}</p>
	</hgroup>

	{#if data.meta.categories}
		Tags
		<div class="tags">
			{#each data.meta.categories as category}
				<span class="surface-4">&num;{category}</span>
			{/each}
		</div>
	{/if}

	{#key $page.url}
		<Content />
	{/key}

	<div bind:this={tocWrapper} class="dropdown dropdown-end dropdown-bottom dropdown-hover fixed right-3 top-0">
		<div class="rounded-b-xl bg-accent px-3 py-0 text-accent-content transition-transform hover:bg-primary hover:text-primary-content">
			<i class="fa-solid fa-list"></i>
		</div>
	</div>
</article>
