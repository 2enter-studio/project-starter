import fs from 'fs-extra';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import node from '@sveltejs/adapter-node';
import bun from 'svelte-adapter-bun';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { version } = packageJson;

const adapters = {
	bun,
	node
};

/** @type {import('@sveltejs/kit').Config} */
function makeConfig(interpreter = 'bun') {
	const adapter = adapters[interpreter];
	console.log(`Using adapter: ${interpreter}`);

	return {
		preprocess: [vitePreprocess()],

		kit: {
			// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
			// If your environment is not supported or you settled on a specific environment, switch out the adapter.
			// See https://kit.svelte.dev/docs/adapters for more information about adapters.
			adapter: adapter({
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

export { makeConfig };
