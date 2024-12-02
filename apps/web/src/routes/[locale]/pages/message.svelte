<script lang="ts">
	import { getInputState, getSysState } from '@/states';
	import { enhance } from '$app/forms';
	import { makeEnhanceHandler } from '@repo/lib/utils/browser';

	const inputState = getInputState();
	const sysState = getSysState();

	const enhanceHandler = makeEnhanceHandler<{ message: string; name: string }>({
		handlers: {
			success: async (data) => {
				console.log(data);
			},
			failure: async (data) => {
				if (!data) return;
				if (!data?.message) return;
				sysState.popError(data.message);
			}
		},
		onstart: () => (sysState.processing = true),
		onfinish: () => (sysState.processing = false)
	});
</script>

<form action="?/submit" method="post" use:enhance={enhanceHandler}>
	<input type="text" name="message" bind:value={inputState.message} />
	<input type="text" name="name" bind:value={inputState.name} hidden />
	<button type="submit">Submit</button>
</form>
