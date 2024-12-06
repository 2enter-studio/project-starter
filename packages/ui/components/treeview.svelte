<script lang="ts">
	type TreeNode = {
		name: string;
		link?: string;
		children?: TreeNode[];
	};

	interface Props {
		class?: string;
		nodes: TreeNode[];
	}

	let { class: className, nodes }: Props = $props();
</script>

{#snippet Name(node: TreeNode)}
	{@const { name, link } = node}
	{#if link}
		<a href={link}>{name}</a>
	{:else}
		<span>{name}</span>
		<br />
	{/if}
{/snippet}

{#snippet Folder(nodes: TreeNode[], layer = 0)}
	<div class:pl-5={layer > 0} class:border-l-[1px]={layer > 0} class="border-base-content/30 select-none rounded-bl-md">
		{#each nodes as node}
			{@const { children } = node}
			{#if children}
				<details open class="">
					<summary class="cursor-pointer">
						{@render Name(node)}
					</summary>
					{@render Folder(children, layer + 1)}
				</details>
			{:else}
				{@render Name(node)}
			{/if}
		{/each}
	</div>
{/snippet}

<div class="{className} ">
	{@render Folder(nodes)}
</div>

<!--
@component
-->
