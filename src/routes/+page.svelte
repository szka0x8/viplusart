<script lang="ts">
	import { view } from '#lib/custom.svelte.ts';
	import HomeCard from '#lib/HomeCard.svelte';
</script>

<svelte:head>
	<title>{view.name}</title>
</svelte:head>

<HomeCard />
