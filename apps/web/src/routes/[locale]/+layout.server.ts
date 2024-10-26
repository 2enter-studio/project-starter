import type { Locale } from '@/localizations';

import { redirect } from '@sveltejs/kit';
import { DEFAULT_LOCALE, LOCALES, localizations } from '@/localizations';

export const load = async ({ params }) => {
	const locale = params.locale as Locale;
	if (!LOCALES.includes(locale)) {
		redirect(308, `/${DEFAULT_LOCALE}`);
	}
	const localization = localizations[locale];
	return { locale, localization };
};
