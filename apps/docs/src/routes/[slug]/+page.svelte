<script lang="ts">
	import moment from 'moment';
	import Icon from '@iconify/svelte';

	let { data } = $props();
	const { Content } = data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="prose">
	<!-- Title -->
	<hgroup class="*:my-0">
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
	<div>
		<Content />
	</div>
</article>
