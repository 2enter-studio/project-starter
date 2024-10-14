import { defineMDSveXConfig as defineConfig, escapeSvelte } from 'mdsvex';
// import type { MdsvexOptions } from 'mdsvex';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkCodeTitle from 'remark-code-title';

import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';

import { createHighlighter } from 'shiki';

const themes = { dark: 'tokyo-night', light: 'catppuccin-latte' };

// @ts-ignore
const highlighter = await createHighlighter({
	themes: Object.values(themes),
	langs: ['javascript', 'typescript', 'svelte', 'shell', 'json', 'css', 'html', 'md'],
	langAlias: { sveltehtml: 'svelte' }
});

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
	extensions: ['.md'],
	smartypants: {
		dashes: 'oldschool'
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					themes
				})
			);
			return `{@html \`${html}\` }`;
		}
	},
	remarkPlugins: [remarkUnwrapImages, remarkCodeTitle],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeToc,
			{
				cssClasses: {
					nav: false,
					toc: 'toc-wrapper',
					list: 'toc-list',
					link: 'toc-link'
				}
			}
		]
	]
};

export default defineConfig(config);
