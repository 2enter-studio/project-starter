<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getSysState } from '@/states';

	const sysState = getSysState();

	interface Props {
		children?: Snippet;
		action: number;
		class?: string;
	}

	let { children, action, class: className }: Props = $props();
</script>

{#if children}
	<button onclick={() => sysState.navigate(action)} class={className} aria-label="button">
		{@render children()}
	</button>
{:else}
	<button onclick={() => sysState.navigate(action)} class="{className} btn btn-primary" aria-label="button">
		<i class="fa-solid text-xl" class:fa-arrow-right={action === 1} class:fa-arrow-left={action === -1}></i>
	</button>
{/if}
