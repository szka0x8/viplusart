<script lang="ts">
	import { site, gallery } from '#lib/data.ts';
	import Lightbox from '#lib/Lightbox.svelte';
	import { custom, defaults, view } from '#lib/custom.svelte.ts';
	import Pic from '#lib/Pic.svelte';

	let o = $derived(custom.on ? custom : defaults);
	let items = $derived(custom.on && custom.workPics.length ? custom.workPics : gallery);
	const gaps = { tight: '4px', normal: '16px', wide: '36px' };

	let open: number | null = $state(null);
</script>

<svelte:head>
	<title>work · {view.name}</title>
</svelte:head>

<main>
	<div class="head">
		<h1>work</h1>
		<span>{items.length} pieces</span>
	</div>

	<div
		class="grid {o.workLayout}"
		style:--cols={o.workCols}
		style:--gap={gaps[o.workGap]}
	>
		{#each items as item, i}
			<figure>
				<button onclick={() => (open = i)} aria-label={item.title}>
					<Pic {...item} alt={item.title} sizes="(max-width: 700px) 100vw, 33vw" />
				</button>
				{#if o.workTitles}
					<figcaption>
						<span>{item.title}</span>
						<span>{String(i + 1).padStart(2, '0')}</span>
					</figcaption>
				{/if}
			</figure>
		{/each}
	</div>
</main>

<Lightbox {items} bind:index={open} />

<style>
	main {
		padding: 0 var(--pad) 64px;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin: 28px 0 24px;
	}

	h1 {
		font-size: calc(clamp(48px, 9vw, 120px) * var(--title-scale, 1));
		line-height: 0.9;
	}

	.head span {
		color: var(--mute);
	}

	.masonry {
		columns: var(--cols);
		column-gap: var(--gap);
	}

	.masonry figure {
		break-inside: avoid;
		margin-bottom: var(--gap);
	}

	.grid.grid {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		gap: var(--gap);
	}

	.grid.grid :global(img) {
		aspect-ratio: 4 / 5;
		object-fit: cover;
	}

	.big {
		display: flex;
		flex-direction: column;
		gap: calc(var(--gap) * 2);
		max-width: 900px;
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
	}

	@media (max-width: 700px) {
		.masonry {
			columns: min(var(--cols), 2);
		}

		.grid.grid {
			grid-template-columns: repeat(min(var(--cols), 2), 1fr);
		}
	}

	figure {
		margin: 0;
	}

	figcaption {
		display: flex;
		justify-content: space-between;
		padding-top: 6px;
		font-size: 13px;
		color: var(--mute);
	}
</style>