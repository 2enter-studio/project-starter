import type { ActionResult, SubmitFunction } from '@sveltejs/kit';

function makeEnhanceHandler<T>(args: {
	handlers: Partial<Record<ActionResult['type'], (data?: T) => Promise<any>>>;
	getFiles?: () => Promise<{ name: string; file: File }[] | null>;
	onstart?: () => void;
	onfinish?: () => void;
	validate?: () => any;
	confirmMessage?: string;
}): SubmitFunction {
	const { handlers, getFiles, confirmMessage, validate, onstart, onfinish } = args;

	return async ({ cancel, formData }) => {
		if (!(validate?.() ?? true) || confirmMessage ? confirm(confirmMessage) : false) {
			cancel();
			return;
		}
		onstart?.();

		const files = await getFiles?.();

		if (files) {
			for (const { name, file } of files) {
				formData.append(name, file, file.name);
			}
		}

		return async ({ update, result }) => {
			await update({ reset: false });
			onfinish?.();

			const handler = handlers[result.type];
			if (!handler) return;

			if ('data' in result) {
				const data = result.data as T;
				await handler(data);
			} else {
				await handler();
			}
		};
	};
}

export { makeEnhanceHandler };
