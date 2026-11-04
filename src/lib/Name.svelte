<script lang="ts">
	import { view } from './custom.svelte.ts';

	const spots = [
		{ x: -3, y: 15, d: 0, s: 1 },
		{ x: 16, y: -14, d: 0.7, s: 0.7 },
		{ x: 34, y: 104, d: 1.3, s: 0.8 },
		{ x: 55, y: -18, d: 0.35, s: 0.9 },
		{ x: 74, y: 100, d: 1.7, s: 0.6 },
		{ x: 92, y: -8, d: 1, s: 0.75 },
		{ x: 103, y: 55, d: 0.5, s: 1.05 }
	];
</script>

<span class="nm fx-{view.o.nameFx}" class:grad={view.o.nameGrad} data-text={view.name}
	>{view.name}{#if view.o.nameFx === 'sparkle'}<span class="sparks" aria-hidden="true"
			>{#each spots as p, i}<i
					class:alt={i % 2 === 1}
					style:left="{p.x}%"
					style:top="{p.y}%"
					style:--d="{p.d}s"
					style:--s={p.s}
				></i>{/each}</span
		>{/if}</span
>

<style>
	.nm {
		display: inline-block;
		position: relative;
	}

	.sparks i {
		position: absolute;
		width: calc(0.3em * var(--s));
		height: calc(0.3em * var(--s));
		background: var(--fx);
		clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
		transform: translate(-50%, -50%) scale(0);
		animation: spark 2.6s ease-in-out infinite both;
		animation-delay: var(--d);
		pointer-events: none;
	}

	.sparks i.alt {
		background: var(--fx2);
	}

	@keyframes spark {
		0%,
		100% {
			transform: translate(-50%, -50%) scale(0) rotate(0);
			opacity: 0;
		}
		50% {
			transform: translate(-50%, -50%) scale(1) rotate(45deg);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sparks i {
			animation: none;
			transform: translate(-50%, -50%) scale(0.8);
			opacity: 0.8;
		}
	}
</style>
