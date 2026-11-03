<script lang="ts">
	import type { GalleryItem } from './data.ts';
	import Pic from './Pic.svelte';

	let { items, index = $bindable() }: { items: GalleryItem[]; index: number | null } = $props();

	function close() {
		index = null;
	}

	function step(d: number) {
		if (index === null) return;
		index = (index + d + items.length) % items.length;
	}

	function onkey(e: KeyboardEvent) {
		if (index === null) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') step(1);
		if (e.key === 'ArrowLeft') step(-1);
	}
</script>

<svelte:window onkeydown={onkey} />

{#if index !== null}
	<div class="overlay" onclick={close} role="presentation">
		<button onclick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
		<Pic pic={items[index].pic} url={items[index].url} alt={items[index].title} sizes="85vw" loading="eager" />
		<button onclick={(e) => { e.stopPropagation(); step(1); }}>›</button>
		<p>{items[index].title}</p>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgb(0 0 0 / 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.overlay :global(img) {
		width: 85vw;
		height: 85vh;
		object-fit: contain;
	}

	button {
		background: none;
		border: none;
		color: inherit;
		font-size: 3rem;
		cursor: pointer;
		padding: 16px;
	}

	p {
		position: absolute;
		bottom: 16px;
	}
</style>