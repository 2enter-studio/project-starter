import type { Handle } from '@sveltejs/kit';
import { ws } from '@/server';

const { handler: handleWebsocket } = ws;

const handle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

export { handle, handleWebsocket };
