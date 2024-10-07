const fs = require('fs');
require('dotenv/config');

const projText = fs.readFileSync('./package.json', 'utf-8');

const { name: projName } = JSON.parse(projText);

const opts = {
	merge_logs: true,
	log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
	max_memory_restart: '150M'
};

module.exports = {
	apps: [
		{
			name: `${projName}_web-app`,
			interpreter: 'bun',
			script: './apps/web-app/build/index.js',
			instances: 1,
			out_file: './logs/web-app_out.log',
			error_file: './logs/web-app_error.log',
			env: {
				PORT: process.env.WEB_PORT || 3000
			},
			...opts
		},
		{
			name: `${projName}_pb`,
			script: `${process.env.PB_PATH || 'pocketbase'}`,
			args: `serve --http localhost:${process.env.PB_PORT || 8090}`,
			out_file: './logs/pocketbase_out.log',
			error_file: './logs/pocketbase_error.log',
			...opts
		}
	]
};
