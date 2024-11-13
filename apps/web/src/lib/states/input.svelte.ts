class InputState {
	name = $state<string | null>(null);
	message = $state<string | null>(null);

	readonly submittable = $derived(this.name && this.message);
}

const inputState = new InputState();

export { inputState };
