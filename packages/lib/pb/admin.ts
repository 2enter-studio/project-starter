import PocketBase from 'pocketbase';
import type { TypedPocketBase } from './types.ts';

async function makePBAdmin(ENVs: Record<'PB_URL' | 'PB_PASS', string>) {
	const pb = new PocketBase() as TypedPocketBase;
	await pb.admins.authWithPassword(ENVs.PB_URL, ENVs.PB_PASS);
	return pb;
}

export { makePBAdmin };
