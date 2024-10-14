<script lang="ts">
	import { PUBLIC_FA_KIT_ID } from '$env/static/public';
	import '@repo/config/app.css';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<script src="https://kit.fontawesome.com/{PUBLIC_FA_KIT_ID}.js" crossorigin="anonymous"></script>
</svelte:head>

{@render children()}
