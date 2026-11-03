<script lang="ts">
	import '@fontsource-variable/archivo/wdth.css';
	import favicon from '#lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { site } from '#lib/data.ts';
	import { custom, load, view } from '#lib/custom.svelte.ts';
	import TryPanel from '#lib/TryPanel.svelte';
	import { fontById, bodyFontById } from '#lib/fonts.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(load);

	$effect(() => {
		const root = document.documentElement.style;
		for (const k of ['paper', 'ink', 'mute', 'line', 'rule'] as const) {
			if (custom.on) root.setProperty(`--${k}`, custom[k]);
			else root.removeProperty(`--${k}`);
		}
	});

	$effect(() => {
		const root = document.documentElement.style;
		const f = fontById(custom.font);
		if (custom.on && f.load) {
			f.load();
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
		if (custom.on && b.load) {
			b.load();
			html.style.setProperty('--body', b.family);
		} else html.style.removeProperty('--body');
		if (custom.on && custom.titleScale !== 1) html.style.setProperty('--title-scale', String(custom.titleScale));
		else html.style.removeProperty('--title-scale');
		html.classList.toggle('bw', custom.on && custom.bw);
	});

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<a class="home" href={resolve('/')}>{view.name}</a>
	<nav>
		<a href={resolve('/gallery')} class:on={page.route.id === '/gallery'}>work</a>
		<a href={resolve('/commissions')} class:on={page.route.id === '/commissions'}>commissions</a>
		<a href="mailto:{site.email}">contact</a>
	</nav>
</header>

{#if custom.on && custom.bg}
	<div
		class="bgimg"
		style:background-image={`url(${custom.bg})`}
		style:opacity={custom.bgOpacity}
		style:filter={`blur(${custom.bgBlur}px)`}
	></div>
{/if}

{@render children()}

{#if custom.on && custom.grain > 0}
	<div class="grain" style:opacity={custom.grain}></div>
{/if}

{#if custom.panel}
	<TryPanel />
{/if}

<footer>
	<span>© {new Date().getFullYear()} {view.name.toLowerCase()}</span>
	<span>all art is mine, don't repost or use for ai</span>
</footer>

<style>
	:global(:root) {
		--paper: #eeebe4;
		--ink: #151515;
		--mute: #77736b;
		--line: #d3cec4;
		--rule: var(--ink);
		--pad: clamp(16px, 4vw, 48px);
	}


	:global(*) {
		box-sizing: border-box;
		margin: 0;
	}

	:global(body) {
		background: var(--paper);
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
		font-family: var(--display, inherit);
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

	:global(html.bw main img) {
		filter: grayscale(1) !important;
	}

	.grain {
		position: fixed;
		inset: 0;
		z-index: 15;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		mix-blend-mode: multiply;
	}

	.bgimg {
		position: fixed;
		inset: -40px;
		background-size: cover;
		background-position: center;
		z-index: -1;
		pointer-events: none;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 18px var(--pad);
		border-bottom: 1px solid var(--rule);
	}

	.home {
		font-weight: 800;
		text-decoration: none;
		letter-spacing: 0.02em;
	}

	nav {
		display: flex;
		gap: 22px;
		margin-left: auto;
	}

	nav a {
		text-decoration: none;
	}

	nav a:hover,
	nav a.on {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	footer {
		margin-top: auto;
		display: flex;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
		padding: 18px var(--pad);
		border-top: 1px solid var(--line);
		color: var(--mute);
		font-size: 13px;
	}

	@media (max-width: 520px) {
		nav {
			gap: 14px;
		}
	}
</style>
