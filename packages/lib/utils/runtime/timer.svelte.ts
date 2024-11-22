interface Trigger {
	check?: () => boolean;
	action: () => any;
}

class Timer {
	readonly interval: NodeJS.Timer;
	readonly triggers: Trigger[];

	startAt = 0;
	now = 0;

	constructor(args: { timeout?: number; triggers?: Trigger[] } = {}) {
		const { timeout, triggers } = args;
		this.triggers = triggers ?? [];
		this.reset();

		this.interval = setInterval(async () => {
			this.now = Date.now();
			if (!triggers) return;
			for (const { check, action } of triggers) {
				if (check?.() ?? true) await action();
			}
		}, timeout ?? 1000);
	}

	stop() {
		clearInterval(this.interval);
	}

	reset() {
		this.startAt = Date.now();
	}

	get duration() {
		return this.now - this.startAt;
	}

	get info() {
		return {
			now: this.now,
			duration: this.duration,
			startAt: this.startAt
		};
	}
}

class TimerState {
	readonly interval: NodeJS.Timer;
	readonly triggers: Trigger[];

	startAt = $state(0);
	now = $state(0);

	constructor(args: { timeout?: number; triggers?: Trigger[] } = {}) {
		const { timeout, triggers } = args;
		this.triggers = triggers ?? [];
		this.reset();

		this.interval = setInterval(async () => {
			this.now = Date.now();
			if (!triggers) return;
			for (const { check, action } of triggers) {
				if (check?.() ?? true) await action();
			}
		}, timeout ?? 1000);
	}

	stop() {
		clearInterval(this.interval);
	}

	reset() {
		this.startAt = Date.now();
	}

	get duration() {
		return this.now - this.startAt;
	}

	get info() {
		return {
			now: this.now,
			duration: this.duration,
			startAt: this.startAt
		};
	}
}

export { Timer, TimerState };
