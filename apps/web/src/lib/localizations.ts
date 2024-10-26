type Keys = 'hello' | 'world';
const LOCALES = ['zh-tw', 'en'] as const;
const DEFAULT_LOCALE = LOCALES[0];
type Locale = (typeof LOCALES)[number];

const localizations: Record<Locale, Record<Keys, string>> = {
	'zh-tw': { hello: '', world: '' },
	en: { hello: '', world: '' }
} as const;

export { localizations, LOCALES, DEFAULT_LOCALE };
export type { Locale };
