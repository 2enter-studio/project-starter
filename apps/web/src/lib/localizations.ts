const LOCALES = ['zh-tw', 'en'] as const;
const DEFAULT_LOCALE = LOCALES[0];
type Locale = (typeof LOCALES)[number];

type Keys = 'hello' | 'world' | 'locale' | 'shortenLocale';

const localizations: Record<Locale, Record<Keys, string>> = {
	'zh-tw': { locale: '繁體中文', shortenLocale: '繁中', hello: '你好', world: '世界' },
	en: { locale: 'English', shortenLocale: 'EN', hello: 'hello', world: 'world' }
};

export { localizations, LOCALES, DEFAULT_LOCALE };
export type { Locale };
