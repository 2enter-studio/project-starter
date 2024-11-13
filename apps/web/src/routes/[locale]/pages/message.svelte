<script lang="ts">
	import { enhance } from '$app/forms';
	import { inputState, sysState } from '@/states';
	import { makeEnhanceHandler } from '@/form';

	const enhanceHandler = makeEnhanceHandler({
		success: async (data) => {
			console.log(data);
		},
		failure: async (data) => {
			if (!data) return;
			if (!data?.message) return;
			sysState.popError(data.message);
		}
	});
</script>

<form action="?/submit" method="post" use:enhance={enhanceHandler}>
	<input type="text" name="message" bind:value={inputState.message} />
	<input type="text" name="name" bind:value={inputState.name} hidden />
	<button type="submit">Submit</button>
</form>
