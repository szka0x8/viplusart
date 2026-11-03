<script lang="ts">
	import { site, art, commissions as c } from '#lib/data.ts';
</script>

<svelte:head>
	<title>commissions · {site.name}</title>
</svelte:head>

<a href="/">← back</a>
<h1>commissions</h1>
<p>status: {c.open ? 'open' : 'closed'}</p>

<section>
	{#each c.tiers as t}
		<div>
			{#if art[t.img]}
				<enhanced:img src={art[t.img]} alt={t.name} sizes="300px" loading="lazy" />
			{/if}
			<h2>{t.name}</h2>
			<p>{t.desc}</p>
			<p>{c.currency}{t.price}</p>
		</div>
	{/each}
</section>

<section>
	<h2>extras</h2>
	<ul>
		{#each c.extras as e}
			<li>{e.name}: {typeof e.price === 'number' ? `+${c.currency}${e.price}` : e.price}</li>
		{/each}
	</ul>
</section>

<section>
	<h2>will draw</h2>
	<ul>
		{#each c.will as w}<li>{w}</li>{/each}
	</ul>
	<h2>won't draw</h2>
	<ul>
		{#each c.wont as w}<li>{w}</li>{/each}
	</ul>
</section>

<section>
	<h2>terms</h2>
	<ol>
		{#each c.terms as t}<li>{t}</li>{/each}
	</ol>
</section>

<section>
	<h2>how to order</h2>
	<p>{c.howTo}</p>
	<a href="mailto:{site.email}">{site.email}</a>
</section>
