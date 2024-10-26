<script lang="ts">
	import { PUBLIC_FA_KIT_URL } from '$env/static/public';
	import '@repo/config/app.css';

	let { children } = $props();
</script>

<svelte:head>
	{#if PUBLIC_FA_KIT_URL}
		<script src={PUBLIC_FA_KIT_URL} crossorigin="anonymous"></script>
	{/if}
</svelte:head>

{@render children()}
