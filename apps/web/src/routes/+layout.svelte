<script lang="ts">
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	import { PUBLIC_FA_KIT_URL } from '$env/static/public';
	import '@repo/config/app.css';

	let { children } = $props();
	onMount(async () => {
		if (dev) {
			const eruda = (await import('eruda')).default;
			eruda.init();
		}
	});
</script>

<svelte:head>
	{#if PUBLIC_FA_KIT_URL}
		<script src={PUBLIC_FA_KIT_URL} crossorigin="anonymous"></script>
	{/if}
</svelte:head>

{@render children()}
