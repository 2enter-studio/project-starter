const LOCALES = ['zh-tw', 'en'] as const;
const DEFAULT_LOCALE = LOCALES[0];
type Locale = (typeof LOCALES)[number];

type Keys = 'short_locale_name' | 'locale_name';

const localizations: Record<Locale, Record<Keys, string> & { locale: Locale }> = {
	'zh-tw': { locale: 'zh-tw', short_locale_name: '繁中', locale_name: '' },
	en: { locale: 'en', short_locale_name: 'EN', locale_name: '' }
};

export { localizations, LOCALES, DEFAULT_LOCALE };
export type { Locale };
