<script lang="ts">
	import { onMount } from 'svelte';
	import { getSysState } from '@/states';
	import { NavBtn } from '@/components/index.js';

	let { data } = $props();
	const { locale } = data;

	const sysState = getSysState();
	const Page = $derived(sysState.page);

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
