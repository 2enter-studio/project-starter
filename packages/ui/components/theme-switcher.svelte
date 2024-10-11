<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { capitalize } from '@repo/lib/utils/calc';
	import { THEMES } from '@repo/config/tailwind.config';
	import type { ThemeName } from '@repo/config/tailwind.config';

	interface Props {
		ignoreThemes?: ThemeName[];
		open?: boolean;
		theme?: ThemeName;
	}

	let { open = false, theme, ignoreThemes = [] }: Props = $props();

	$effect(() => {
		// if (!document) return;
		for (const mode of ['light', 'dark']) {
			if (THEMES[mode].includes(theme)) document.documentElement.className = mode;
		}
	});
	const options = [...THEMES.light, ...THEMES.dark].filter((t) => !ignoreThemes.includes(t));

	function switchTheme(option: ThemeName) {
		// open = false;
		theme = option;
	}

	onMount(() => {
		let initTheme = localStorage.getItem('theme') as ThemeName;
		if (!options.includes(initTheme)) initTheme = 'retro';
		switchTheme(initTheme);
		themeChange(false);
	});
</script>

<details class="dropdown dropdown-end" bind:open>
	<summary class="btn btn-accent m-1">
		Theme
		<svg
			width="12px"
			height="12px"
			class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg
		>
	</summary>
	<div class="menu dropdown-content rounded-box bg-primary text-primary-content btn-group-vertical z-[1] flex flex-col gap-2 px-2">
		{#each options as option}
			{@const classes = option === theme ? 'bg-secondary shadow-inner shadow-black/30 pointer-events-none' : ''}
			<button data-set-theme={option} data-act-class="ACTIVECLASS" class="rounded-xl px-1 {classes}" onclick={() => switchTheme(option)}>
				{capitalize(option)}
			</button>
		{/each}
	</div>
</details>
