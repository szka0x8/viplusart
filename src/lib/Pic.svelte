<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import { custom, editing, save } from './custom.svelte.ts';

	let {
		pic,
		url,
		alt,
		sizes,
		loading = 'lazy',
		fetchpriority = 'auto',
		focus
	}: {
		pic?: Picture;
		url?: string | null;
		alt: string;
		sizes: string;
		loading?: 'lazy' | 'eager';
		fetchpriority?: 'high' | 'low' | 'auto';
		focus?: string;
	} = $props();

	let pos = $derived.by(() => {
		const f = custom.on && focus ? custom.focus[focus] : undefined;
		return f ? `object-position: ${f[0]}% ${f[1]}%` : undefined;
	});

	const clamp = (n: number) => Math.min(100, Math.max(0, n));

	function down(e: PointerEvent) {
		if (!editing.crop || !focus) return;
		const img = (e.currentTarget as HTMLElement).querySelector('img');
		if (!img) return;
		e.preventDefault();
		e.stopPropagation();
		const key = focus;
		const r = img.getBoundingClientRect();
		const [fx, fy] = custom.focus[key] ?? [50, 50];
		const sx = e.clientX;
		const sy = e.clientY;
		let moved = false;

		const move = (ev: PointerEvent) => {
			const dx = ev.clientX - sx;
			const dy = ev.clientY - sy;
			if (Math.hypot(dx, dy) > 3) moved = true;
			custom.focus = {
				...custom.focus,
				[key]: [Math.round(clamp(fx - (dx / r.width) * 150)), Math.round(clamp(fy - (dy / r.height) * 150))]
			};
			custom.on = true;
		};
		const up = () => {
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerup', up);
			window.removeEventListener('pointercancel', up);
			save();
			if (moved) {
				const stop = (ev: Event) => {
					ev.stopPropagation();
					ev.preventDefault();
				};
				window.addEventListener('click', stop, { capture: true, once: true });
				setTimeout(() => window.removeEventListener('click', stop, { capture: true }), 60);
			}
		};
		window.addEventListener('pointermove', move);
		window.addEventListener('pointerup', up);
		window.addEventListener('pointercancel', up);
	}
</script>

<span class="pic" onpointerdown={down} role="presentation">
	{#if url}
		<img src={url} {alt} {loading} style={pos} draggable="false" decoding="async" />
	{:else if pic}
		<enhanced:img src={pic} {alt} {sizes} {loading} {fetchpriority} style={pos} draggable="false" decoding="async" />
	{/if}
</span>

<style>
	.pic {
		display: contents;
	}
</style>
