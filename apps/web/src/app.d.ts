// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	type PageNum = 0 | 1 | 2 | 3;
	type SubmitResult = { id: string; name: string; message: string } | { message: string };
}

export {};
