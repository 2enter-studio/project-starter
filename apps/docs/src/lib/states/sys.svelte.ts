import { getContext, setContext } from 'svelte';

class SysState {
	theme = $state<'gruvbox' | 'synthwave' | 'retro'>('gruvbox');
}

export function setSysState() {
	return setContext('SYS_STATE', new SysState());
}

export function getSysState() {
	return getContext<ReturnType<typeof setSysState>>('SYS_STATE');
}
