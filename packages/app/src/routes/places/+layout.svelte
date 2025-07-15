<script lang="ts">
	let { children } = $props()
</script>

<svelte:boundary>
	{@render children?.()}
	{#snippet pending()}
		pending...
	{/snippet}
</svelte:boundary>
