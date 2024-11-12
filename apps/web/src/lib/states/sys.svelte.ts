import type { Locale } from '@/localizations';
import { DEFAULT_LOCALE, localizations } from '@/localizations';

class SysState {
	processing = $state(false);
	errorMessage = $state<string | null>(null);
	pageNum = $state<PageNum>(0);

	locale = $state<Locale>(DEFAULT_LOCALE);

	readonly localization = $derived(localizations[this.locale]);

	popError = (message: string) => {
		this.errorMessage = message;
	};

	closeError = () => {
		this.errorMessage = null;
	};

	navigate = (action: -1 | 1) => {
		// if (this.pageNum === 2 && action === -1) {
		// 	window.location.href = '/';
		// 	return;
		// }
		//
		let result = this.pageNum + action;
		if (result < 0) {
			window.location.href = '/';
			return;
		}

		this.pageNum = result as 0 | 1 | 2 | 3;
	};
}

const sysState = new SysState();

export { sysState };
