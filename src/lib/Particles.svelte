<script lang="ts">
	import { onMount } from 'svelte';

	let { kind, color, color2 }: { kind: 'dust' | 'stars' | 'petals'; color: string; color2: string } = $props();

	type P = { left: number; size: number; dur: number; delay: number; sway: number; rot: number; alt: boolean };
	let parts: P[] = $state([]);

	onMount(() => {
		const n = matchMedia('(max-width: 700px)').matches ? 14 : 30;
		parts = Array.from({ length: n }, () => ({
			left: Math.random() * 100,
			size: 0.6 + Math.random() * 1.2,
			dur: 12 + Math.random() * 16,
			delay: -Math.random() * 28,
			sway: (Math.random() - 0.5) * 80,
			rot: Math.random() * 360,
			alt: Math.random() < 0.5
		}));
	});
</script>

<div class="field {kind}" style:--c={color} style:--c2={color2} aria-hidden="true">
	{#each parts as p}
		<i
			class:alt={p.alt}
			style:left="{p.left}%"
			style:--s={p.size}
			style:--sway="{p.sway}px"
			style:--rot="{p.rot}deg"
			style:animation-duration="{p.dur}s"
			style:animation-delay="{p.delay}s"
		></i>
	{/each}
</div>

<style>
	.field {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}

	i {
		position: absolute;
		top: -5vh;
		display: block;
		will-change: transform;
		animation: fall linear infinite;
	}

	.dust i {
		width: calc(3px * var(--s));
		height: calc(3px * var(--s));
		border-radius: 50%;
		background: var(--c);
		opacity: 0.5;
	}

	.stars i {
		width: calc(9px * var(--s));
		height: calc(9px * var(--s));
		background: var(--c);
		clip-path: polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%);
		opacity: 0.7;
		animation-name: twinkle;
	}

	.petals i {
		width: calc(10px * var(--s));
		height: calc(7px * var(--s));
		border-radius: 80% 0 80% 0;
		background: var(--c);
		opacity: 0.6;
	}

	.field i.alt {
		background: var(--c2);
	}

	@keyframes fall {
		from {
			transform: translate(0, 0) rotate(var(--rot));
		}
		to {
			transform: translate(var(--sway), 112vh) rotate(calc(var(--rot) + 220deg));
		}
	}

	@keyframes twinkle {
		0% {
			transform: translate(0, 0) scale(0.6);
			opacity: 0.2;
		}
		50% {
			opacity: 0.9;
		}
		100% {
			transform: translate(var(--sway), 112vh) scale(1);
			opacity: 0.2;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.field {
			display: none;
		}
	}
</style>
