class State {
	mutable = $state(0);
	readonly immutable = $derived(this.mutable * 42069);
}

const state = new State();

export { state };
