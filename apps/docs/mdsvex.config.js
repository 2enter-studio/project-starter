import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
	extensions: ['.md'],
	smartypants: {
		dashes: 'oldschool'
	}

	// remarkPlugins: [
	// 	// adds a `readingTime` frontmatter attribute
	// 	readingTime(),
	// 	relativeImages,
	// 	// external links open in a new tab
	// 	[remarkExternalLinks, { target: '_blank', rel: 'noopener' }]
	// ],
	// rehypePlugins: [
	// 	slugPlugin,
	// 	[
	// 		autolinkHeadings,
	// 		{
	// 			behavior: 'wrap'
	// 		}
	// 	]
	// ]
});

export default config;
