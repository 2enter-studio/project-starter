import validator from 'validator';
import { sleep } from './sleep';

type Handler<T> = (data: T) => any;

function makeWSClient<T>(args: { url: string; onmessage?: Handler<T>; onerror?: Handler<Event>; onopen?: Handler<Event>; onclose?: Handler<Event> }) {
	const { url, onmessage, onerror, onopen, onclose } = args;
	let ws = new WebSocket(url);

	ws.onopen =
		onopen ??
		async function (e) {
			console.log('ws connected');
		};

	ws.onmessage = async (e) => {
		if (onmessage) {
			if (validator.isJSON(e.data)) {
				await onmessage(JSON.parse(e.data));
			} else {
				console.log(`receiving not JSON message: ${e.data}`);
			}
		} else {
			console.log(`receiving message: ${e.data}`);
		}
	};

	ws.onerror =
		onerror ??
		function (e) {
			console.error(`ws error: ${e}`);
		};

	ws.onclose = async function (e) {
		await onclose?.(e);
		await sleep(3000);
		ws = makeWSClient(args);
	};

	return ws;
}

export { makeWSClient };
