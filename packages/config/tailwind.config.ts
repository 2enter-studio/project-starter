import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';

const THEMES = { light: ['retro'], dark: ['synthwave', 'gruvbox'] } as const;
type ThemeName = 'retro' | 'synthwave' | 'gruvbox';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}', '../../packages/ui/**/*.{html,js,svelte,ts,md}', './mdsvex.config.ts'],
	theme: {
		extend: {}
	},
	plugins: [daisyui, typography],
	daisyui: {
		themes: [
			'synthwave',
			'retro',
			{
				gruvbox: {
					primary: '#83a598',
					secondary: '#d3869b',
					accent: '#f38019',
					neutral: '#928374',
					'base-100': '#282828',
					info: '#83c07c',
					success: '#b88b26',
					warning: '#fabd2f',
					error: '#fb4934'
				}
			}
		]
	},
	darkMode: 'class'
};

export { THEMES };
export type { ThemeName };

// Primary: --blue (#83a598)
// Secondary: --purple (#d3869b)
// Accent: --orange (#fe8019)
// Neutral: --gray (#928374)
// Base-100: --bg (#282828)
// Info: --aqua (#8ec07c)
// Success: --green (#b8bb26)
// Warning: --yellow (#fabd2f)
// Error: --red (#fb4934)
