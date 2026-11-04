<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';

	let { back = 'bottom', children }: { back?: 'top' | 'bottom' | false; children: Snippet } = $props();
</script>

<main>
	<div class="card">
		{#if back === 'top'}
			<a class="back top" href={resolve('/')}>‹ back</a>
		{/if}
		{@render children()}
		{#if back === 'bottom'}
			<a class="back" href={resolve('/')}>‹ back</a>
		{/if}
	</div>
</main>

<style>
	main {
		min-height: 100dvh;
		display: flex;
		justify-content: var(--card-pos, center);
		align-items: flex-start;
		padding: clamp(24px, 6vh, 64px) var(--pad);
	}

	.card {
		width: min(760px, 100%);
		padding: clamp(22px, 4vw, 40px);
		background: color-mix(in srgb, var(--paper) var(--card-alpha, 82%), transparent);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		box-shadow: 0 24px 60px rgb(0 0 0 / 0.12);
	}

	.back {
		display: inline-block;
		margin-top: 28px;
		padding: 8px 20px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--ink) 10%, transparent);
		text-decoration: none;
	}

	.back.top {
		margin: 0 0 20px;
	}

	.back:hover {
		background: color-mix(in srgb, var(--ink) 18%, transparent);
	}

	.card :global(.pill) {
		display: inline-block;
		padding: 8px 20px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--ink) 10%, transparent);
		text-decoration: none;
		transition: background 0.2s;
	}

	.card :global(.pill:hover) {
		background: color-mix(in srgb, var(--ink) 18%, transparent);
	}

	.card :global(.sep) {
		border: none;
		border-top: 1px solid var(--line);
		margin: 24px 0;
	}

	.card :global(.dots) {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.card :global(.dots li) {
		position: relative;
		padding-left: 18px;
	}

	.card :global(.dots li::before) {
		content: '';
		position: absolute;
		left: 4px;
		top: 0.6em;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--mute);
	}

	@media (hover: hover) and (pointer: fine) {
		.card {
			backdrop-filter: blur(12px);
		}
	}
</style>
