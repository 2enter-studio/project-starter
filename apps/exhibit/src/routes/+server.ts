import { json } from '@sveltejs/kit';
import { ExhibitServer } from '@/server';

let server: ExhibitServer;

export const GET = async ({ url }) => {
	if (server) return json({ message: 'server already exist' });
	server = new ExhibitServer(url.origin, 3000);
	return json({ message: 'server started!' });
};
