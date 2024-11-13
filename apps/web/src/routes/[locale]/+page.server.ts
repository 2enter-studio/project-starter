import type { Action, Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

const submit: Action = async ({ request }) => {
	const formData = await request.formData();
	const { headers: request_headers } = request;
	const message = formData.get('message') as string;
	console.dir(request_headers);
	console.dir(message);
	return fail(500, { message: 'failed' });
};

export const actions: Actions = { submit };
