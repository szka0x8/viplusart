<script lang="ts">
	import { site, gallery } from '#lib/data.ts';
	import Lightbox from '#lib/Lightbox.svelte';

	let open: number | null = $state(null);
</script>

<svelte:head>
	<title>work · {site.name}</title>
</svelte:head>

<main>
	<div class="head">
		<h1>work</h1>
		<span>{gallery.length} pieces</span>
	</div>

	<div class="grid">
		{#each gallery as item, i}
			<figure>
				<button onclick={() => (open = i)} aria-label={item.title}>
					<enhanced:img src={item.pic} alt={item.title} sizes="(max-width: 700px) 100vw, 33vw" loading="lazy" />
				</button>
				<figcaption>
					<span>{item.title}</span>
					<span>{String(i + 1).padStart(2, '0')}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
</main>

<Lightbox items={gallery} bind:index={open} />

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
		font-size: clamp(48px, 9vw, 120px);
		font-weight: 900;
		font-stretch: 125%;
		line-height: 0.9;
		letter-spacing: -0.03em;
	}

	.head span {
		color: var(--mute);
	}

	.grid {
		columns: 3 280px;
		column-gap: 16px;
	}

	figure {
		break-inside: avoid;
		margin-bottom: 22px;
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

	figcaption {
		display: flex;
		justify-content: space-between;
		padding-top: 6px;
		font-size: 13px;
		color: var(--mute);
	}
</style>