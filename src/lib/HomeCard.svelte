<script lang="ts">
	import { site, commissions } from './data.ts';
	import { custom, view } from './custom.svelte.ts';
	import Pic from './Pic.svelte';
	import { resolve } from '$app/paths';
</script>

<main>
	<div class="card">
		<h1>{view.name}</h1>

		<div class="body" class:flip={view.o.avatarSide === 'right'}>
			<div class="avatar {view.o.avatarShape}">
				<Pic
					pic={site.avatar}
					url={custom.on ? custom.avatarUrl : null}
				focus="avatar"
					alt={view.name}
					sizes="(max-width: 700px) 90vw, 340px"
					loading="eager"
					fetchpriority="high"
				/>
			</div>

			<div class="info">
				{#if view.o.showTags}
					<ul class="tags">
						{#each view.tags as tag}
							<li>{tag}</li>
						{/each}
					</ul>
				{/if}

				<a class="btn" href={resolve('/commissions')}>commissions</a>
				<a class="btn" href={resolve('/gallery')}>gallery</a>

				{#if view.o.showStatus}
					<p class="status">commissions are <b>{commissions.open ? 'open' : 'closed'}</b></p>
				{/if}

				<div class="mail">
					<span>business e-mail</span>
					<a href="mailto:{site.email}">{site.email}</a>
				</div>
			</div>
		</div>

		<nav class="socials">
			{#each site.socials as s}
				<a href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name}>
					<svg viewBox="0 0 24 24"><path d={s.icon.path} /></svg>
				</a>
			{/each}
		</nav>
	</div>
</main>

<style>
	main {
		min-height: 100dvh;
		display: grid;
		align-items: center;
		justify-items: var(--card-pos, center);
		padding: 32px var(--pad);
	}

	.card {
		width: min(800px, 100%);
		padding: clamp(24px, 4vw, 40px);
		background: color-mix(in srgb, var(--paper) 82%, transparent);
		backdrop-filter: blur(12px);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		box-shadow: 0 24px 60px rgb(0 0 0 / 0.12);
	}

	h1 {
		text-align: var(--a-title, center);
		font-size: calc(clamp(36px, 6vw, 72px) * var(--title-scale, 1));
		line-height: 1;
		margin-bottom: 28px;
		word-break: break-word;
	}

	.body {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(20px, 3vw, 36px);
		align-items: center;
	}

	.body.flip .avatar {
		order: 2;
	}

	.avatar :global(img) {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: calc(var(--radius) * 0.8);
	}

	.avatar.round :global(img) {
		border-radius: 50%;
	}

	.avatar.arch :global(img) {
		border-radius: 50% 50% calc(var(--radius) * 0.8) calc(var(--radius) * 0.8) / 40% 40% calc(var(--radius) * 0.8)
			calc(var(--radius) * 0.8);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.tags {
		list-style: none;
		padding: 0;
		font-size: 18px;
		text-align: var(--a-info, center);
		color: var(--ink);
	}

	.btn {
		display: block;
		text-align: var(--a-buttons, center);
		padding: 10px 16px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--ink) 10%, transparent);
		text-decoration: none;
		font-size: 17px;
		transition: background 0.2s;
	}

	.btn:hover {
		background: color-mix(in srgb, var(--ink) 18%, transparent);
	}

	.status {
		text-align: var(--a-info, center);
		color: var(--mute);
	}

	.mail {
		display: flex;
		flex-direction: column;
		align-items: var(--af-info, center);
		gap: 2px;
		margin-top: 4px;
	}

	.mail span {
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--mute);
	}

	.socials {
		display: flex;
		justify-content: var(--af-socials, center);
		flex-wrap: wrap;
		gap: 22px;
		margin-top: 28px;
	}

	.socials svg {
		width: 24px;
		height: 24px;
		fill: var(--mute);
		transition: fill 0.2s;
	}

	.socials a:hover svg {
		fill: var(--ink);
	}

	@media (max-width: 640px) {
		.body {
			grid-template-columns: 1fr;
		}
	}
</style>
