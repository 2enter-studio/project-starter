<script lang="ts">
	import moment from 'moment';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	const Content = $derived(data.Content);

	let tocWrapper = $state<HTMLDivElement>();
	onMount(() => {
		const nav = document.querySelector('nav');
		if (tocWrapper && nav) {
			tocWrapper.appendChild(nav);
			nav.classList.remove('hidden');
			nav.classList.add('dropdown-content');
		}
	});
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="prose">
	<!-- Title -->
	<hgroup class="mb-10 *:my-0">
		<h1>{data.meta.title}</h1>
		<p><Icon icon="" />{moment(data.meta.date).format('MMM D, YYYY')}</p>
		<p>| {data.meta.description}</p>
	</hgroup>

	<!-- Tags -->
	<!--	<div class="tags">-->
	<!--		{#each data.meta.categories as category}-->
	<!--			<span class="surface-4">&num;{category}</span>-->
	<!--		{/each}-->
	<!--	</div>-->

	<!-- Post -->
	<!--	<div>-->
	{#key Content}
		<Content />
	{/key}
	<!--	</div>-->

	<div bind:this={tocWrapper} class="dropdown dropdown-end dropdown-bottom dropdown-hover fixed right-3 top-0">
		<button class="rounded-b-xl bg-neutral px-3 py-0 text-neutral-content">contents</button>
	</div>
</article>
