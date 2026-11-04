<script lang="ts">
	import type { GalleryItem } from './data.ts';
	import Card from './Card.svelte';
	import Pic from './Pic.svelte';

	let { items, onopen }: { items: GalleryItem[]; onopen: (i: number) => void } = $props();
</script>

<Card back="top">
	<div class="grid">
		{#each items as item, i}
			<button class:big={i === 0} onclick={() => onopen(i)} aria-label={item.title}>
				<Pic {...item} alt={item.title} sizes={i === 0 ? '(max-width: 700px) 90vw, 700px' : '(max-width: 700px) 45vw, 340px'} />
			</button>
		{/each}
	</div>
</Card>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}

	button {
		padding: 0;
		border: none;
		background: none;
		cursor: zoom-in;
	}

	.big {
		grid-column: 1 / -1;
	}

	button :global(img) {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: calc(var(--radius) * 0.7);
		transition: filter 0.2s;
	}

	.big :global(img) {
		aspect-ratio: 16 / 10;
	}

	button:hover :global(img) {
		filter: brightness(1.06);
	}
</style>
