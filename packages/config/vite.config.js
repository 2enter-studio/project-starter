import fs from 'fs-extra';
import devServerConfig from '@repo/config/dev-server.json' with { type: 'json' };

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

function makeConfig() {
	const appInfo = fs.readFileSync('./package.json', 'utf-8');
	const { name: appName } = JSON.parse(appInfo);

	const port = devServerConfig[appName]?.port || 5180;
	const host = devServerConfig[appName]?.host || 'localhost';

	return defineConfig({
		plugins: [sveltekit()],
		server: { port, host }
	});
}

export { makeConfig };
