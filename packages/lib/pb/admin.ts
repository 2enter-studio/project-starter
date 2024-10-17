import PocketBase from 'pocketbase';
import type { TypedPocketBase } from './types';

async function makePBAdmin(ENVs: Record<'PB_URL' | 'PB_PASS' | 'PB_USER', string>) {
	const pb = new PocketBase(ENVs.PB_URL) as TypedPocketBase;
	await pb.admins.authWithPassword(ENVs.PB_USER, ENVs.PB_PASS);
	return pb;
}

export { makePBAdmin };
