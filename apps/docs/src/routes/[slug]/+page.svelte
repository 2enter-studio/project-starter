<script lang="ts">
	import { formatDate } from '$lib/utils';

	let { data } = $props();
	const { Content } = data;
	console.log(Content);
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="prose">
	<!-- Title -->
	<hgroup>
		<h1>{data.meta.title}</h1>
		<p><Icon icon="" />{moment(data.meta.date).format('MMM D, YYYY')}</p>
		<p>| {data.meta.description}</p>
	</hgroup>

	<!-- Tags -->
	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>

	<!-- Post -->
	<div class="prose">
		<Content />
	</div>
</article>
