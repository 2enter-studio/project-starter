import type { Locale } from '@/localizations';

export const load = async ({ params }) => {
	const locale = params.locale as Locale;
	return { locale };
};
