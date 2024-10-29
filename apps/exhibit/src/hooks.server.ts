import { ws } from '@/server';
import type { Handle } from '@sveltejs/kit';

const { handler: handleWebsocket } = ws;

const handle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

export { handle, handleWebsocket };
