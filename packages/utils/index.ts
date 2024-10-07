import PocketBase from 'pocketbase';

const { DB_URL } = Bun.env;

export const db = new PocketBase(DB_URL);
