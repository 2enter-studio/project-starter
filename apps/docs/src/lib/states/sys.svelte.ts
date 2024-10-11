class SysState {
	theme = $state<'gruvbox' | 'synthwave' | 'retro'>('gruvbox');
}

const sysState = new SysState();

export { sysState };
