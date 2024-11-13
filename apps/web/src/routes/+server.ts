import { json } from '@sveltejs/kit';
import { serverConsole } from '@/server';

export const GET = async () => {
	if (serverConsole.started) {
		return json({ message: 'server already started, no action applied.' });
	}

	await serverConsole.start();
	return json({ message: 'server started successfully!' });
};
