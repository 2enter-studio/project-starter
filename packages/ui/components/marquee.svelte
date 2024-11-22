<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { text: string; timeout?: number };
	const { text, timeout = 400 }: Props = $props();

	let i = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			i = (i + 1) % text.length;
		}, timeout);

		return {
			destroy() {
				clearInterval(interval);
			}
		};
	});
</script>

{text.slice(i) + text}
