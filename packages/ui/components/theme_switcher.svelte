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
		class?: string;
	}

	let { open = false, theme, ignoreThemes = [], class: className }: Props = $props();

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

<div class="dropdown dropdown-hover dropdown-start dropdown-bottom w-fit {className}">
	<div class="bg-accent text-accent-content round-btn cursor-pointer">
		<i class="fa-solid fa-palette"></i>
	</div>

	<div class="menu dropdown-content rounded-box bg-primary text-primary-content btn-group-vertical z-[1] flex flex-col gap-2 px-2">
		{#each options as option}
			{@const classes = option === theme ? 'bg-secondary shadow-inner shadow-black/30 pointer-events-none' : ''}
			<button
				data-set-theme={option}
				data-act-class="ACTIVECLASS"
				class="hover:bg-accent rounded-xl px-2 py-1 {classes}"
				onclick={() => switchTheme(option)}
			>
				{capitalize(option)}
			</button>
		{/each}
	</div>
</div>
