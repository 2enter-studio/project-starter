const fs = require('fs-extra');
require('dotenv').config();

const projText = fs.readFileSync('./package.json', 'utf-8');

const { name: projName } = JSON.parse(projText);

function makeOpts(appName) {
	return {
		name: `${projName}_${appName}`,
		merge_logs: true,
		log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
		max_memory_restart: '150M',
		out_file: `./logs/${appName}_out.log`,
		error_file: `./logs/${appName}_error.log`
	};
}

module.exports = {
	apps: [
		{
			...makeOpts('web-app'),
			interpreter: 'bun',
			script: './apps/web-app/build/index.js',
			instances: 1,
			env: {
				PORT: process.env.WEB_PORT || 3000,
				NODE_ENV: 'production'
			}
		},
		{
			...makeOpts('pb'),
			script: `${process.env.PB_PATH || 'pocketbase'}`,
			args: `serve --http localhost:${process.env.PB_PORT || 8090}`,
			env: {
				NODE_ENV: 'production'
			}
		}
	]
};
