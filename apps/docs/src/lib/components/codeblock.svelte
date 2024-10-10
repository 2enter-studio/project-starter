<script context="module" lang="ts">
	// import 'highlight.js/styles/a11y-dark.css';
	import 'highlight.js/styles/isbl-editor-dark.css';
	// import 'highlight.js/styles/tokyo-night-dark.css';
	// import 'highlight.js/styles/stackoverflow-dark.css';
	// import 'highlight.js/styles/nnfx-dark.css';
	import hljs from 'highlight.js';
	hljs.highlightAll();
</script>

<script lang="ts">
	import type { Action } from 'svelte/action';

	interface Props {
		lines: string[] | string;
		prefix?: string;
		language?: string;
	}

	let { lines, prefix, language = 'sh' }: Props = $props();

	const highlight: Action = (node) => {
		hljs.highlightElement(node);
		return {
			destroy() {}
		};
	};
</script>

<div class="mockup-code w-fit max-w-full overflow-x-auto bg-black language-{language}">
	{#if typeof lines === 'string'}
		<pre data-prefix={prefix} use:highlight><code>{lines}</code></pre>
	{:else}
		{#each lines as line, i}
			<pre data-prefix={prefix ?? i} use:highlight><code>{line}</code></pre>
		{/each}
	{/if}
</div>

<style>
	code,
	pre {
		background-color: transparent;
	}
</style>
