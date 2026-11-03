<script lang="ts">
	import { onMount } from 'svelte';
	import {
		custom,
		save,
		reset,
		design,
		slots,
		loadSlots,
		saveSlot,
		loadSlot,
		shareLink
	} from './custom.svelte.ts';
	import { fonts, fontById, bodyFonts, bodyFontById } from './fonts.ts';
	import ColorPick from './ColorPick.svelte';
	import { site, commissions } from './data.ts';
	import { resolve } from '$app/paths';

	onMount(() => {
		for (const f of [...fonts, ...bodyFonts]) f.load?.();
		loadSlots();
	});

	const t = {
		ru: {
			title: 'настройки',
			note: 'это видишь только ты',
			tabs: { look: 'вид', text: 'текст', pics: 'картинки', pages: 'страницы', save: 'сохранить' },
			start: 'начать с',
			font: 'шрифт названия',
			bodyFont: 'шрифт текста',
			size: 'размер названия',
			colors: 'цвета',
			bg: 'фон',
			text: 'текст',
			small: 'мелкий текст',
			lines: 'линии',
			effects: 'эффекты',
			bw: 'чёрно-белые картинки',
			grain: 'зерно',
			name: 'название',
			tags: 'о тебе (через запятую)',
			tiers: 'цены',
			price: 'цена',
			order: 'как заказать',
			avatar: 'аватар',
			shape: 'форма аватара',
			square: 'квадрат',
			round: 'круг',
			arch: 'арка',
			workPics: 'работы',
			pieces: 'шт.',
			comm: 'комиссии',
			bgPic: 'картинка на фон',
			visible: 'видимость',
			blur: 'размытие',
			choose: 'выбрать',
			clear: 'убрать',
			picsNote: 'картинки только для просмотра и пропадут после перезагрузки. отправь мне их файлами',
			home: 'главная',
			showTags: 'о тебе',
			showStatus: 'статус комиссий',
			showRecent: 'последние работы',
			work: 'работы',
			masonry: 'мозаика',
			grid: 'сетка',
			big: 'крупно',
			cols: 'кол.',
			tight: 'плотно',
			normal: 'обычно',
			wide: 'широко',
			titles: 'подписи',
			pictures: 'с картинками',
			list: 'списком',
			portrait: 'высокие',
			asis: 'как есть',
			yes: 'да',
			no: 'нет',
			versions: 'версии',
			saveHere: 'сохранить в',
			empty: 'пусто',
			saved: 'сохранено',
			shareNote: 'отправь мне ссылку, и я увижу всё как у тебя (кроме картинок)',
			link: 'копировать ссылку',
			json: 'копировать текстом',
			copied: 'скопировано',
			original: 'оригинал',
			mine: 'моё',
			reset: 'сброс',
			close: 'закрыть'
		},
		en: {
			title: 'settings',
			note: 'only you see this',
			tabs: { look: 'look', text: 'text', pics: 'pictures', pages: 'pages', save: 'save' },
			start: 'start from',
			font: 'title font',
			bodyFont: 'text font',
			size: 'title size',
			colors: 'colors',
			bg: 'background',
			text: 'text',
			small: 'small text',
			lines: 'lines',
			effects: 'effects',
			bw: 'black & white pictures',
			grain: 'grain',
			name: 'name',
			tags: 'about you (split with commas)',
			tiers: 'prices',
			price: 'price',
			order: 'how to order',
			avatar: 'avatar',
			shape: 'avatar shape',
			square: 'square',
			round: 'round',
			arch: 'arch',
			workPics: 'work',
			pieces: 'pcs',
			comm: 'commissions',
			bgPic: 'background picture',
			visible: 'visible',
			blur: 'blur',
			choose: 'choose',
			clear: 'clear',
			picsNote: 'pictures are preview only and gone after reload. send them to me as files',
			home: 'home',
			showTags: 'about you',
			showStatus: 'commission status',
			showRecent: 'recent work',
			work: 'work',
			masonry: 'mosaic',
			grid: 'grid',
			big: 'large',
			cols: 'col.',
			tight: 'tight',
			normal: 'normal',
			wide: 'wide',
			titles: 'titles',
			pictures: 'with pictures',
			list: 'as a list',
			portrait: 'tall',
			asis: 'as is',
			yes: 'on',
			no: 'off',
			versions: 'versions',
			saveHere: 'save to',
			empty: 'empty',
			saved: 'saved',
			shareNote: 'send me the link and i see exactly what you made (except pictures)',
			link: 'copy link',
			json: 'copy as text',
			copied: 'copied',
			original: 'original',
			mine: 'mine',
			reset: 'reset',
			close: 'close'
		}
	};

	const presets = [
		{ ru: 'бумага', en: 'paper', paper: '#eeebe4', ink: '#151515', mute: '#77736b', line: '#d3cec4' },
		{ ru: 'белый', en: 'white', paper: '#ffffff', ink: '#111111', mute: '#777777', line: '#e2e2e2' },
		{ ru: 'чёрный', en: 'black', paper: '#121212', ink: '#ecebe6', mute: '#8f8b84', line: '#2d2c2a' },
		{ ru: 'розовый', en: 'rose', paper: '#f3e4e4', ink: '#3a1f24', mute: '#8a6a6e', line: '#e0c8ca' },
		{ ru: 'зелёный', en: 'sage', paper: '#e3e8df', ink: '#1f2a1f', mute: '#6d7a6a', line: '#cad3c4' },
		{ ru: 'ночь', en: 'night', paper: '#151a24', ink: '#e6e9f0', mute: '#8a93a6', line: '#2a3142' }
	];

	const colors = ['paper', 'ink', 'mute', 'line'] as const;
	const colorNames = { paper: 'bg', ink: 'text', mute: 'small', line: 'lines' } as const;
	const tabs = ['look', 'text', 'pics', 'pages', 'save'] as const;

	let l = $derived(t[custom.lang]);
	let flash = $state('');

	function changed() {
		custom.on = true;
		save();
	}

	function setc<K extends keyof typeof custom>(k: K, v: (typeof custom)[K]) {
		custom[k] = v;
		changed();
	}

	function set<K extends keyof typeof custom>(k: K, v: (typeof custom)[K]) {
		custom[k] = v;
		save();
	}

	function apply(p: (typeof presets)[number]) {
		const { ru, en, ...c } = p;
		Object.assign(custom, c);
		changed();
	}

	function setTier(i: number, k: 'name' | 'price', v: string) {
		custom.text.tiers[i] ??= { name: '', price: '' };
		custom.text.tiers[i][k] = v;
		changed();
	}

	function files(e: Event) {
		return [...((e.currentTarget as HTMLInputElement).files ?? [])];
	}

	function one(e: Event, prev: string | null) {
		const [f] = files(e);
		if (!f) return null;
		if (prev) URL.revokeObjectURL(prev);
		return f;
	}

	function pickBg(e: Event) {
		const f = one(e, custom.bg);
		if (!f) return;
		custom.bg = URL.createObjectURL(f);
		custom.bgName = f.name;
		changed();
	}

	function pickAvatar(e: Event) {
		const f = one(e, custom.avatarUrl);
		if (!f) return;
		custom.avatarUrl = URL.createObjectURL(f);
		changed();
	}

	function pickWork(e: Event) {
		const list = files(e);
		if (!list.length) return;
		for (const p of custom.workPics) URL.revokeObjectURL(p.url);
		custom.workPics = list.map((f) => ({
			url: URL.createObjectURL(f),
			title: f.name.replace(/\.\w+$/, '').replace(/[-_]/g, ' ')
		}));
		changed();
	}

	function pickTier(e: Event, i: number) {
		const f = one(e, custom.tierPics[i] ?? null);
		if (!f) return;
		custom.tierPics[i] = URL.createObjectURL(f);
		changed();
	}

	async function copy(what: 'link' | 'json') {
		const d = design();
		const out =
			what === 'link'
				? shareLink()
				: JSON.stringify(
						{
							...d,
							font: fontById(d.font).name,
							bodyFont: bodyFontById(d.bodyFont).name,
							images: {
								background: custom.bgName || null,
								avatar: !!custom.avatarUrl,
								work: custom.workPics.map((p) => p.title),
								commissions: custom.tierPics.map((p) => !!p)
							}
						},
						null,
						2
					);
		await navigator.clipboard.writeText(out);
		flash = what;
		setTimeout(() => (flash = ''), 1500);
	}

	function storeSlot(k: 'A' | 'B' | 'C') {
		saveSlot(k);
		flash = k;
		setTimeout(() => (flash = ''), 1200);
	}
