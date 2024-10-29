import chalk from 'chalk';
import EventSource from 'eventsource';
import { pb, ws } from '@/server';
import type { DataResponse } from '@repo/lib/pb';

global.EventSource = EventSource as any;

class ExhibitServer {
	origin: string;
	duration: number;
	group: DataResponse[] = [];

	constructor(origin: string, duration: number) {
		this.origin = origin;
		this.duration = duration;
		this.start().then(() => {
			console.log(chalk.green('server started!!'));
		});
	}

	async start() {
		ws.broadcast({ message: `We got a new client. The current client amount is ${ws.clients.size}` });

		await pb.collection('data').subscribe('*', ({ action, record }) => {
			if (action !== 'create') return;
			this.group.push(record);
		});

		setInterval(() => {
			if (this.group.length === 0) return;
			const target = this.group.pop();
			if (!target) return;
			ws.broadcast({ message: 'yeah', data: target });
		}, this.duration);
	}
}

export { ExhibitServer };
