<script lang="ts">
	import { PUBLIC_FA_KIT_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import '@repo/config/app.css';
	import '@repo/config/mdsvex.css';
	import { ThemeSwitcher } from '@repo/ui';
	import { PageLinks } from './components';
	import { setSysState } from '@/states';

	setSysState();

	const SLIDER_WIDTH = 5;
	const SIDE_BAR_SIZE = { min: 200, max: 500, default: 300 };

	let pageDom = $state<HTMLDivElement>();
	let slider = $state<HTMLDivElement>();

	let initSidebarWidth = $state(SIDE_BAR_SIZE.default);
	let sidebarWidth = $state<number>(SIDE_BAR_SIZE.default);
	let initX = $state<number>(SIDE_BAR_SIZE.default);

	const pageWidth = $derived.by(() => {
		if (!browser) return 0;
		return window.innerWidth - sidebarWidth - SLIDER_WIDTH;
	});

	function mouseUpHandler(e: MouseEvent) {
		initX = e.clientX;
		initSidebarWidth = sidebarWidth;
		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	}

	function mouseMoveHandler(e: MouseEvent) {
		const diff = e.clientX - initX;
		sidebarWidth = initSidebarWidth + diff;
		if (sidebarWidth < SIDE_BAR_SIZE.min) sidebarWidth = SIDE_BAR_SIZE.min;
		if (sidebarWidth > SIDE_BAR_SIZE.max) sidebarWidth = SIDE_BAR_SIZE.max;
	}

	onMount(() => {
		if (!slider) return;
		slider.addEventListener('mousedown', (e) => {
			initX = e.clientX;
			document.addEventListener('mousemove', mouseMoveHandler);
			document.addEventListener('mouseup', mouseUpHandler);
		});
	});

	let { children } = $props();
</script>

<svelte:head>
	{#if PUBLIC_FA_KIT_URL}
		<script src={PUBLIC_FA_KIT_URL} crossorigin="anonymous"></script>
	{/if}
</svelte:head>

<div class="full-screen flex flex-row overflow-hidden">
	<div class="flex flex-col gap-2 bg-base-300 p-3" style:width="{sidebarWidth}px">
		<PageLinks />

		<div class="flex w-full items-center justify-evenly">
			<ThemeSwitcher />
			<a href="https://github.com/2enter-studio/project-starter" class="no-emoji" aria-label="button" target="_blank">
				<i class="fa-brands fa-solid fa-github btn size-fit rounded-full p-0"></i>
			</a>
		</div>
	</div>

	<div bind:this={slider} class="w-[3px] hover:cursor-col-resize hover:bg-neutral/30" style:width="{SLIDER_WIDTH}px"></div>

	<div bind:this={pageDom} class="w-[70vw] overflow-y-auto p-3" style:width="{pageWidth}px">
		{@render children()}
	</div>
</div>

<div class="fixed bottom-3 right-3 rounded-full">
	<button
		class="round-btn btn btn-secondary text-secondary-content"
		aria-label="button"
		onclick={() => {
			pageDom?.scrollTo({ top: 0, behavior: 'smooth' });
		}}
	>
		<i class="fa-solid fa-arrow-up"></i>
	</button>
</div>
