<script lang="ts">
	import type { GalleryItem } from './data.ts';
	import { custom, defaults, swapWork, editing } from './custom.svelte.ts';
	import { swappable } from './swap.ts';
	import Card from './Card.svelte';
	import Pic from './Pic.svelte';

	let { items, onopen }: { items: GalleryItem[]; onopen: (i: number) => void } = $props();

	let o = $derived(custom.on ? custom : defaults);
	const gaps = { tight: '4px', normal: '14px', wide: '28px' };
</script>

<Card back="top">
	<div
		class="grid {o.galLayout}"
		class:hero={o.galHero}
		style:--cols={o.galLayout === 'big' ? 1 : o.galCols}
		style:--gap={gaps[o.galGap]}
	>
		{#each items as item, i}
			<figure class:first={i === 0} use:swappable={{ i, enabled: editing.swap, onswap: swapWork }}>
				<button onclick={() => onopen(i)} aria-label={item.title}>
					<Pic
						{...item}
						alt={item.title}
						focus="g:{item.title}"
						sizes={i === 0 && o.galHero ? '(max-width: 700px) 90vw, 700px' : '(max-width: 700px) 45vw, 340px'}
					/>
				</button>
				{#if o.galTitles}
					<figcaption>{item.title}</figcaption>
				{/if}
			</figure>
		{/each}
	</div>
</Card>

<style>
	.grid.grid {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		gap: var(--gap);
	}

	.asis {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		gap: var(--gap);
		align-items: start;
	}

	.big {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
	}

	figure {
		margin: 0;
	}

	.grid.grid.hero .first {
		grid-column: 1 / -1;
	}

	.asis.hero .first {
		grid-column: 1 / -1;
	}

	button {
		display: block;
		width: 100%;
		padding: 0;
		border: none;
		background: none;
		cursor: zoom-in;
	}

	button :global(img) {
		width: 100%;
		border-radius: calc(var(--radius) * 0.7);
		transition: filter 0.2s;
	}

	.grid.grid button :global(img) {
		aspect-ratio: 1;
		object-fit: cover;
	}

	.grid.grid.hero .first :global(img) {
		aspect-ratio: 16 / 10;
	}

	button:hover :global(img) {
		filter: brightness(1.06);
	}

	figcaption {
		padding: 6px 4px 0;
		font-size: 13px;
		color: var(--mute);
		text-align: var(--a-info, left);
	}

	@media (max-width: 560px) {
		.grid.grid {
			grid-template-columns: repeat(min(var(--cols), 2), 1fr);
		}

		.asis {
			grid-template-columns: repeat(min(var(--cols), 2), 1fr);
		}
	}
</style>
