import { default as Intro } from './intro.svelte';
import { default as Name } from './name.svelte';
import { default as Message } from './message.svelte';

export const Pages = [
	{ name: 'intro', component: Intro },
	{ name: 'name', component: Name },
	{ name: 'message', component: Message }
];
