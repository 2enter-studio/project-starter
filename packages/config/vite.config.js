import fs from 'fs-extra';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const serverConfig = {
	'web-app': { port: 5173 },
	docs: { port: 5174 }
};

const appInfo = fs.readFileSync('./package.json', 'utf-8');
const { name: appName } = JSON.parse(appInfo);

export default defineConfig({
	plugins: [sveltekit()],
	server: { port: serverConfig[appName].port }
});
