<script lang="ts">
	import { site, art, commissions as c } from '#lib/data.ts';
	import { custom, defaults } from '#lib/custom.svelte.ts';
	import Pic from '#lib/Pic.svelte';

	let layout = $derived(custom.on ? custom.commLayout : defaults.commLayout);
	let shape = $derived(custom.on ? custom.commShape : defaults.commShape);
	let telegram = site.socials.find((s) => s.name === 'Telegram');
</script>

<svelte:head>
	<title>commissions · {site.name}</title>
</svelte:head>

<main>
	<div class="head">
		<h1>commissions</h1>
		<span class:closed={!c.open}>{c.open ? 'open' : 'closed'}</span>
	</div>

	{#if layout === 'pictures'}
		<div class="tiers">
			{#each c.tiers as t, i}
				<div class="tier {shape}">
					<Pic
						pic={art[t.img]}
						url={custom.on ? custom.tierPics[i] : null}
						alt={t.name}
						sizes="(max-width: 700px) 100vw, 33vw"
					/>
					<div class="row">
						<h2>{t.name}</h2>
						<span>{c.currency}{t.price}</span>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<ul class="list">
			{#each c.tiers as t}
				<li>
					<span>{t.name}</span>
					<i></i>
					<span>{c.currency}{t.price}</span>
				</li>
			{/each}
		</ul>
	{/if}

	<p class="order">
		{c.note}:
		{#if telegram}<a href={telegram.url} target="_blank" rel="noreferrer">telegram</a> or{/if}
		<a href="mailto:{site.email}">{site.email}</a>
	</p>
</main>

<style>
	main {
		padding: 0 var(--pad) 64px;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 16px;
		margin: 28px 0 24px;
	}

	h1 {
		font-size: clamp(40px, 9vw, 120px);
		line-height: 0.9;
	}

	.head span {
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.head span.closed {
		text-decoration: line-through;
		color: var(--mute);
	}

	.tiers {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		border-top: 1px solid var(--ink);
		padding-top: 16px;
		align-items: start;
	}

	.tier :global(img) {
		width: 100%;
		object-fit: cover;
	}

	.tier.portrait :global(img) {
		aspect-ratio: 4 / 5;
	}

	.tier.square :global(img) {
		aspect-ratio: 1;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
		margin-top: 10px;
	}

	h2,
	.row span {
		font-size: 22px;
		font-weight: 800;
	}

	.list {
		list-style: none;
		padding: 0;
		border-top: 1px solid var(--ink);
		max-width: 640px;
	}

	.list li {
		display: flex;
		align-items: baseline;
		gap: 12px;
		padding: 14px 0;
		border-bottom: 1px solid var(--line);
		font-size: 22px;
		font-weight: 700;
	}

	.list i {
		flex: 1;
		border-bottom: 1px dotted var(--mute);
	}

	.order {
		margin-top: 40px;
		font-size: 17px;
	}

	.order a {
		font-weight: 700;
	}

	@media (max-width: 700px) {
		.tiers {
			grid-template-columns: 1fr;
		}
	}
</style>
