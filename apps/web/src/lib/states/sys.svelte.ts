import type { Locale } from '@/localizations';
import { getContext, setContext } from 'svelte';
import { DEFAULT_LOCALE, localizations } from '@/localizations';
import { Pages } from '../../routes/[locale]/pages';

class SysState {
	processing = $state(false);
	errorMessage = $state<string | null>(null);
	pageNum = $state<number>(0);
	dialog = $state<HTMLDialogElement>();
	locale = $state<Locale>(DEFAULT_LOCALE);

	readonly page = $derived(Pages[this.pageNum].component);
	readonly localization = $derived(localizations[this.locale]);

	popError = (message: string) => {
		this.errorMessage = message;
		if (!this.dialog) return;
		this.dialog.showModal();
	};

	closeError = () => {
		this.errorMessage = null;
		if (!this.dialog) return;
		this.dialog.close();
	};

	navigate = (action: number) => {
		let result = this.pageNum + action;
		if (!this.validPage(result)) {
			this.popError('invalid page');
			return;
		}
		if (result < 0) {
			window.location.href = '/';
			return;
		}

		this.pageNum = result;
	};

	validPage = (id: number | string) => {
		if (typeof id === 'number') {
			return id >= 0 && id < Pages.length;
		} else {
			return Pages.some((Page) => Page.name === id);
		}
	};

	routeTo = (id: number | string) => {
		if (!this.validPage(id)) {
			this.popError('invalid page');
			return;
		}

		switch (typeof id) {
			case 'number':
				this.pageNum = id;
				break;
			case 'string':
				const i = Pages.findIndex((Page) => Page.name === id);
				if (i !== -1) this.pageNum = i;
				break;
		}
	};
}

function setSysState() {
	return setContext('SYS_STATE', new SysState());
}

function getSysState() {
	return getContext<ReturnType<typeof setSysState>>('SYS_STATE');
}

export { setSysState, getSysState };
