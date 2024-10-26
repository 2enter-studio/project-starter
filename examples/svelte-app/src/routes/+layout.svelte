<script lang="ts">
	import { PUBLIC_FA_KIT_URL } from '$env/static/public';
	import '@repo/config/app.css';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<script src={PUBLIC_FA_KIT_URL} crossorigin="anonymous"></script>
</svelte:head>

{@render children()}
