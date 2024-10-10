<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();

	let num = $state<GlobalHolyNumber>(420);
	function switchNum() {
		num = num === 420 ? 69 : 420;
	}
</script>

<button class="btn {num === 420 ? 'btn-secondary' : 'btn-primary'}" onclick={switchNum}>
	{text}: {num}
</button>
