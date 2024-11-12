const LOCALES = ['zh-tw', 'en'] as const;
const DEFAULT_LOCALE = LOCALES[0];
type Locale = (typeof LOCALES)[number];

type Keys = 'short_locale_name' | 'locale_name' | 'error' | 'close';

const localizations: Record<Locale, Record<Keys, string> & { locale: Locale }> = {
	'zh-tw': {
		locale: 'zh-tw',
		short_locale_name: '繁中',
		locale_name: '繁體中文',
		error: '錯誤',
		close: '關閉'
	},
	en: {
		locale: 'en',
		short_locale_name: 'EN',
		locale_name: 'english',
		error: 'Error',
		close: 'Close'
	}
};

export { localizations, LOCALES, DEFAULT_LOCALE };
export type { Locale };
