<script lang="ts">
	import { onMount } from 'svelte';
	import { sysState } from '@/states';
	import { Pages } from './pages';
	import { NavBtn } from '@/components/index.js';

	let { data } = $props();
	const { locale } = data;
	const Page = $derived(Pages[sysState.pageNum]);

	onMount(() => {
		sysState.locale = locale;
	});
</script>

<div class="center-content flex-col">
	{#key sysState.pageNum}
		<Page />
	{/key}

	<NavBtn action={1} />
</div>
