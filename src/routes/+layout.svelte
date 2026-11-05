<script lang="ts">
	import '@fontsource-variable/archivo/wdth.css';
	import favicon from '#lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import Particles from '#lib/Particles.svelte';
	import { custom, load, view, editing, colorKeys, gradKeys } from '#lib/custom.svelte.ts';
	import TryPanel from '#lib/TryPanel.svelte';
	import { fontById, bodyFontById } from '#lib/fonts.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	let grainUrl = $state('');

	onNavigate((nav) => {
		if (!view.o.pageFade || !document.startViewTransition) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((done) => {
			document.startViewTransition(async () => {
				done();
				await nav.complete;
			});
		});
	});

	onMount(() => {
		load();
		const c = document.createElement('canvas');
		c.width = c.height = 160;
		const ctx = c.getContext('2d')!;
		const img = ctx.createImageData(160, 160);
		for (let i = 0; i < img.data.length; i += 4) {
			const v = Math.random() * 255;
			img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
			img.data[i + 3] = 90;
		}
		ctx.putImageData(img, 0, 0);
		grainUrl = c.toDataURL();
	});

	$effect(() => {
		const root = document.documentElement.style;
		for (const k of colorKeys) {
			if (custom.on) root.setProperty(`--${k}`, custom[k]);
			else root.removeProperty(`--${k}`);
		}
	});

	$effect(() => {
		const root = document.documentElement.style;
		const f = fontById(custom.font);
		if (custom.on) {
			f.load?.();
			root.setProperty('--display', f.family);
			root.setProperty('--display-weight', String(f.weight));
			root.setProperty('--display-stretch', f.stretch);
			root.setProperty('--display-spacing', f.spacing);
		} else {
			for (const k of ['display', 'display-weight', 'display-stretch', 'display-spacing'])
				root.removeProperty(`--${k}`);
		}
	});

	$effect(() => {
		const html = document.documentElement;
		const b = bodyFontById(custom.bodyFont);
		if (custom.on) {
			b.load?.();
			html.style.setProperty('--body', b.family);
		} else html.style.removeProperty('--body');
		if (custom.on && custom.titleScale !== 1) html.style.setProperty('--title-scale', String(custom.titleScale));
		else html.style.removeProperty('--title-scale');
		html.classList.toggle('bw', custom.on && custom.bw);
		for (const k of gradKeys) {
			const g = custom.grads?.[k];
			const on = custom.on && !!g?.on;
			if (on) {
				html.style.setProperty(`--${k}2`, g.c2);
				html.style.setProperty(`--${k}-angle`, `${g.angle}deg`);
			} else {
				html.style.removeProperty(`--${k}2`);
				html.style.removeProperty(`--${k}-angle`);
			}
			if (k === 'ink' || k === 'mute' || k === 'line' || k === 'btntext') html.classList.toggle(`g-${k}`, on);
		}
		html.classList.toggle('edit-swap', editing.swap);
		html.classList.toggle('fx-reveal', view.o.reveal);
		html.classList.toggle('fx-lift', view.o.lift);
		html.classList.toggle('edit-crop', editing.crop);
		if (custom.on) html.style.setProperty('--radius', `${custom.radius}px`);
		else html.style.removeProperty('--radius');
		if (custom.on) html.style.setProperty('--card-alpha', `${custom.cardAlpha}%`);
		else html.style.removeProperty('--card-alpha');

		const flex = { left: 'flex-start', center: 'center', right: 'flex-end' } as const;
		const mi = { left: ['0', 'auto'], center: ['auto', 'auto'], right: ['auto', '0'] } as const;
		for (const part of ['title', 'info', 'buttons', 'terms', 'lists', 'socials'] as const) {
			const own = custom.alignParts?.[part] ?? 'auto';
			const a = own !== 'auto' ? own : custom.align;
			if (custom.on && a !== 'auto') {
				html.style.setProperty(`--a-${part}`, a);
				html.style.setProperty(`--af-${part}`, flex[a]);
				html.style.setProperty(`--ml-${part}`, mi[a][0]);
				html.style.setProperty(`--mr-${part}`, mi[a][1]);
			} else for (const k of ['a', 'af', 'ml', 'mr']) html.style.removeProperty(`--${k}-${part}`);
		}
		if (custom.on) html.style.setProperty('--card-pos', flex[custom.cardPos]);
		else html.style.removeProperty('--card-pos');
	});

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if custom.on && custom.bg}
	<div
		class="bgimg"
		style:background-image={`url(${custom.bg})`}
		style:opacity={custom.bgOpacity}
		style:filter={`blur(${custom.bgBlur}px)`}
	></div>
	{#if custom.tintAmount > 0}
		<div class="tint" style:opacity={custom.tintAmount}></div>
	{/if}
{/if}

{@render children()}

{#if custom.on && custom.grain > 0}
	<div class="grain" style:opacity={custom.grain} style:background-image={grainUrl ? `url(${grainUrl})` : 'none'}></div>
{/if}

{#if view.o.particles !== 'none'}
	<Particles kind={view.o.particles} color={view.o.pcolor} color2={view.o.grads.pcolor.on ? view.o.grads.pcolor.c2 : view.o.pcolor} />
{/if}

{#if custom.panel}
	<TryPanel />
{/if}

<style>
	:global(:root) {
		--paper: #eeebe4;
		--page: #eeebe4;
		--ink: #151515;
		--mute: #77736b;
		--line: #d3cec4;
		--name: var(--ink);
		--btn: #dcd8d0;
		--btntext: var(--ink);
		--icon: var(--mute);
		--fx: #b98cff;
		--pcolor: var(--fx);
		--tint: #000000;
		--paper2: var(--paper);
		--page2: var(--page);
		--ink2: var(--ink);
		--mute2: var(--mute);
		--line2: var(--line);
		--name2: var(--name);
		--btn2: var(--btn);
		--btntext2: var(--btntext);
		--fx2: var(--fx);
		--tint2: var(--tint);
		--radius: 24px;
		--pad: clamp(16px, 4vw, 48px);
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
	}

	:global(body) {
		background: linear-gradient(var(--page-angle, 135deg), var(--page), var(--page2));
		color: var(--ink);
		font-family: var(--body, 'Archivo Variable'), system-ui, sans-serif;
		font-size: 15px;
		line-height: 1.45;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	:global(a) {
		color: inherit;
	}

	:global(img) {
		max-width: 100%;
		height: auto;
		display: block;
	}

	:global(h1) {
		font-family: var(--display, 'Archivo Variable'), system-ui, sans-serif;
		font-weight: var(--display-weight, 900);
		font-stretch: var(--display-stretch, 125%);
		letter-spacing: var(--display-spacing, -0.03em);
	}

	:global(html.js img) {
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	:global(html.js img.in) {
		opacity: 1;
	}

	:global(html.js img.now) {
		transition: none;
	}

	:global(::selection) {
		background: var(--ink);
		color: var(--paper);
	}

	:global(html.g-ink main :where(p, li, h2, h3, dt, dd, a:not(.btn, .pill, .back))) {
		background: linear-gradient(var(--ink-angle, 90deg), var(--ink), var(--ink2));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent !important;
	}

	:global(html:is(.g-ink, .g-mute) main :is(.status, .mail span, figcaption, .payment)) {
		background: linear-gradient(var(--mute-angle, 90deg), var(--mute), var(--mute2));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent !important;
	}

	:global(html.g-line hr.sep) {
		border-image: linear-gradient(var(--line-angle, 90deg), var(--line), var(--line2)) 1;
	}

	:global(:is(.btn, .pill, .back)) {
		background: linear-gradient(var(--btn-angle, 90deg), var(--btn), var(--btn2));
		color: var(--btntext);
		transition: filter 0.2s;
	}

	:global(:is(.btn, .pill, .back):hover) {
		filter: brightness(0.94);
	}

	:global(html.g-btntext :is(.btn, .pill, .back) > span) {
		background: linear-gradient(var(--btntext-angle, 90deg), var(--btntext), var(--btntext2));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	:global(.nm) {
		color: var(--name);
	}

	:global(.nm.grad) {
		background: linear-gradient(var(--name-angle, 90deg), var(--name), var(--name2));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	:global(.nm.fx-glow) {
		filter: drop-shadow(0 0 0.1em color-mix(in srgb, var(--fx) 80%, transparent)) drop-shadow(0 0 0.24em color-mix(in srgb, var(--fx2) 55%, transparent));
	}

	:global(.nm.fx-shimmer) {
		background: linear-gradient(100deg, var(--name) 38%, var(--fx) 47%, var(--fx2) 53%, var(--name) 62%) 0 0 / 250% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation: fx-shimmer 4s linear infinite;
	}

	:global(.nm.fx-shimmer.grad) {
		background:
			linear-gradient(100deg, transparent 38%, var(--fx) 47%, var(--fx2) 53%, transparent 62%) 0 0 / 250% 100%,
			linear-gradient(var(--name-angle, 90deg), var(--name), var(--name2));
		-webkit-background-clip: text;
		background-clip: text;
		animation: fx-shimmer2 4s linear infinite;
	}

	@keyframes -global-fx-shimmer {
		from {
			background-position: 100% 0;
		}
		to {
			background-position: -150% 0;
		}
	}

	@keyframes -global-fx-shimmer2 {
		from {
			background-position:
				100% 0,
				0 0;
		}
		to {
			background-position:
				-150% 0,
				0 0;
		}
	}

	:global(.nm.fx-type) {
		animation: fx-type 1.6s steps(18) both;
	}

	@keyframes -global-fx-type {
		from {
			clip-path: inset(0 100% 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}

	:global(.nm.fx-outline) {
		color: transparent;
		-webkit-text-stroke: max(1px, 0.022em) var(--name);
	}

	:global(.nm.fx-outline.grad) {
		-webkit-text-stroke: max(1px, 0.022em) var(--name);
		background: none;
	}

	:global(html.fx-reveal main figure) {
		animation: fx-reveal linear both;
		animation-timeline: view();
		animation-range: entry 0% entry 45%;
	}

	@keyframes -global-fx-reveal {
		from {
			opacity: 0;
			transform: translateY(28px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	:global(html.fx-lift main figure img) {
		transition: transform 0.25s ease;
	}

	:global(html.fx-lift main figure:hover img) {
		transform: translateY(-4px) scale(1.02);
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.nm[class*='fx-']),
		:global(.nm[class*='fx-']::before),
		:global(.nm[class*='fx-']::after),
		:global(html.fx-reveal main figure) {
			animation: none !important;
		}
	}

	:global(html.edit-swap [data-swap]) {
		cursor: grab;
		user-select: none;
		-webkit-touch-callout: none;
	}

	:global(html.edit-crop main img) {
		cursor: move;
		touch-action: none;
		user-select: none;
		-webkit-user-drag: none;
		-webkit-touch-callout: none;
	}

	:global(.swap-drag) {
		animation: none !important;
		position: relative;
		z-index: 30;
		opacity: 0.85;
		cursor: grabbing !important;
	}

	:global(.swap-target) {
		outline: 2px dashed var(--ink);
		outline-offset: 4px;
	}

	:global(main img) {
		border-radius: calc(var(--radius) * 0.6);
	}

	:global(html.bw main img) {
		filter: grayscale(1) !important;
	}

	.grain {
		position: fixed;
		inset: 0;
		z-index: 15;
		pointer-events: none;
		will-change: transform;
		transform: translateZ(0);
	}

	.tint {
		background: linear-gradient(var(--tint-angle, 135deg), var(--tint), var(--tint2));
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		will-change: transform;
		transform: translateZ(0);
	}

	.bgimg {
		position: fixed;
		inset: -40px;
		background-size: cover;
		background-position: center;
		z-index: -1;
		pointer-events: none;
		will-change: transform;
		transform: translateZ(0);
	}

</style>
