import type { ParseEnum, Prettify } from '../types';
import type { CollectionRecords, TypedPocketBase } from './types';

import { Collections } from './types';

type InitArgs<T extends ParseEnum<Collections>> = Prettify<{
	pb: TypedPocketBase;
	collection: T;
	id: string;
	field: keyof CollectionRecords[T];
}>;

class PBFile<T extends ParseEnum<Collections>> {
	pb: InitArgs<T>['pb'];
	collection: InitArgs<T>['collection'];
	id: InitArgs<T>['id'];
	field: InitArgs<T>['field'];

	constructor(args: InitArgs<T>) {
		this.pb = args.pb;
		this.id = args.id;
		this.collection = args.collection;
		this.field = args.field;
	}

	async getUrl() {
		const record = await this.getRecord();
		if (!record) return null;
		await this.pb.collection(this.collection).getOne(this.id);
		const token = await this.pb.files.getToken();
		return this.pb.files.getUrl(record, record[this.field as string], { token });
	}

	async getRecord() {
		try {
			return await this.pb.collection(this.collection).getOne(this.id);
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	async getBuffer() {
		const url = await this.getUrl();
		if (!url) return null;
		return await fetch(url).then((res) => res.arrayBuffer());
	}
}

// import { makePBAdmin } from './admin.ts';
// const pb = await makePBAdmin({ PB_URL: '', PB_PASS: '', PB_USER: '' });
// const file = new PBFile({ collection: 'users', pb, id: '', field: 'avatar' });

export { PBFile };
