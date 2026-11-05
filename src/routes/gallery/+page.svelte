<script lang="ts">
	import Lightbox from '#lib/Lightbox.svelte';
	import { view, workItems } from '#lib/custom.svelte.ts';
	import GalleryCard from '#lib/GalleryCard.svelte';

	let items = $derived(workItems());
	let open: number | null = $state(null);
</script>

<svelte:head>
	<title>gallery · {view.name}</title>
</svelte:head>

<GalleryCard {items} onopen={(i) => (open = i)} />

<Lightbox {items} bind:index={open} />
