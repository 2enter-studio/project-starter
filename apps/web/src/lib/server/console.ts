class ServerConsole {
	started = false;

	constructor() {}

	async start() {
		if (this.started) return;
		this.started = true;
	}
}

const serverConsole = new ServerConsole();

export { serverConsole };
