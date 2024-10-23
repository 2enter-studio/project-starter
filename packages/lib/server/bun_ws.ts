import type { ServerWebSocket, WebSocketHandler } from 'svelte-adapter-bun';

import chalk from 'chalk';

class BunWS<T> {
	readonly handler: WebSocketHandler<T>;
	readonly clients = new Set<ServerWebSocket<T>>();

	constructor(args: { onopen?: WebSocketHandler<T>['open']; onclose?: WebSocketHandler<T>['close']; onmessage?: WebSocketHandler<T>['message'] }) {
		const open: WebSocketHandler<T>['open'] = async (ws) => {
			this.clients.add(ws);
			await args.onopen?.(ws);
		};

		const close: WebSocketHandler<T>['close'] = async (ws, code, message) => {
			this.clients.delete(ws);
			await args.onclose?.(ws, code, message);
		};

		const message: WebSocketHandler<T>['message'] = async (ws, message) => {
			await args.onmessage?.(ws, message);
		};

		this.handler = {
			open,
			close,
			message,
			upgrade(request, upgrade) {
				const url = new URL(request.url);
				if (url.pathname.startsWith('/ws')) {
					return upgrade(request);
				}
				return false;
			}
		};
	}

	broadcast(message: T) {
		for (let client of this.clients) {
			client.send(JSON.stringify(message));
		}
		console.log(chalk.cyan('broadcast message'), message);
	}
}

function startHelperServer(ws: BunWS<any>, port: number) {
	const { MODE } = import.meta.env;
	if (MODE !== 'development') {
		console.log(chalk.cyan('Not in developing mode, no need to start helper WS server.'));
		return;
	}

	const server = Bun.serve({
		port,
		fetch(req, server) {
			// upgrade the request to a WebSocket
			const ok = ws.handler.upgrade(req, server.upgrade.bind(server));
			if (ok) return;
			return new Response('Upgrade failed :(', { status: 500 });
		},
		websocket: ws.handler as any
	});

	console.log(chalk.green(`Helper Bun WS server listening on ${server.hostname + ':' + server.port}`));
}

export { BunWS, startHelperServer };
