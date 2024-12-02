<script lang="ts">
	import { getInputState } from '@/states';

	const inputState = getInputState();
</script>

<input type="text" bind:value={inputState.name} />
