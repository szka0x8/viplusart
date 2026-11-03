<script lang="ts">
	import { site, gallery, commissions } from '#lib/data.ts';
	import { custom, view } from '#lib/custom.svelte.ts';
	import Pic from '#lib/Pic.svelte';
	import { resolve } from '$app/paths';

	let items = $derived(custom.on && custom.workPics.length ? custom.workPics : gallery);
</script>

<svelte:head>
	<title>{view.name}</title>
</svelte:head>

<main>
	<h1>{view.name}</h1>

	<section class="intro">
		<div class="avatar {view.o.avatarShape}">
			<Pic
				pic={site.avatar}
				url={custom.on ? custom.avatarUrl : null}
				alt={view.name}
				sizes="(max-width: 700px) 100vw, 380px"
				loading="eager"
				fetchpriority="high"
			/>
		</div>

		<div class="about">
			{#if view.o.showTags}
				<p class="tags">{view.tags.join(' / ')}</p>
			{/if}

			{#if view.o.showStatus}
				<p class="status">
					commissions are <b>{commissions.open ? 'open' : 'closed'}</b>
					<a href={resolve('/commissions')}>see prices</a>
				</p>
			{/if}

			<ul class="links">
				{#each site.socials as s}
					<li>
						<a href={s.url} target="_blank" rel="noreferrer">
							<span>{s.name.toLowerCase()}</span><span>↗</span>
						</a>
					</li>
				{/each}
				<li>
					<a href="mailto:{site.email}"><span>{site.email}</span><span>✉</span></a>
				</li>
			</ul>
		</div>
	</section>

	{#if items.length && view.o.showRecent}
		<section class="recent">
			<div class="head">
				<h2>recent work</h2>
				<a href={resolve('/gallery')}>all work →</a>
			</div>
			<div class="strip">
				{#each items.slice(-4).reverse() as item}
					<a href={resolve('/gallery')} aria-label={item.title}>
						<Pic {...item} alt={item.title} sizes="(max-width: 700px) 50vw, 25vw" />
					</a>
				{/each}
			</div>
		</section>
	{/if}
</main>

<style>
	main {
		padding: 0 var(--pad) 64px;
	}

	h1 {
		font-size: calc(clamp(44px, 8vw, 120px) * var(--title-scale, 1));
		line-height: 0.85;
		margin: 28px 0 32px;
		word-break: break-word;
	}

	.intro {
		display: grid;
		grid-template-columns: minmax(0, 380px) minmax(0, 1fr);
		gap: clamp(24px, 4vw, 64px);
		align-items: start;
	}

	.avatar :global(img) {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}

	.avatar.round :global(img) {
		border-radius: 50%;
	}

	.avatar.arch :global(img) {
		border-radius: 50% 50% 0 0 / 40% 40% 0 0;
	}

	.about {
		display: flex;
		flex-direction: column;
		gap: 22px;
		max-width: 520px;
	}

	.tags {
		font-size: 22px;
		font-stretch: 85%;
		font-weight: 600;
	}

	.status a {
		margin-left: 8px;
		color: var(--mute);
	}

	.links {
		list-style: none;
		padding: 0;
		border-top: 1px solid var(--rule);
	}

	.links a {
		display: flex;
		justify-content: space-between;
		padding: 11px 0;
		border-bottom: 1px solid var(--line);
		text-decoration: none;
		font-size: 17px;
	}

	.links a:hover {
		padding-left: 8px;
		transition: padding 0.15s;
	}

	.recent {
		margin-top: 72px;
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 8px;
		margin-bottom: 14px;
	}

	h2 {
		font-size: 15px;
		font-weight: 700;
	}

	.strip {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
	}

	.strip a :global(img) {
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		filter: grayscale(0.2);
		transition: filter 0.2s;
	}

	.strip a:hover :global(img) {
		filter: none;
	}

	@media (max-width: 700px) {
		.intro {
			grid-template-columns: 1fr;
		}
		.strip {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
