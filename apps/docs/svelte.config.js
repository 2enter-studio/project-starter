import { makeConfig } from '@repo/config/svelte.config.js';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

const config = makeConfig('bun');

config.preprocess.push(mdsvex(mdsvexConfig));
config.extensions = ['.svelte', ...mdsvexConfig.extensions];

export default config;
