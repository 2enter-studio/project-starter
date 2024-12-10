import { ViteConfigBuilder } from '@repo/config/vite.config.js';
const config = new ViteConfigBuilder().useHTTPS().build();
export default config;
// export default new ViteConfigBuilder().useHTTPS().build();
