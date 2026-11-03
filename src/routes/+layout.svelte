<script lang="ts">
	import { onMount } from 'svelte';
	import '@fontsource-variable/archivo/wdth.css';
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { site } from '#lib/data.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

		let theme = $state('light');

	onMount(() => {
		theme = document.documentElement.dataset.theme ?? 'light';
	});

	function toggle() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('theme', theme);
		} catch {}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	{#if page.url.pathname !== '/'}
		<a class="home" href="/">{site.name}</a>
	{/if}
	<nav>
		<a href="/gallery" class:on={page.url.pathname === '/gallery'}>work</a>
		<a href="/commissions" class:on={page.url.pathname === '/commissions'}>commissions</a>
		<a href="mailto:{site.email}">contact</a>
		<button onclick={toggle}>{theme === 'dark' ? 'light' : 'dark'}</button>
	</nav>
</header>

{@render children()}

<footer>
	<span>© {new Date().getFullYear()} {site.name.toLowerCase()}</span>
	<span>all art is mine, don't repost or use for ai</span>
</footer>

<style>
	:global(:root) {
		--paper: #eeebe4;
		--ink: #151515;
		--mute: #77736b;
		--line: #d3cec4;
		--pad: clamp(16px, 4vw, 48px);
	}

	:global(:root[data-theme='dark']) {
		--paper: #121212;
		--ink: #ecebe6;
		--mute: #8f8b84;
		--line: #2d2c2a;
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
	}

	:global(body) {
		background: var(--paper);
		color: var(--ink);
		font-family: 'Archivo Variable', system-ui, sans-serif;
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

	:global(html.js img) {
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	:global(html.js img.in) {
		opacity: 1;
	}

	:global(::selection) {
		background: var(--ink);
		color: var(--paper);
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 18px var(--pad);
		border-bottom: 1px solid var(--ink);
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

	nav a,
	nav button {
		text-decoration: none;
	}

	nav button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: inherit;
		cursor: pointer;
	}

	nav a:hover,
	nav button:hover,
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