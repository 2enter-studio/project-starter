import { $ } from 'bun';
import fs from 'fs-extra';
import { Command } from 'commander';
import { input, confirm, select, number } from '@inquirer/prompts';

const devServerConfig = fs.readJSONSync('./packages/config/dev-server.json', 'utf-8') as Record<string, { port: number }>;

const program = new Command();

program.name('Svelte app initializer').description('Use this CLI to create a new Svelte app!').version('1.0.0');

program.parse();

const appName = await input({
	message: "What's the app's name: ",
	validate: (name: string) => {
		if (!name) return 'This is a must';
		return true;
	}
});

const adapter = (await select({
	message: 'The svelte adapter',
	choices: ['bun', 'node'],
	default: 'bun'
})) as string;

const usePB = await confirm({
	message: 'Does this app need to connect to the pocketbase?',
	default: true
});

const defaultPort = Math.max(...Object.values(devServerConfig).map((v) => v.port)) + 1;

const devPort = (await number({
	message: `Set a port number for the dev server: (default: ${defaultPort})`,
	default: defaultPort
})) as number;

devServerConfig[appName] = { port: devPort };

await $`cp -r ./examples/svelte-app ./apps/${appName}`;

const packageJson = await fs.readJSONSync(`./apps/${appName}/package.json`);
packageJson.name = appName;

fs.writeFileSync(`./apps/${appName}/package.json`, JSON.stringify(packageJson, null, 2));
fs.writeFileSync(`./packages/config/dev-server.json`, JSON.stringify(devServerConfig, null, 2));
fs.writeFileSync(
	`./apps/${appName}/svelte.config.js`,
	`import { makeConfig } from '@repo/config/svelte.config.js';
export default makeConfig('${adapter}');
	`
);

console.log(`${appName} created!`);
