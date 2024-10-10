<script lang="ts">
	import '@repo/config/app.css';
	import { ThemeSwitcher } from '@repo/ui';

	let { children } = $props();
</script>

<div class="full-screen flex flex-row overflow-hidden">
	<div class="w-[30vw] bg-base-300">
		<ThemeSwitcher />
	</div>
	<div class="col-span-2 overflow-y-auto">
		{@render children()}
	</div>
</div>
