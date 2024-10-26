import { BunWS, startHelperServer } from '@repo/lib/server';

import type { WSData } from '@/config';
import { WS_HELPER_PORT } from '$env/static/private';

const ws = new BunWS<WSData>({
	onopen: () => {
		console.log(`open, clients: ${ws.clients.size}`);
	},
	onmessage: (ws, message) => {
		console.log(`received message: ${message}`);
	},
	onclose: (ws, code, message) => {
		console.log(code, message);
	}
});

startHelperServer(ws, +WS_HELPER_PORT);

export { ws };
