<script lang="ts">
	import { site } from '#lib/data.ts';
</script>

<svelte:head>
	<title>{site.name}</title>
</svelte:head>

<main>
	<h1>{site.name}</h1>

	<enhanced:img src={site.avatar} alt={site.name} sizes="300px" />

	<ul>
		{#each site.tags as tag}
			<li>{tag}</li>
		{/each}
	</ul>

	<nav>
		<a href="/commissions">commissions</a>
		<a href="/gallery">gallery</a>
	</nav>

	<p>business e-mail: <a href="mailto:{site.email}">{site.email}</a></p>

	<nav>
		{#each site.socials as s}
			<a href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}>
				<svg viewBox="0 0 24 24" width="24" height="24"><path d={s.icon.path} /></svg>
			</a>
		{/each}
	</nav>
</main>
