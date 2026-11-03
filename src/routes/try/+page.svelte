<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { custom, save } from '#lib/custom.svelte.ts';

	onMount(() => {
		custom.panel = true;
		custom.open = true;
		save();
		goto('/', { replaceState: true });
	});
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>