</script>

{#snippet seg<T>(values: readonly T[], current: T, pickv: (v: T) => void, label: (v: T) => string)}
	<div class="seg">
		{#each values as v}
			<button class:on={current === v} onclick={() => pickv(v)}>{label(v)}</button>
		{/each}
	</div>
{/snippet}

{#snippet toggle(label: string, value: boolean, flip: (v: boolean) => void)}
	<div class="row">
		<span>{label}</span>
		<span class="yn">
			<button class:on={value} onclick={() => flip(true)}>{l.yes}</button>
			<button class:on={!value} onclick={() => flip(false)}>{l.no}</button>
		</span>
	</div>
{/snippet}

{#snippet file(label: string, has: string, onpick: (e: Event) => void, onclear: (() => void) | null, multiple = false)}
	<div class="row">
		<span>{label}</span>
		<span class="pair">
			{#if onclear}<button class="link" onclick={onclear}>{l.clear}</button>{/if}
			<span class="file">{has || l.choose}<input type="file" accept="image/*" {multiple} onchange={onpick} /></span>
		</span>
	</div>
{/snippet}

<aside class:closed={!custom.open}>
	<div class="bar">
		<button class="title" onclick={() => set('open', !custom.open)}>
			{custom.open ? '▾' : '▸'} {l.title}
		</button>
		<span class="lang">
			<button class:on={custom.lang === 'ru'} onclick={() => set('lang', 'ru')}>ru</button>
			/
			<button class:on={custom.lang === 'en'} onclick={() => set('lang', 'en')}>en</button>
		</span>
	</div>

	{#if custom.open}
		<p class="note">{l.note}</p>

		<nav class="tabs">
			{#each tabs as tb}
				<button class:on={custom.tab === tb} onclick={() => set('tab', tb)}>{l.tabs[tb]}</button>
			{/each}
		</nav>

		<div class="body">
			{#if custom.tab === 'look'}
				<span class="label">{l.start}</span>
				<div class="swatches">
					{#each presets as p}
						<button title={p[custom.lang]} style:background={p.paper} style:color={p.ink} onclick={() => apply(p)}>Aa</button>
					{/each}
				</div>

				<span class="label">{l.colors}</span>
				{#each colors as c}
					<div class="row">
						<span>{l[colorNames[c]]}</span>
						<span class="pick">
							<input type="text" bind:value={custom[c]} oninput={changed} spellcheck="false" />
							<ColorPick bind:value={custom[c]} onchange={changed} />
						</span>
					</div>
				{/each}

				<span class="label">{l.font}</span>
				<div class="fonts">
					{#each fonts as f}
						<button
							class:on={custom.font === f.id}
							style:font-family={f.family}
							style:font-weight={f.weight}
							style:font-stretch={f.stretch}
							title={f.name}
							onclick={() => setc('font', f.id)}>{f.name}</button
						>
					{/each}
				</div>
				<label class="row">
					<span>{l.size}</span>
					<input type="range" min="0.4" max="1.8" step="0.05" bind:value={custom.titleScale} oninput={changed} />
				</label>

				<span class="label">{l.bodyFont}</span>
				<div class="fonts">
					{#each bodyFonts as f}
						<button
							class="plain"
							class:on={custom.bodyFont === f.id}
							style:font-family={f.family}
							onclick={() => setc('bodyFont', f.id)}>{f.name}</button
						>
					{/each}
				</div>

				<span class="label">{l.effects}</span>
				{@render toggle(l.bw, custom.bw, (v) => setc('bw', v))}
				<label class="row">
					<span>{l.grain}</span>
					<input type="range" min="0" max="0.5" step="0.02" bind:value={custom.grain} oninput={changed} />
				</label>
			{:else if custom.tab === 'text'}
				<label class="field">
					<span>{l.name}</span>
					<input type="text" bind:value={custom.text.name} oninput={changed} placeholder={site.name} />
				</label>
				<label class="field">
					<span>{l.tags}</span>
					<input type="text" bind:value={custom.text.tags} oninput={changed} placeholder={site.tags.join(', ')} />
				</label>

				<span class="label">{l.tiers}</span>
				{#each commissions.tiers as tr, i}
					<div class="tier">
						<input
							type="text"
							bind:value={() => custom.text.tiers[i]?.name ?? '', (v) => setTier(i, 'name', v)}
							placeholder={tr.name}
						/>
						<input
							class="price"
							type="text"
							bind:value={() => custom.text.tiers[i]?.price ?? '', (v) => setTier(i, 'price', v)}
							placeholder={String(tr.price)}
						/>
					</div>
				{/each}

				<label class="field">
					<span>{l.order}</span>
					<textarea rows="2" bind:value={custom.text.note} oninput={changed} placeholder={commissions.note}></textarea>
				</label>
			{:else if custom.tab === 'pics'}
				{@render file(l.avatar, custom.avatarUrl ? '✓' : '', pickAvatar, custom.avatarUrl ? () => (custom.avatarUrl = null) : null)}
				<span class="label">{l.shape}</span>
				{@render seg(['square', 'round', 'arch'] as const, custom.avatarShape, (v) => setc('avatarShape', v), (v) => l[v])}

				<span class="label">{l.workPics} / {l.comm}</span>
				{@render file(
					l.workPics,
					custom.workPics.length ? `${custom.workPics.length} ${l.pieces}` : '',
					pickWork,
					custom.workPics.length ? () => (custom.workPics = []) : null,
					true
				)}
				{#each commissions.tiers as _, i}
					{@render file(
						`${l.comm} ${i + 1}`,
						custom.tierPics[i] ? '✓' : '',
						(e) => pickTier(e, i),
						custom.tierPics[i] ? () => (custom.tierPics[i] = null) : null
					)}
				{/each}

				<span class="label">{l.bgPic}</span>
				{@render file(l.bgPic, custom.bgName, pickBg, custom.bg ? () => ((custom.bg = null), (custom.bgName = '')) : null)}
				{#if custom.bg}
					<label class="row">
						<span>{l.visible}</span>
						<input type="range" min="0.05" max="1" step="0.05" bind:value={custom.bgOpacity} oninput={changed} />
					</label>
					<label class="row">
						<span>{l.blur}</span>
						<input type="range" min="0" max="30" step="1" bind:value={custom.bgBlur} oninput={changed} />
					</label>
				{/if}
				<p class="note">{l.picsNote}</p>
			{:else if custom.tab === 'pages'}
				<span class="label">{l.home} <a class="link" href={resolve('/')}>→</a></span>
				{@render toggle(l.showTags, custom.showTags, (v) => setc('showTags', v))}
				{@render toggle(l.showStatus, custom.showStatus, (v) => setc('showStatus', v))}
				{@render toggle(l.showRecent, custom.showRecent, (v) => setc('showRecent', v))}

				<span class="label">{l.work} <a class="link" href={resolve('/gallery')}>→</a></span>
				{@render seg(['masonry', 'grid', 'big'] as const, custom.workLayout, (v) => setc('workLayout', v), (v) => l[v])}
				{#if custom.workLayout !== 'big'}
					{@render seg([2, 3, 4] as const, custom.workCols, (v) => setc('workCols', v), (v) => `${v} ${l.cols}`)}
				{/if}
				{@render seg(['tight', 'normal', 'wide'] as const, custom.workGap, (v) => setc('workGap', v), (v) => l[v])}
				{@render toggle(l.titles, custom.workTitles, (v) => setc('workTitles', v))}

				<span class="label">{l.comm} <a class="link" href={resolve('/commissions')}>→</a></span>
				{@render seg(['pictures', 'list'] as const, custom.commLayout, (v) => setc('commLayout', v), (v) => l[v])}
				{#if custom.commLayout === 'pictures'}
					{@render seg(
						['portrait', 'square', 'original'] as const,
						custom.commShape,
						(v) => setc('commShape', v),
						(v) => l[v === 'original' ? 'asis' : v]
					)}
				{/if}
			{:else if custom.tab === 'save'}
				<span class="label">{l.versions}</span>
				{#each ['A', 'B', 'C'] as const as k}
					<div class="row">
						<button class="slot" disabled={!slots[k]} onclick={() => loadSlot(k)}>
							<b>{k}</b>
							{#if slots[k]}
								<i style:background={slots[k]!.paper} style:border-color={slots[k]!.ink}></i>
							{:else}
								<span class="note">{l.empty}</span>
							{/if}
						</button>
						<button class="link" onclick={() => storeSlot(k)}>{flash === k ? l.saved : `${l.saveHere} ${k}`}</button>
					</div>
				{/each}

				<span class="label">{l.link}</span>
				<p class="note">{l.shareNote}</p>
				<div class="share">
					<button class="copy" onclick={() => copy('link')}>{flash === 'link' ? l.copied : l.link}</button>
					<button class="link" onclick={() => copy('json')}>{flash === 'json' ? l.copied : l.json}</button>
				</div>
			{/if}
		</div>

		<div class="actions">
			<button class="link" onclick={() => set('on', !custom.on)}>{custom.on ? l.original : l.mine}</button>
			<button class="link" onclick={reset}>{l.reset}</button>
			<button class="link" onclick={() => set('panel', false)}>{l.close}</button>
		</div>
	{/if}
</aside>

<style>
	aside {
		position: fixed;
		right: 16px;
		bottom: 16px;
		width: 300px;
		max-height: calc(100dvh - 32px);
		display: flex;
		flex-direction: column;
		z-index: 20;
		background: #fff;
		color: #111;
		border: 1px solid #111;
		font-family: 'Archivo Variable', system-ui, sans-serif;
		font-size: 13px;
		line-height: 1.35;
		padding: 10px 12px 12px;
	}

	aside.closed {
		width: auto;
	}

	button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: inherit;
		cursor: pointer;
	}

	button:disabled {
		cursor: default;
	}

	.bar {
		display: flex;
		justify-content: space-between;
		gap: 16px;
	}

	.title {
		font-weight: 700;
	}

	.lang {
		color: #999;
	}

	.lang button.on {
		color: #111;
		font-weight: 700;
	}

	.note {
		color: #888;
		font-size: 12px;
		margin: 2px 0 0;
	}

	.tabs {
		display: flex;
		justify-content: space-between;
		gap: 6px;
		margin-top: 10px;
		border-bottom: 1px solid #e5e5e5;
	}

	.tabs button {
		padding: 4px 0 6px;
		color: #888;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
	}

	.tabs button.on {
		color: #111;
		border-color: #111;
		font-weight: 700;
	}

	.body {
		overflow: auto;
		padding-top: 4px;
		min-height: 0;
	}

	.label {
		display: block;
		color: #888;
		margin: 12px 0 6px;
	}

	.label a {
		margin-left: 4px;
	}

	.swatches {
		display: flex;
		gap: 4px;
	}

	.swatches button {
		flex: 1;
		height: 28px;
		border: 1px solid #ccc;
		font-weight: 700;
		font-size: 12px;
	}

	.swatches button:hover {
		border-color: #111;
	}

	.fonts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4px;
	}

	.fonts button {
		border: 1px solid #ddd;
		padding: 6px 4px;
		font-size: 14px;
		line-height: 1.1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fonts button.plain {
		font-size: 13px;
	}

	.fonts button:hover,
	.seg button:hover {
		border-color: #888;
	}

	.fonts button.on,
	.seg button.on,
	.yn button.on {
		border-color: #111;
		background: #f2f2f2;
		font-weight: 700;
	}

	.seg {
		display: flex;
		gap: 4px;
		margin-bottom: 4px;
	}

	.seg button {
		flex: 1;
		border: 1px solid #ddd;
		padding: 5px 4px;
	}

	.yn {
		display: flex;
		gap: 4px;
	}

	.yn button {
		border: 1px solid #ddd;
		padding: 2px 10px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		padding: 3px 0;
	}

	.pick,
	.pair,
	.share {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.share {
		gap: 14px;
		margin-top: 8px;
	}

	input[type='text'],
	textarea {
		font: inherit;
		color: inherit;
		background: none;
		border: none;
		border-bottom: 1px solid #ddd;
		padding: 3px 0;
	}

	input[type='text']:focus,
	textarea:focus {
		outline: none;
		border-color: #111;
	}

	.pick input[type='text'] {
		width: 72px;
		font-family: ui-monospace, monospace;
		font-size: 12px;
		text-align: right;
	}

	.row > input[type='range'] {
		width: 140px;
		accent-color: #111;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-top: 10px;
		color: #888;
	}

	.field input,
	.field textarea {
		color: #111;
		width: 100%;
		resize: vertical;
	}

	.tier {
		display: flex;
		gap: 8px;
		margin-bottom: 4px;
	}

	.tier input {
		flex: 1;
		min-width: 0;
	}

	.tier .price {
		flex: 0 0 60px;
		text-align: right;
	}

	.file {
		position: relative;
		text-decoration: underline;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.file input {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: pointer;
	}

	.slot {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.slot i {
		width: 34px;
		height: 18px;
		border: 2px solid;
	}

	.link {
		text-decoration: underline;
		color: #555;
	}

	.copy {
		background: #111;
		color: #fff;
		padding: 5px 10px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 14px;
		flex-wrap: wrap;
		margin-top: 10px;
		padding-top: 8px;
		border-top: 1px solid #e5e5e5;
	}

	@media (max-width: 520px) {
		aside {
			left: 8px;
			right: 8px;
			bottom: 8px;
			width: auto;
			max-height: 60dvh;
		}
	}
</style>
