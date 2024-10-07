import nodeAdapter from '@sveltejs/adapter-node';
import bunAdapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs-extra';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { version } = packageJson;

/** @type {import('@sveltejs/kit').Config} */
function makeConfig(interpreter) {
	const adapter = interpreter === 'bun' ? bunAdapter : nodeAdapter;
	return {
		preprocess: vitePreprocess(),

		kit: {
			// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
			// If your environment is not supported or you settled on a specific environment, switch out the adapter.
			// See https://kit.svelte.dev/docs/adapters for more information about adapters.
			adapter: adapter({
				precompress: true
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

export default makeConfig('bun');
export { makeConfig };
