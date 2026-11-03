<script lang="ts">
	import { site, gallery } from '#lib/data.ts';
	import Lightbox from '#lib/Lightbox.svelte';

	let open: number | null = $state(null);
</script>

<svelte:head>
	<title>gallery · {site.name}</title>
</svelte:head>

<a href="/">← back</a>
<h1>gallery</h1>

<main>
	{#each gallery as item, i}
		<button onclick={() => (open = i)} aria-label={item.title}>
			<enhanced:img src={item.pic} alt={item.title} sizes="(max-width: 600px) 100vw, 33vw" loading="lazy" />
		</button>
	{/each}
</main>

<Lightbox items={gallery} bind:index={open} />

<style>
	main {
		columns: 3 280px;
		gap: 12px;
	}

	button {
		display: block;
		width: 100%;
		margin-bottom: 12px;
		padding: 0;
		border: none;
		background: none;
		cursor: zoom-in;
		break-inside: avoid;
	}

	button :global(img) {
		display: block;
		width: 100%;
	}
</style>