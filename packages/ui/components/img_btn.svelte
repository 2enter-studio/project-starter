<script lang="ts">
	interface Props {
		src: string;
		onclick?: () => void;
		ontouchstart?: () => void;
		ontouchend?: () => void;
		type?: 'button' | 'submit' | 'reset' | null;
		form?: string;
		class?: string;
	}

	let { class: className, src, onclick = () => {}, ontouchstart, ontouchend, ...others }: Props = $props();

	let img = $state<HTMLImageElement>();

	function scaleImg(num: number) {
		if (!img) return;
		img.style.transform = `scale(${num})`;
	}
</script>

<button
	class="{className} "
	aria-label="button"
	{...others}
	{onclick}
	ontouchstart={() => {
		scaleImg(0.9);
		ontouchstart?.();
	}}
	ontouchend={() => {
		scaleImg(1);
		ontouchend?.();
	}}
>
	<img bind:this={img} {src} alt="" class="w-full transition-transform duration-100" />
</button>
