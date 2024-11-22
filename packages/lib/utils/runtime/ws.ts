import { sleep } from './sleep';
import * as validator from 'validator';

type Handler<T> = (data: T) => any | Promise<any>;

function makeWSClient<T>(args: { url: string; onmessage?: Handler<T>; onerror?: Handler<Event> }) {
	const { url, onmessage, onerror } = args;
	let ws = new WebSocket(url);

	ws.onopen = () => {
		console.log('ws connected');
	};
	if (onmessage) {
		ws.onmessage = async (e) => {
			if (validator.isJSON(e.data)) {
				await onmessage(JSON.parse(e.data));
			} else {
				console.log(`receiving not JSON message: ${e.data}`);
			}
		};
	}
	if (onerror) ws.onerror = onerror;

	ws.onclose = async () => {
		await sleep(3000);
		ws = makeWSClient(args);
	};
	return ws;
}

export { makeWSClient };
