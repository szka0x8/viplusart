<script lang="ts">
	let { value = $bindable(), onchange }: { value: string; onchange?: () => void } = $props();

	let open = $state(false);
	let root: HTMLElement;
	let h = $state(0);
	let s = $state(0);
	let l = $state(0);

	const quick = ['#ffffff', '#eeebe4', '#d3cec4', '#77736b', '#151515', '#000000', '#f3e4e4', '#3a1f24', '#e3e8df', '#151a24'];

	function toHsl(hex: string) {
		const m = /^#?([\da-f]{6})$/i.exec(hex.trim());
		if (!m) return null;
		const n = parseInt(m[1], 16);
		const r = ((n >> 16) & 255) / 255;
		const g = ((n >> 8) & 255) / 255;
		const b = (n & 255) / 255;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const d = max - min;
		let hh = 0;
		if (d) {
			if (max === r) hh = ((g - b) / d) % 6;
			else if (max === g) hh = (b - r) / d + 2;
			else hh = (r - g) / d + 4;
			hh = (hh * 60 + 360) % 360;
		}
		const ll = (max + min) / 2;
		const ss = d ? d / (1 - Math.abs(2 * ll - 1)) : 0;
		return [Math.round(hh), Math.round(ss * 100), Math.round(ll * 100)];
	}

	function toHex(hh: number, ss: number, ll: number) {
		const sv = ss / 100;
		const lv = ll / 100;
		const a = sv * Math.min(lv, 1 - lv);
		const f = (k: number) => {
			const c = (k + hh / 30) % 12;
			return Math.round(255 * (lv - a * Math.max(-1, Math.min(c - 3, 9 - c, 1))));
		};
		return '#' + [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, '0')).join('');
	}

	let last = '';

	$effect.pre(() => {
		if (value === last) return;
		const v = toHsl(value);
		if (v) [h, s, l] = v;
		last = value;
	});

	function slide(k: 'h' | 's' | 'l', e: Event) {
		const n = (e.currentTarget as HTMLInputElement).valueAsNumber;
		if (k === 'h') h = n;
		else if (k === 's') s = n;
		else l = n;
		last = toHex(h, s, l);
		value = last;
		onchange?.();
	}

	function pick(hex: string) {
		value = hex;
		onchange?.();
	}

	function outside(e: PointerEvent) {
		if (open && !root.contains(e.target as Node)) open = false;
	}
</script>

<svelte:window onpointerdown={outside} onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<span class="wrap" bind:this={root}>
	<button class="dot" style:background={value} onclick={() => (open = !open)} aria-label="color"></button>

	{#if open}
		<div class="pop">
			<input
				type="range"
				min="0"
				max="360"
				value={h}
				oninput={(e) => slide('h', e)}
				style:background="linear-gradient(to right, {[0, 60, 120, 180, 240, 300, 360]
					.map((x) => `hsl(${x} ${s}% ${l}%)`)
					.join(', ')})"
			/>
			<input
				type="range"
				min="0"
				max="100"
				value={s}
				oninput={(e) => slide('s', e)}
				style:background="linear-gradient(to right, hsl({h} 0% {l}%), hsl({h} 100% {l}%))"
			/>
			<input
				type="range"
				min="0"
				max="100"
				value={l}
				oninput={(e) => slide('l', e)}
				style:background="linear-gradient(to right, #000, hsl({h} {s}% 50%), #fff)"
			/>
			<div class="quick">
				{#each quick as q}
					<button style:background={q} class:on={q === value.toLowerCase()} onclick={() => pick(q)} aria-label={q}></button>
				{/each}
			</div>
		</div>
	{/if}
</span>

<style>
	.wrap {
		position: relative;
		display: inline-flex;
	}

	button {
		padding: 0;
		border: 1px solid #bbb;
		cursor: pointer;
	}

	.dot {
		width: 22px;
		height: 22px;
	}

	.dot:hover {
		border-color: #111;
	}

	.pop {
		position: absolute;
		right: 0;
		top: calc(100% + 6px);
		z-index: 5;
		width: 210px;
		padding: 10px;
		background: #fff;
		border: 1px solid #111;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	input[type='range'] {
		appearance: none;
		width: 100%;
		height: 12px;
		margin: 0;
		border: 1px solid #ccc;
		cursor: pointer;
	}

	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		width: 8px;
		height: 18px;
		background: #fff;
		border: 1px solid #111;
	}

	input[type='range']::-moz-range-thumb {
		width: 8px;
		height: 18px;
		background: #fff;
		border: 1px solid #111;
		border-radius: 0;
	}

	.quick {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 4px;
	}

	.quick button {
		height: 18px;
	}

	.quick button.on {
		outline: 2px solid #111;
		outline-offset: 1px;
	}
</style>
