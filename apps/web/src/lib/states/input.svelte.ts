import { getContext, setContext } from 'svelte';

class InputState {
	name = $state<string | null>(null);
	message = $state<string | null>(null);

	readonly submittable = $derived(this.name && this.message);
}

function setInputState() {
	return setContext('INPUT_STATE', new InputState());
}

function getInputState() {
	return getContext<ReturnType<typeof setInputState>>('INPUT_STATE');
}

export { setInputState, getInputState };
