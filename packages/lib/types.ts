type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

type ParseEnum<T extends string | number | bigint | boolean | null | undefined> = `${T}`;

export type { Prettify, ParseEnum };
