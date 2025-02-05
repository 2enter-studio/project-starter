import type { ParseEnum } from '../types';
import type { CollectionRecords, TypedPocketBase, Collections } from './types';

async function createMultiple<T extends ParseEnum<Collections>>(args: { pb: TypedPocketBase; collection: T; records: CollectionRecords[T][] }) {
	const { pb, records, collection } = args;
	return await Promise.all(
		records.map(async (record) => {
			const result = await pb.collection(collection).create(record, { requestKey: null });
			return result.id;
		})
	);
}

async function getRecordsByFilter<T extends ParseEnum<Collections>>(args: { pb: TypedPocketBase; collection: T; filter: string }) {
	const { filter, collection, pb } = args;
	return await pb
		.collection(collection)
		.getFullList({ filter })
		.then((data) => data)
		.catch(() => null);
}

async function getOneByFilter<T extends ParseEnum<Collections>>(args: { pb: TypedPocketBase; collection: T; filter: string }) {
	const { filter, collection, pb } = args;
	return await pb
		.collection(collection)
		.getFirstListItem(filter)
		.then((data) => data)
		.catch(() => null);
}

export { createMultiple, getRecordsByFilter, getOneByFilter };
