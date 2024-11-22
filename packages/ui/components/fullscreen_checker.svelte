<script lang="ts">
	import { onMount } from 'svelte';

	let resizing = $state(false);

	onMount(() => {
		window.addEventListener('resize', () => (resizing = !resizing));
		return () => {
			window.removeEventListener('resize', () => (resizing = !resizing));
		};
	});
</script>

{#key resizing}
	{#if !(window.innerWidth === screen.width && window.innerHeight === screen.height)}
		<div class="full-screen center-content z-[2000] bg-black/30 backdrop-blur-xl">
			<button class="btn btn-secondary" onclick={() => document.documentElement.requestFullscreen()}>fullscreen</button>
		</div>
	{/if}
{/key}
