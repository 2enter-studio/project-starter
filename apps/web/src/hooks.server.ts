import type { Handle } from '@sveltejs/kit';

const handle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};

export { handle };
