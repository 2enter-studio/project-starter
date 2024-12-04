const fs = require('fs-extra');
require('dotenv').config();

const projText = fs.readFileSync('./package.json', 'utf-8');

const { name: projName } = JSON.parse(projText);

function makeOpts(appName) {
	return {
		name: `${projName}_${appName}`,
		cwd: `./apps/${appName}`,
		merge_logs: true,
		log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
		max_memory_restart: '150M',
		out_file: `../../logs/${appName}_out.log`,
		error_file: `../../logs/${appName}_error.log`,
		env: {
			port: process.env[`${appName.toUpperCase()}_PORT`] || 3000,
			NODE_ENV: 'production'
		}
	};
}

module.exports = {
	apps: [
		{
			...makeOpts('web'),
			interpreter: 'bun',
			script: './server.js',
			instances: 1
		},
		{
			...makeOpts('pb'),
			script: `${process.env.PB_PATH || 'pocketbase'}`,
			args: `serve --http 127.0.0.1:${process.env.PB_PORT || 8090} --dir=pb_data`
		}
	]
};
