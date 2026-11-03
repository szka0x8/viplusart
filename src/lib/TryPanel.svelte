<script lang="ts">
	import { onMount } from 'svelte';
	import { custom, save, reset } from './custom.svelte.ts';
	import { fonts, fontById } from './fonts.ts';
	import { commissions } from './data.ts';

	onMount(() => {
		for (const f of fonts) f.load?.();
	});

	const t = {
		ru: {
			title: 'настройки',
			note: 'это видишь только ты',
			start: 'начать с',
			font: 'шрифт названия',
			comm: 'комиссии',
			pics: 'свои картинки',
			avatar: 'аватар',
			workPics: 'работы',
			pieces: 'шт.',
			clear: 'убрать',
			picsNote: 'только для просмотра, пропадут после перезагрузки',
			work: 'работы',
			masonry: 'мозаика',
			grid: 'сетка',
			big: 'крупно',
			cols: 'колонки',
			tight: 'плотно',
			normal: 'обычно',
			wide: 'широко',
			titles: 'подписи',
			yes: 'да',
			no: 'нет',
			pictures: 'с картинками',
			list: 'списком',
			portrait: 'высокие',
			square: 'квадрат',
			asis: 'как есть',
			bg: 'фон',
			text: 'текст',
			small: 'мелкий текст',
			lines: 'линии',
			pic: 'картинка',
			none: 'нет',
			choose: 'выбрать',
			visible: 'видимость',
			blur: 'размытие',
			remove: 'убрать',
			picNote: 'картинка пропадёт после перезагрузки, отправь мне её файлом',
			copy: 'скопировать',
			copied: 'скопировано',
			original: 'оригинал',
			mine: 'моё',
			reset: 'сброс',
			close: 'закрыть'
		},
		en: {
			title: 'settings',
			note: 'only you see this',
			start: 'start from',
			font: 'title font',
			comm: 'commissions',
			pics: 'your pictures',
			avatar: 'avatar',
			workPics: 'work',
			pieces: 'pcs',
			clear: 'clear',
			picsNote: 'preview only, gone after reload',
			work: 'work',
			masonry: 'mosaic',
			grid: 'grid',
			big: 'large',
			cols: 'columns',
			tight: 'tight',
			normal: 'normal',
			wide: 'wide',
			titles: 'titles',
			yes: 'on',
			no: 'off',
			pictures: 'with pictures',
			list: 'as a list',
			portrait: 'tall',
			square: 'square',
			asis: 'as is',
			bg: 'background',
			text: 'text',
			small: 'small text',
			lines: 'lines',
			pic: 'picture',
			none: 'none',
			choose: 'choose',
			visible: 'visible',
			blur: 'blur',
			remove: 'remove',
			picNote: 'picture is gone after reload, send it to me as a file',
			copy: 'copy',
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
	const names = { paper: 'bg', ink: 'text', mute: 'small', line: 'lines' } as const;

	let l = $derived(t[custom.lang]);
	let copied = $state(false);

	function changed() {
		custom.on = true;
		save();
	}

	function apply(p: (typeof presets)[number]) {
		const { ru, en, ...c } = p;
		Object.assign(custom, c);
		changed();
	}

	function pick(e: Event) {
		const file = (e.currentTarget as HTMLInputElement).files?.[0];
		if (!file) return;
		if (custom.bg) URL.revokeObjectURL(custom.bg);
		custom.bg = URL.createObjectURL(file);
		custom.bgName = file.name;
		changed();
	}

	function files(e: Event) {
		return [...((e.currentTarget as HTMLInputElement).files ?? [])];
	}

	function pickAvatar(e: Event) {
		const [f] = files(e);
		if (!f) return;
		if (custom.avatarUrl) URL.revokeObjectURL(custom.avatarUrl);
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
		const [f] = files(e);
		if (!f) return;
		const old = custom.tierPics[i];
		if (old) URL.revokeObjectURL(old);
		custom.tierPics[i] = URL.createObjectURL(f);
		changed();
	}

	function removeBg() {
		if (custom.bg) URL.revokeObjectURL(custom.bg);
		custom.bg = null;
		custom.bgName = '';
	}

	async function copy() {
		const out = {
			background: custom.paper,
			text: custom.ink,
			smallText: custom.mute,
			lines: custom.line,
			font: fontById(custom.font).name,
			work: {
				layout: custom.workLayout,
				columns: custom.workCols,
				spacing: custom.workGap,
				titles: custom.workTitles
			},
			commissions: custom.commLayout,
			pictureShape: custom.commShape,
			image: custom.bgName || null,
			imageOpacity: custom.bgOpacity,
			imageBlur: custom.bgBlur
		};
		await navigator.clipboard.writeText(JSON.stringify(out, null, 2));
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}

	function setc<K extends keyof typeof custom>(k: K, v: (typeof custom)[K]) {
		custom[k] = v;
		changed();
	}

	function set<K extends keyof typeof custom>(k: K, v: (typeof custom)[K]) {
		custom[k] = v;
		save();
	}
</script>

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

		<div class="block">
			<span class="label">{l.start}</span>
			<div class="swatches">
				{#each presets as p}
					<button
						title={p[custom.lang]}
						style:background={p.paper}
						style:color={p.ink}
						onclick={() => apply(p)}
					>
						Aa
					</button>
				{/each}
			</div>
		</div>

		<div class="block">
			<span class="label">{l.font}</span>
			<div class="fonts">
				{#each fonts as f}
					<button
						class:on={custom.font === f.id}
						style:font-family={f.family}
						style:font-weight={f.weight}
						style:font-stretch={f.stretch}
						title={f.name}
						onclick={() => {
							custom.font = f.id;
							changed();
						}}
					>
						{f.name}
					</button>
				{/each}
			</div>
		</div>

		<div class="block">
			{#each colors as c}
				<label class="row">
					<span>{l[names[c]]}</span>
					<span class="pick">
						<input type="text" bind:value={custom[c]} oninput={changed} spellcheck="false" />
						<input type="color" bind:value={custom[c]} oninput={changed} />
					</span>
				</label>
			{/each}
		</div>

		<div class="block">
			<span class="label">{l.work}</span>
			<div class="seg">
				{#each ['masonry', 'grid', 'big'] as const as v}
					<button class:on={custom.workLayout === v} onclick={() => setc('workLayout', v)}>{l[v]}</button>
				{/each}
			</div>
			{#if custom.workLayout !== 'big'}
				<div class="seg">
					{#each [2, 3, 4] as const as v}
						<button class:on={custom.workCols === v} onclick={() => setc('workCols', v)}>{v} {l.cols}</button>
					{/each}
				</div>
			{/if}
			<div class="seg">
				{#each ['tight', 'normal', 'wide'] as const as v}
					<button class:on={custom.workGap === v} onclick={() => setc('workGap', v)}>{l[v]}</button>
				{/each}
			</div>
			<div class="seg">
				<span class="segl">{l.titles}</span>
				<button class:on={custom.workTitles} onclick={() => setc('workTitles', true)}>{l.yes}</button>
				<button class:on={!custom.workTitles} onclick={() => setc('workTitles', false)}>{l.no}</button>
			</div>
			<a class="link go" href="/gallery">→ {l.work}</a>
		</div>

		<div class="block">
			<span class="label">{l.comm}</span>
			<div class="seg">
				{#each ['pictures', 'list'] as const as v}
					<button
						class:on={custom.commLayout === v}
						onclick={() => {
							custom.commLayout = v;
							changed();
						}}>{l[v]}</button
					>
				{/each}
			</div>
			{#if custom.commLayout === 'pictures'}
				<div class="seg">
					{#each ['portrait', 'square', 'original'] as const as v}
						<button
							class:on={custom.commShape === v}
							onclick={() => {
								custom.commShape = v;
								changed();
							}}>{l[v === 'original' ? 'asis' : v]}</button
						>
					{/each}
				</div>
			{/if}
			<a class="link go" href="/commissions">→ {l.comm}</a>
		</div>

		<div class="block">
			<span class="label">{l.pics}</span>
			<div class="row">
				<span>{l.avatar}</span>
				<span class="pair">
					{#if custom.avatarUrl}<button class="link" onclick={() => (custom.avatarUrl = null)}>{l.clear}</button>{/if}
					<span class="file">{custom.avatarUrl ? '✓' : l.choose}<input type="file" accept="image/*" onchange={pickAvatar} /></span>
				</span>
			</div>
			<div class="row">
				<span>{l.workPics}</span>
				<span class="pair">
					{#if custom.workPics.length}<button class="link" onclick={() => (custom.workPics = [])}>{l.clear}</button>{/if}
					<span class="file">
						{custom.workPics.length ? `${custom.workPics.length} ${l.pieces}` : l.choose}
						<input type="file" accept="image/*" multiple onchange={pickWork} />
					</span>
				</span>
			</div>
			{#each commissions.tiers as t, i}
				<div class="row">
					<span>{l.comm} {i + 1}</span>
					<span class="pair">
						{#if custom.tierPics[i]}<button class="link" onclick={() => (custom.tierPics[i] = null)}>{l.clear}</button>{/if}
						<span class="file">{custom.tierPics[i] ? '✓' : l.choose}<input type="file" accept="image/*" onchange={(e) => pickTier(e, i)} /></span>
					</span>
				</div>
			{/each}
			<p class="note">{l.picsNote}</p>
		</div>

		<div class="block">
			<div class="row">
				<span>{l.pic}</span>
				<span class="file">
					{custom.bgName || l.choose}
					<input type="file" accept="image/*" onchange={pick} />
				</span>
			</div>
			{#if custom.bg}
				<label class="row">
					<span>{l.visible}</span>
					<input type="range" min="0.05" max="1" step="0.05" bind:value={custom.bgOpacity} oninput={changed} />
				</label>
				<label class="row">
					<span>{l.blur}</span>
					<input type="range" min="0" max="30" step="1" bind:value={custom.bgBlur} oninput={changed} />
				</label>
				<div class="row">
					<span class="note">{l.picNote}</span>
					<button class="link" onclick={removeBg}>{l.remove}</button>
				</div>
			{/if}
		</div>

		<div class="actions">
			<button class="copy" onclick={copy}>{copied ? l.copied : l.copy}</button>
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
		width: 270px;
		max-height: calc(100dvh - 32px);
		overflow: auto;
		z-index: 20;
		background: #fff;
		color: #111;
		border: 1px solid #111;
		font-size: 13px;
		padding: 10px 12px 12px;
	}

	aside.closed {
		width: auto;
		padding-bottom: 10px;
	}

	button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: inherit;
		cursor: pointer;
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
		margin-top: 2px;
	}

	.block {
		margin-top: 10px;
		padding-top: 8px;
		border-top: 1px solid #e5e5e5;
	}

	.label {
		display: block;
		color: #888;
		margin-bottom: 6px;
	}

	.swatches {
		display: flex;
		gap: 4px;
	}

	.swatches button {
		flex: 1;
		height: 30px;
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

	.fonts button:hover {
		border-color: #888;
	}

	.fonts button.on {
		border-color: #111;
		background: #f2f2f2;
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

	.pair {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.segl {
		flex: 1;
		color: #888;
		align-self: center;
	}

	.seg button.on {
		border-color: #111;
		background: #f2f2f2;
		font-weight: 700;
	}

	.go {
		display: inline-block;
		margin-top: 4px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		padding: 3px 0;
	}

	.pick {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	input[type='text'] {
		width: 72px;
		font: inherit;
		font-family: ui-monospace, monospace;
		font-size: 12px;
		border: none;
		border-bottom: 1px solid #ddd;
		text-align: right;
		padding: 2px 0;
	}

	input[type='color'] {
		width: 22px;
		height: 22px;
		padding: 0;
		border: 1px solid #ccc;
		background: none;
		cursor: pointer;
	}

	input[type='range'] {
		width: 130px;
		accent-color: #111;
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

	.link {
		text-decoration: underline;
		color: #555;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
		margin-top: 12px;
		padding-top: 10px;
		border-top: 1px solid #e5e5e5;
	}

	.copy {
		background: #111;
		color: #fff;
		padding: 5px 10px;
	}

	@media (max-width: 520px) {
		aside {
			left: 8px;
			right: 8px;
			bottom: 8px;
			width: auto;
			max-height: 55dvh;
		}
	}
</style>
