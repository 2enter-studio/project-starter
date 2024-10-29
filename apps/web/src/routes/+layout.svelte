<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { PUBLIC_FA_KIT_URL } from '$env/static/public';
	import { navigating } from '$app/stores';
	import { dev } from '$app/environment';

	import '@repo/config/app.css';
	import '../app.css';
	import { sysState } from '@/states';

	let { children } = $props();

	let dialog = $state<HTMLDialogElement>();
	$effect(() => {
		if (sysState.errorMessage && dialog) {
			dialog.showModal();
		}
	});

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

<dialog bind:this={dialog} class="modal modal-middle">
	<div class="modal-box">
		<h1>Error</h1>
		<p>{sysState.errorMessage}</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-secondary" onclick={() => (sysState.errorMessage = null)}>Close</button>
			</form>
		</div>
	</div>
</dialog>

{#if sysState.processing || $navigating}
	<div transition:fade class="full-screen center-content z-[100000] bg-black/10 backdrop-blur-sm">
		<i class="fa-solid fa-loader fa-duotone animate-spin text-8xl"></i>
	</div>
{/if}
