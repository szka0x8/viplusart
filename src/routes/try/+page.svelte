<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { custom, save, applyShare } from '#lib/custom.svelte.ts';

	onMount(() => {
		if (location.hash.length > 1) applyShare(location.hash.slice(1));
		custom.panel = true;
		custom.open = true;
		save();
		goto('/', { replaceState: true });
	});
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>
