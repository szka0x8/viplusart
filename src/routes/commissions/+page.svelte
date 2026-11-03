<script lang="ts">
	import { site, art, commissions as c } from '#lib/data.ts';
</script>

<svelte:head>
	<title>commissions · {site.name}</title>
</svelte:head>

<main>
	<div class="head">
		<h1>commissions</h1>
		<span class:closed={!c.open}>{c.open ? 'open' : 'closed'}</span>
	</div>

	<div class="tiers">
		{#each c.tiers as t}
			<div class="tier">
				{#if art[t.img]}
					<enhanced:img src={art[t.img]} alt={t.name} sizes="(max-width: 700px) 100vw, 33vw" loading="lazy" />
				{/if}
				<div class="row">
					<h2>{t.name}</h2>
					<span>{c.currency}{t.price}</span>
				</div>
				<p>{t.desc}</p>
			</div>
		{/each}
	</div>

	<dl>
		<dt>extras</dt>
		<dd>
			{#each c.extras as e}
				<div class="row">
					<span>{e.name}</span>
					<span>{typeof e.price === 'number' ? `+${c.currency}${e.price}` : e.price}</span>
				</div>
			{/each}
		</dd>

		<dt>will draw</dt>
		<dd>{c.will.join(', ')}</dd>

		<dt>won't draw</dt>
		<dd>{c.wont.join(', ')}</dd>

		<dt>terms</dt>
		<dd>
			<ol>
				{#each c.terms as t}<li>{t}</li>{/each}
			</ol>
		</dd>

		<dt>how to order</dt>
		<dd>
			<p>{c.howTo}</p>
			<a class="mail" href="mailto:{site.email}">{site.email}</a>
		</dd>
	</dl>
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
		font-weight: 900;
		font-stretch: 125%;
		line-height: 0.9;
		letter-spacing: -0.03em;
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
	}

	.tier :global(img) {
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
	}

	.tier .row {
		margin-top: 10px;
	}

	h2 {
		font-size: 22px;
		font-weight: 800;
		font-stretch: 110%;
	}

	.tier .row span {
		font-size: 22px;
		font-weight: 800;
	}

	.tier p {
		color: var(--mute);
	}

	dl {
		display: grid;
		grid-template-columns: 180px 1fr;
		margin-top: 64px;
		border-top: 1px solid var(--ink);
	}

	dt,
	dd {
		padding: 14px 0;
		border-bottom: 1px solid var(--line);
	}

	dt {
		font-weight: 700;
	}

	dd {
		font-size: 17px;
		max-width: 640px;
	}

	dd .row + .row {
		margin-top: 4px;
	}

	ol {
		padding-left: 20px;
	}

	.mail {
		display: inline-block;
		margin-top: 8px;
		font-weight: 700;
	}

	@media (max-width: 700px) {
		.tiers {
			grid-template-columns: 1fr;
		}
		dl {
			grid-template-columns: 1fr;
		}
		dt {
			border-bottom: none;
			padding-bottom: 0;
		}
	}
</style>