import fs from 'fs-extra';
import devServerConfig from '@repo/config/dev-server.json' with { type: 'json' };
import mkcert from 'vite-plugin-mkcert';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

class ViteConfigBuilder {
	constructor() {
		const appInfo = fs.readFileSync('./package.json', 'utf-8');
		const { name: appName } = JSON.parse(appInfo);

		const port = devServerConfig[appName]?.port || 5180;
		const host = devServerConfig[appName]?.host || 'localhost';

		this.plugins = [sveltekit()];
		this.server = { port, host };

	}

	build() {
		return defineConfig({
			plugins: this.plugins,
			server: this.server
		});
	}

	useHTTPS() {
		this.plugins.push(mkcert(
			// {
			// 	savePath: './.certs',
			// 	force: true
			// }
		));
		this.server.https = true;
		this.server.proxy = {}
		return this;
	}
}

export { ViteConfigBuilder };
