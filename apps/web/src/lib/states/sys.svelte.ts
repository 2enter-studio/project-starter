import type { Locale } from '@/localizations';
import { DEFAULT_LOCALE, localizations } from '@/localizations';

class SysState {
	processing = $state(false);
	errorMessage = $state<string | null>(null);

	locale = $state<Locale>(DEFAULT_LOCALE);

	readonly localization = $derived(localizations[this.locale]);

	popError = (message: string) => {
		this.errorMessage = message;
	};
}

const sysState = new SysState();

export { sysState };
