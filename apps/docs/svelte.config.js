import { SvelteConfigBuilder } from '@repo/config/svelte.config.js';
import mdsvexConfig from './mdsvex.config.js';

const config = new SvelteConfigBuilder('bun').useMDSVEX(mdsvexConfig).build();

export default config;
