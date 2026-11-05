<script lang="ts">
	import { site, art, commissions as c } from './data.ts';
	import { custom, view, editing, swapTiers } from './custom.svelte.ts';
	import { swappable } from './swap.ts';
	import Card from './Card.svelte';
	import Pic from './Pic.svelte';

	let telegram = site.socials.find((s) => s.name === 'Telegram');
</script>

<Card back="bottom">
	<p class="status">commission status: <b>{c.open ? 'open' : 'closed'}</b></p>

	{#if view.o.commJump}
	<nav class="jump">
		{#each view.sections as s, i}
			<a class="pill" href="#sec-{i}"><span>{s.title} ›</span></a>
		{/each}
	</nav>
	{/if}

	<hr class="sep" />

	<p class="t-terms">by commissioning me, you agree to these terms:</p>
	<ul class="dots terms">
		{#each view.terms as t}
			<li>{t}</li>
		{/each}
	</ul>

	<p class="t-terms payment">{view.payment}</p>

	<hr class="sep" />

	<div class="cols">
		<div>
			<h3>i do</h3>
			<ul class="dots">
				{#each view.will as w}<li>{w}</li>{/each}
			</ul>
		</div>
		<div>
			<h3>i don't</h3>
			<ul class="dots">
				{#each view.wont as w}<li>{w}</li>{/each}
			</ul>
		</div>
	</div>

	{#each view.sections as s, si}
		<hr class="sep" />
		<section id="sec-{si}">
			<h2>{s.title}</h2>
			<div class="tiers {view.o.commShape}" style:--cc={view.o.commCols}>
				{#each s.tiers as t (t.i)}
					<figure use:swappable={{ i: t.i, enabled: editing.swap, onswap: swapTiers }}>
						<Pic
							pic={art[t.img]}
							url={custom.on ? custom.tierPics[t.i] : null}
							focus="t:{t.i}"
							alt={t.name}
							sizes="(max-width: 700px) 90vw, 340px"
						/>
						<figcaption>
							<span>{t.name}</span>
							<b>{c.currency}{t.price}</b>
						</figcaption>
					</figure>
				{/each}
			</div>
		</section>
	{/each}

	<hr class="sep" />

	<p class="t-info">
		{view.note}:<br />
		{#if telegram}<a href={telegram.url} target="_blank" rel="noreferrer">telegram</a> or{/if}
		<a href="mailto:{site.email}">{site.email}</a>
	</p>
</Card>

<style>
	.status {
		text-align: var(--a-info, center);
		font-size: 18px;
		margin-bottom: 14px;
	}

	.jump {
		display: flex;
		justify-content: var(--af-buttons, center);
		flex-wrap: wrap;
		gap: 10px;
	}

	.t-terms {
		text-align: var(--a-terms, center);
	}

	.t-info {
		text-align: var(--a-info, center);
	}

	.terms {
		margin: 14px var(--mr-terms, auto) 0 var(--ml-terms, auto);
		max-width: 460px;
	}

	.payment {
		margin-top: 16px;
		color: var(--mute);
	}

	.cols {
		display: flex;
		flex-wrap: wrap;
		justify-content: var(--af-lists, center);
		gap: 20px clamp(40px, 10vw, 96px);
	}

	h3 {
		font-size: 15px;
		font-weight: 700;
		margin-bottom: 8px;
	}

	section {
		scroll-margin-top: 24px;
	}

	h2 {
		text-align: var(--a-title, center);
		font-size: 22px;
		font-weight: 700;
		margin-bottom: 16px;
	}

	.tiers {
		display: grid;
		grid-template-columns: repeat(var(--cc, 2), 1fr);
		gap: 14px;
		align-items: start;
	}

	figure {
		margin: 0;
	}

	figure :global(img) {
		width: 100%;
		object-fit: cover;
		border-radius: calc(var(--radius) * 0.7);
	}

	.portrait :global(img) {
		aspect-ratio: 4 / 5;
	}

	.square :global(img) {
		aspect-ratio: 1;
	}

	figcaption {
		display: flex;
		justify-content: space-between;
		padding: 8px 4px 0;
	}

	@media (max-width: 560px) {
		.tiers {
			grid-template-columns: repeat(min(var(--cc, 2), 2), 1fr);
		}
	}
</style>
