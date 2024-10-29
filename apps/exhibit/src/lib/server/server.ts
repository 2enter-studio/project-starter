import chalk from 'chalk';
// import { pb } from '@/server/pb';
import { ws } from '@/server/ws';

import EventSource from 'eventsource';

global.EventSource = EventSource as any;

class ExhibitServer<T> {
	origin: string;
	duration: number;
	group: T[] = [];

	constructor(origin: string, duration: number) {
		this.origin = origin;
		this.duration = duration;
		this.start().then(() => {
			console.log(chalk.green('server started!!'));
		});
	}

	async start() {
		ws.broadcast({ message: `We got a new client. The current client amount is ${ws.clients.size}` });

		// await pb.collection('responses').subscribe('*', ({ action, record }) => {
		// 	if (action !== 'create') return;
		// 	this.group.push(record);
		// });

		setInterval(() => {
			if (this.group.length === 0) return;
			const target = this.group.pop();
			if (!target) return;
			// const { message, has_bad_words, id, locale } = target;
			// ws.broadcast({ responses: [{ message, has_bad_words, directory: `${this.origin}/api/response/${id}/image`, locale }] });
		}, this.duration);
	}
}

export { ExhibitServer };
