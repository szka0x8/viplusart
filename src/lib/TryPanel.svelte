<script lang="ts">
	import { onMount } from 'svelte';
	import {
		defaults,
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
			layout: 'макет',
			editorial: 'строгий',
			card: 'мягкий',
			radius: 'скругление',
			start: 'начать с',
			font: 'шрифт названия',
			bodyFont: 'шрифт текста',
			size: 'размер названия',
			colors: 'цвета',
			bg: 'фон',
			cardBg: 'фон карточки',
			page: 'фон вокруг карточки',
			cardAlpha: 'плотность карточки',
			tint: 'цвет поверх картинки',
			tintAmount: 'сила цвета',
			text: 'текст',
			small: 'мелкий текст',
			rules: 'главные линии',
			lines: 'тонкие линии',
			effects: 'эффекты',
			bw: 'чёрно-белые картинки',
			nameFx: 'эффект названия',
			fx: { none: 'нет', glow: 'свечение', shimmer: 'блеск', type: 'печать', outline: 'контур', sparkle: 'блёстки' },
			nameColor: 'цвет названия',
			gradTip: 'градиент',
			solid: 'обычный',
			gradient: 'градиент',
			angle: 'угол',
			fxGrad: 'градиент эффектов',
			color1: 'цвет 1',
			color2: 'цвет 2',
			fxColor: 'цвет эффектов',
			reveal: 'появление при прокрутке',
			lift: 'подъём при наведении',
			pageFade: 'плавные переходы',
			particles: 'частицы',
			parts2: { none: 'нет', dust: 'пыль', stars: 'звёзды', petals: 'лепестки' },
			grain: 'зерно',
			name: 'название',
			tags: 'о тебе (через запятую)',
			tiers: 'цены',
			price: 'цена',
			order: 'как заказать',
			payment: 'оплата',
			terms: 'условия (каждое с новой строки)',
			will: 'рисую (через запятую)',
			wont: 'не рисую (через запятую)',
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
			alignment: 'выравнивание',
			textAlign: 'текст',
			cardPos: 'карточка на странице',
			avatarSide: 'аватар',
			auto: 'авто',
			left: 'слева',
			center: 'центр',
			right: 'справа',
			hero: 'первая крупно',
			each: 'по отдельности',
			parts: { title: 'названия', info: 'текст', buttons: 'кнопки', terms: 'условия', lists: 'рисую / не рисую', socials: 'иконки' },
			short: { auto: 'А', left: 'Л', center: 'Ц', right: 'П' },
			drag: 'перетаскивание',
			dragOrder: 'порядок',
			dragCrop: 'кадр',
			dragOrderNote: 'зажми картинку и перетащи на другую, они поменяются местами',
			dragCropNote: 'тяни внутри картинки, чтобы выбрать, какая часть видна',
			resetOrder: 'сбросить порядок',
			resetCrop: 'сбросить кадры',
			showTags: 'о тебе',
			showStatus: 'статус комиссий',
			showRecent: 'последние работы',
			work: 'работы',
			gallery: 'галерея',
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
			layout: 'layout',
			editorial: 'clean',
			card: 'soft',
			radius: 'roundness',
			start: 'start from',
			font: 'title font',
			bodyFont: 'text font',
			size: 'title size',
			colors: 'colors',
			bg: 'background',
			cardBg: 'card background',
			page: 'background around the card',
			cardAlpha: 'card opacity',
			tint: 'color over the picture',
			tintAmount: 'color strength',
			text: 'text',
			small: 'small text',
			rules: 'main lines',
			lines: 'thin lines',
			effects: 'effects',
			bw: 'black & white pictures',
			nameFx: 'name effect',
			fx: { none: 'none', glow: 'glow', shimmer: 'shimmer', type: 'typing', outline: 'outline', sparkle: 'sparkle' },
			nameColor: 'name color',
			gradTip: 'gradient',
			solid: 'normal',
			gradient: 'gradient',
			angle: 'angle',
			fxGrad: 'effect gradient',
			color1: 'color 1',
			color2: 'color 2',
			fxColor: 'effect color',
			reveal: 'fade in on scroll',
			lift: 'lift on hover',
			pageFade: 'smooth page change',
			particles: 'particles',
			parts2: { none: 'none', dust: 'dust', stars: 'stars', petals: 'petals' },
			grain: 'grain',
			name: 'name',
			tags: 'about you (split with commas)',
			tiers: 'prices',
			price: 'price',
			order: 'how to order',
			payment: 'payment',
			terms: 'terms (one per line)',
			will: 'i do (split with commas)',
			wont: "i don't (split with commas)",
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
			alignment: 'alignment',
			textAlign: 'text',
			cardPos: 'card on the page',
			avatarSide: 'avatar',
			auto: 'auto',
			left: 'left',
			center: 'center',
			right: 'right',
			hero: 'first one big',
			each: 'individually',
			parts: { title: 'titles', info: 'text', buttons: 'buttons', terms: 'terms', lists: 'i do / i don\'t', socials: 'icons' },
			short: { auto: 'A', left: 'L', center: 'C', right: 'R' },
			drag: 'dragging',
			dragOrder: 'order',
			dragCrop: 'crop',
			dragOrderNote: 'hold a picture and drag it onto another one to swap them',
			dragCropNote: 'drag inside a picture to choose which part is visible',
			resetOrder: 'reset order',
			resetCrop: 'reset crops',
			showTags: 'about you',
			showStatus: 'commission status',
			showRecent: 'recent work',
			work: 'work',
			gallery: 'gallery',
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

	const colorNames = { paper: 'bg', page: 'page', ink: 'text', mute: 'small', rule: 'rules', line: 'lines' } as const;
	let colors = $derived(
		custom.layout === 'card'
			? (['paper', 'page', 'ink', 'mute', 'line'] as const)
			: (['paper', 'ink', 'mute', 'rule', 'line'] as const)
	);
	const tabs = ['look', 'text', 'pics', 'pages', 'save'] as const;

	let l = $derived(t[custom.lang]);
	let soft = $derived(custom.layout === 'card');
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
		Object.assign(custom, c, { rule: c.ink, page: c.paper });
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

{#snippet colorRow(k: 'paper' | 'page' | 'ink' | 'mute' | 'rule' | 'line' | 'tint', label: string)}
	<div class="row">
		<span>{label}</span>
		<span class="pick">
			<input type="text" bind:value={custom[k]} oninput={changed} spellcheck="false" />
			<ColorPick bind:value={custom[k]} onchange={changed} />
			<button
				class="gbtn"
				class:on={custom.grads[k].on}
				title={l.gradTip}
				onclick={() => {
					custom.grads[k].on = !custom.grads[k].on;
					changed();
				}}>⇄</button
			>
		</span>
	</div>
	{#if custom.grads[k].on}
		<div class="row sub2">
			<span>↳ {l.color2}</span>
			<span class="pick">
				<input type="text" bind:value={custom.grads[k].c2} oninput={changed} spellcheck="false" />
				<ColorPick bind:value={custom.grads[k].c2} onchange={changed} />
				<span class="gpad"></span>
			</span>
		</div>
		<label class="row sub2">
			<span>↳ {l.angle}</span>
			<input type="range" min="0" max="360" step="5" bind:value={custom.grads[k].angle} oninput={changed} />
		</label>
	{/if}
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
				<span class="label">{l.layout}</span>
				{@render seg(['editorial', 'card'] as const, custom.layout, (v) => setc('layout', v), (v) => l[v])}
				{#if soft}
					<label class="row">
						<span>{l.radius}</span>
						<input type="range" min="0" max="48" step="1" bind:value={custom.radius} oninput={changed} />
					</label>
				{/if}

				<span class="label">{l.start}</span>
				<div class="swatches">
					{#each presets as p}
						<button title={p[custom.lang]} style:background={p.paper} style:color={p.ink} onclick={() => apply(p)}>Aa</button>
					{/each}
				</div>

				<span class="label">{l.colors}</span>
				{#each colors as c}
					{@render colorRow(c, c === 'paper' && custom.layout === 'card' ? l.cardBg : l[colorNames[c]])}
				{/each}

				{#if custom.layout === 'card'}
					<label class="row">
						<span>{l.cardAlpha}</span>
						<input type="range" min="20" max="100" step="2" bind:value={custom.cardAlpha} oninput={changed} />
					</label>
				{/if}

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

				<span class="label">{l.nameFx}</span>
				<div class="fxgrid">
					{#each ['none', 'glow', 'shimmer', 'type', 'outline', 'sparkle'] as const as v}
						<button class:on={custom.nameFx === v} onclick={() => setc('nameFx', v)}>{l.fx[v]}</button>
					{/each}
				</div>
				<div class="row">
					<span>{custom.fxGrad ? `${l.fxColor} 1` : l.fxColor}</span>
					<span class="pick">
						<input type="text" bind:value={custom.fxColor} oninput={changed} spellcheck="false" />
						<ColorPick bind:value={custom.fxColor} onchange={changed} />
					</span>
				</div>
				{@render toggle(l.fxGrad, custom.fxGrad, (v) => setc('fxGrad', v))}
				{#if custom.fxGrad}
					<div class="row">
						<span>{l.fxColor} 2</span>
						<span class="pick">
							<input type="text" bind:value={custom.fx2} oninput={changed} spellcheck="false" />
							<ColorPick bind:value={custom.fx2} onchange={changed} />
						</span>
					</div>
				{/if}

				<span class="label">{l.nameColor}</span>
				{@render seg([false, true] as const, custom.nameGrad, (v) => setc('nameGrad', v), (v) => (v ? l.gradient : l.solid))}
				{#if custom.nameGrad}
					<div class="row">
						<span>{l.color1}</span>
						<span class="pick">
							<input type="text" bind:value={custom.n1} oninput={changed} spellcheck="false" />
							<ColorPick bind:value={custom.n1} onchange={changed} />
						</span>
					</div>
					<div class="row">
						<span>{l.color2}</span>
						<span class="pick">
							<input type="text" bind:value={custom.n2} oninput={changed} spellcheck="false" />
							<ColorPick bind:value={custom.n2} onchange={changed} />
						</span>
					</div>
					<label class="row">
						<span>{l.angle}</span>
						<input type="range" min="0" max="360" step="5" bind:value={custom.nameAngle} oninput={changed} />
					</label>
				{/if}

				<span class="label">{l.effects}</span>
				{@render toggle(l.reveal, custom.reveal, (v) => setc('reveal', v))}
				{@render toggle(l.lift, custom.lift, (v) => setc('lift', v))}
				{@render toggle(l.pageFade, custom.pageFade, (v) => setc('pageFade', v))}
				<span class="sub">{l.particles}</span>
				{@render seg(['none', 'dust', 'stars', 'petals'] as const, custom.particles, (v) => setc('particles', v), (v) => l.parts2[v])}
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
					{#if i === 0 || commissions.tiers[i - 1].section !== tr.section}
						<span class="sec">{tr.section}</span>
					{/if}
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
				<label class="field">
					<span>{l.payment}</span>
					<input type="text" bind:value={custom.text.payment} oninput={changed} placeholder={commissions.payment} />
				</label>
				<label class="field">
					<span>{l.terms}</span>
					<textarea rows="4" bind:value={custom.text.terms} oninput={changed} placeholder={commissions.terms.join('\n')}></textarea>
				</label>
				<label class="field">
					<span>{l.will}</span>
					<input type="text" bind:value={custom.text.will} oninput={changed} placeholder={commissions.will.join(', ')} />
				</label>
				<label class="field">
					<span>{l.wont}</span>
					<input type="text" bind:value={custom.text.wont} oninput={changed} placeholder={commissions.wont.join(', ')} />
				</label>
			{:else if custom.tab === 'pics'}
				<span class="label">{l.drag}</span>
				{@render seg(['order', 'crop'] as const, custom.dragMode, (v) => set('dragMode', v), (v) => l[v === 'order' ? 'dragOrder' : 'dragCrop'])}
				<p class="note">{custom.dragMode === 'order' ? l.dragOrderNote : l.dragCropNote}</p>
				<div class="share">
					<button class="link" onclick={() => ((custom.order = []), setc('tierOrder', []))}>{l.resetOrder}</button>
					<button class="link" onclick={() => setc('focus', {})}>{l.resetCrop}</button>
				</div>

				{@render file(l.avatar, custom.avatarUrl ? '✓' : '', pickAvatar, custom.avatarUrl ? () => (custom.avatarUrl = null) : null)}
				<span class="label">{l.shape}</span>
				{@render seg(['square', 'round', 'arch'] as const, custom.avatarShape, (v) => setc('avatarShape', v), (v) => l[v])}

				<span class="label">{soft ? l.gallery : l.workPics} / {l.comm}</span>
				{@render file(
					soft ? l.gallery : l.workPics,
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
					{@render colorRow('tint', l.tint)}
					<label class="row">
						<span>{l.tintAmount}</span>
						<input type="range" min="0" max="0.9" step="0.05" bind:value={custom.tintAmount} oninput={changed} />
					</label>
				{/if}
				<p class="note">{l.picsNote}</p>
			{:else if custom.tab === 'pages'}
				<span class="label">{l.alignment}</span>
				<span class="sub">{l.textAlign}</span>
				{@render seg(['auto', 'left', 'center', 'right'] as const, custom.align, (v) => setc('align', v), (v) => l[v])}
				{#if custom.layout === 'card'}
					<span class="sub">{l.cardPos}</span>
					{@render seg(['left', 'center', 'right'] as const, custom.cardPos, (v) => setc('cardPos', v), (v) => l[v])}
				{/if}
				{#if soft}
				<details class="each">
					<summary>{l.each}</summary>
					{#each ['title', 'info', 'buttons', 'terms', 'lists', 'socials'] as const as part}
						<div class="row">
							<span>{l.parts[part]}</span>
							<span class="mini">
								{#each ['auto', 'left', 'center', 'right'] as const as v}
									<button
										class:on={(custom.alignParts?.[part] ?? 'auto') === v}
										title={l[v]}
										onclick={() => {
											custom.alignParts = { ...defaults.alignParts, ...custom.alignParts, [part]: v };
											changed();
										}}>{l.short[v]}</button
									>
								{/each}
							</span>
						</div>
					{/each}
				</details>
				{/if}
				<span class="sub">{l.avatarSide}</span>
				{@render seg(['left', 'right'] as const, custom.avatarSide, (v) => setc('avatarSide', v), (v) => l[v])}

				<span class="label">{l.home} <a class="link" href={resolve('/')}>→</a></span>
				{@render toggle(l.showTags, custom.showTags, (v) => setc('showTags', v))}
				{@render toggle(l.showStatus, custom.showStatus, (v) => setc('showStatus', v))}
				{#if !soft}
					{@render toggle(l.showRecent, custom.showRecent, (v) => setc('showRecent', v))}
				{/if}

				<span class="label">{soft ? l.gallery : l.work} <a class="link" href={resolve('/gallery')}>→</a></span>
				{#if custom.layout === 'card'}
					{@render seg(['grid', 'masonry', 'big'] as const, custom.cardGalLayout, (v) => setc('cardGalLayout', v), (v) => l[v])}
					{#if custom.cardGalLayout !== 'big'}
						{@render seg([2, 3, 4] as const, custom.cardGalCols, (v) => setc('cardGalCols', v), (v) => `${v} ${l.cols}`)}
					{/if}
					{@render seg(['tight', 'normal', 'wide'] as const, custom.workGap, (v) => setc('workGap', v), (v) => l[v])}
					{@render toggle(l.hero, custom.cardGalHero, (v) => setc('cardGalHero', v))}
					{@render toggle(l.titles, custom.cardGalTitles, (v) => setc('cardGalTitles', v))}
				{:else}
					{@render seg(['masonry', 'grid', 'big'] as const, custom.workLayout, (v) => setc('workLayout', v), (v) => l[v])}
					{#if custom.workLayout !== 'big'}
						{@render seg([2, 3, 4] as const, custom.workCols, (v) => setc('workCols', v), (v) => `${v} ${l.cols}`)}
					{/if}
					{@render seg(['tight', 'normal', 'wide'] as const, custom.workGap, (v) => setc('workGap', v), (v) => l[v])}
					{@render toggle(l.titles, custom.workTitles, (v) => setc('workTitles', v))}
				{/if}

				<span class="label">{l.comm} <a class="link" href={resolve('/commissions')}>→</a></span>
				{#if !soft}
				{@render seg(['pictures', 'list'] as const, custom.commLayout, (v) => setc('commLayout', v), (v) => l[v])}
				{#if custom.commLayout === 'pictures'}
					{@render seg(
						['portrait', 'square', 'original'] as const,
						custom.commShape,
						(v) => setc('commShape', v),
						(v) => l[v === 'original' ? 'asis' : v]
					)}
				{/if}
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

	.each summary {
		cursor: pointer;
		color: #555;
		margin: 6px 0 4px;
	}

	.gbtn {
		width: 22px;
		height: 22px;
		border: 1px solid #ccc;
		font-size: 12px;
		line-height: 1;
		color: #999;
	}

	.gbtn.on {
		border-color: #111;
		background: #111;
		color: #fff;
	}

	.gpad {
		width: 22px;
	}

	.sub2 > span:first-child {
		color: #888;
		padding-left: 6px;
	}

	.fxgrid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 4px;
		margin-bottom: 6px;
	}

	.fxgrid button {
		border: 1px solid #ddd;
		padding: 5px 2px;
		font-size: 12px;
	}

	.fxgrid button.on {
		border-color: #111;
		background: #f2f2f2;
		font-weight: 700;
	}

	.mini {
		display: flex;
		gap: 3px;
	}

	.mini button {
		width: 24px;
		height: 22px;
		border: 1px solid #ddd;
		font-size: 11px;
	}

	.mini button.on {
		border-color: #111;
		background: #f2f2f2;
		font-weight: 700;
	}

	.sub {
		display: block;
		font-size: 12px;
		color: #aaa;
		margin: 4px 0 3px;
	}

	.sec {
		display: block;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #aaa;
		margin: 6px 0 2px;
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
