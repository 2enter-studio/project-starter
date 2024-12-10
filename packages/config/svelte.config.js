import fs from 'fs-extra';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import chalk from 'chalk';
import { mdsvex } from 'mdsvex';

import node from '@sveltejs/adapter-node';
import bun from 'svelte-adapter-bun';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { version } = packageJson;

const adapters = {
	bun,
	node
};

class SvelteConfigBuilder {
	constructor() {
		this.preprocess = [vitePreprocess()];
	}

	build() {
		if (!this.adapter) {
			this.setInterpreter('bun');
		}
		/** @type {import('@sveltejs/kit').Config} */
		return {
			preprocess: this.preprocess,

			kit: {
				// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
				// If your environment is not supported or you settled on a specific environment, switch out the adapter.
				// See https://kit.svelte.dev/docs/adapters for more information about adapters.
				csrf: { checkOrigin: false },
				adapter: this.adapter({
					preprocess: true
				}),
				version: {
					name: version
				},
				alias: {
					'@/*': './src/lib/*'
				}
			}
		};
	}

	setInterpreter(interpreter) {
		if (!['bun', 'node'].includes(interpreter)) {
			throw new Error(`Invalid interpreter: ${interpreter}`);
		}
		this.adapter = adapters[interpreter];
		const color = interpreter === 'bun' ? chalk.yellow.bgBlue : chalk.red.bgCyan;
		console.log(color(` Using adapter: ${interpreter} `));
		return this;
	}

	useMDSVEX(config) {
		this.preprocess.push(mdsvex(config));
		this.extensions = ['.svelte', ...config.extensions];
		return this;
	}
}

export { SvelteConfigBuilder };
