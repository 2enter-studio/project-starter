<script lang="ts">
	import { onMount } from 'svelte';
	import { sysState } from '@/states';

	let { data } = $props();
	const { locale } = data;

	onMount(() => {
		sysState.locale = locale;
	});
</script>

{locale}
