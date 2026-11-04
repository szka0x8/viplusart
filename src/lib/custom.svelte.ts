import { site, commissions, gallery, type GalleryItem } from './data.ts';
import { resolve } from '$app/paths';

export const defaults = {
	paper: '#eeebe4',
	page: '#eeebe4',
	cardAlpha: 82,
	tint: '#000000',
	tintAmount: 0,
	ink: '#151515',
	mute: '#77736b',
	line: '#d3cec4',
	rule: '#151515',
	bgOpacity: 0.35,
	bgBlur: 4,
	font: 'archivo',
	layout: 'editorial' as 'editorial' | 'card',
	radius: 24,
	align: 'auto' as 'auto' | 'left' | 'center' | 'right',
	cardPos: 'center' as 'left' | 'center' | 'right',
	alignParts: {
		title: 'auto',
		info: 'auto',
		buttons: 'auto',
		terms: 'auto',
		lists: 'auto',
		socials: 'auto'
	} as Record<'title' | 'info' | 'buttons' | 'terms' | 'lists' | 'socials', 'auto' | 'left' | 'center' | 'right'>,
	avatarSide: 'left' as 'left' | 'right',
	cardGalLayout: 'grid' as 'grid' | 'masonry' | 'big',
	cardGalCols: 2 as 2 | 3 | 4,
	cardGalHero: true,
	cardGalTitles: false,
	order: [] as number[],
	tierOrder: [] as number[],
	focus: {} as Record<string, [number, number]>,
	bodyFont: 'archivo',
	titleScale: 1,
	avatarShape: 'square' as 'square' | 'round' | 'arch',
	bw: false,
	grain: 0,
	nameFx: 'none' as 'none' | 'glow' | 'shimmer' | 'type' | 'glitch' | 'float' | 'outline' | 'sparkle',
	fxColor: '#b98cff',
	fxGrad: false,
	fx2: '#ff9ad5',
	nameGrad: false,
	n1: '#151515',
	n2: '#b98cff',
	nameAngle: 90,
	reveal: false,
	lift: false,
	pageFade: false,
	particles: 'none' as 'none' | 'dust' | 'stars' | 'petals',
	showTags: true,
	showStatus: true,
	showRecent: true,
	commLayout: 'pictures' as 'pictures' | 'list',
	commShape: 'portrait' as 'portrait' | 'square' | 'original',
	workLayout: 'masonry' as 'masonry' | 'grid' | 'big',
	workCols: 3 as 2 | 3 | 4,
	workGap: 'normal' as 'tight' | 'normal' | 'wide',
	workTitles: true,
	grads: {
		paper: { on: false, c2: '#d9d2c5', angle: 135 },
		page: { on: false, c2: '#d9d2c5', angle: 135 },
		ink: { on: false, c2: '#6a3df0', angle: 90 },
		mute: { on: false, c2: '#b98cff', angle: 90 },
		rule: { on: false, c2: '#b98cff', angle: 90 },
		line: { on: false, c2: '#b98cff', angle: 90 },
		tint: { on: false, c2: '#ff9ad5', angle: 135 }
	} as Record<'paper' | 'page' | 'ink' | 'mute' | 'rule' | 'line' | 'tint', { on: boolean; c2: string; angle: number }>,
	text: {
		name: '',
		tags: '',
		note: '',
		payment: '',
		terms: '',
		will: '',
		wont: '',
		tiers: [] as { name: string; price: string }[]
	}
};

type Design = typeof defaults;
const designKeys = Object.keys(defaults) as (keyof Design)[];

export const custom = $state({
	on: false,
	panel: false,
	open: true,
	tab: 'look' as 'look' | 'text' | 'pics' | 'pages' | 'save',
	lang: 'ru' as 'ru' | 'en',
	dragMode: 'order' as 'order' | 'crop',
	...structuredClone(defaults),
	bg: null as string | null,
	bgName: '',
	avatarUrl: null as string | null,
	workPics: [] as { url: string; title: string }[],
	tierPics: [] as (string | null)[]
});

const key = 'custom';
const slotsKey = 'custom-slots';

export function design(): Design {
	const snap = $state.snapshot(custom);
	return Object.fromEntries(designKeys.map((k) => [k, snap[k]])) as Design;
}

function merge(data: Partial<Design>) {
	const text = { ...structuredClone(defaults.text), ...(data.text ?? {}) };
	Object.assign(custom, structuredClone(defaults), data, { text });
}

export function load() {
	try {
		const saved = JSON.parse(localStorage.getItem(key) ?? 'null');
		if (saved) {
			const { text, ...rest } = saved;
			Object.assign(custom, rest);
			if (text) custom.text = { ...structuredClone(defaults.text), ...text };
			custom.grads = { ...structuredClone(defaults.grads), ...(rest.grads ?? {}) };
		}
	} catch {}
}

export function save() {
	try {
		const { bg, bgName, avatarUrl, workPics, tierPics, ...rest } = $state.snapshot(custom);
		localStorage.setItem(key, JSON.stringify(rest));
	} catch {}
}

export function reset() {
	merge({});
	custom.on = false;
	custom.bg = null;
	custom.bgName = '';
	custom.avatarUrl = null;
	custom.workPics = [];
	custom.tierPics = [];
	save();
}

export const slots = $state<Record<'A' | 'B' | 'C', Design | null>>({ A: null, B: null, C: null });

export function loadSlots() {
	try {
		Object.assign(slots, JSON.parse(localStorage.getItem(slotsKey) ?? '{}'));
	} catch {}
}

export function saveSlot(k: 'A' | 'B' | 'C') {
	slots[k] = design();
	try {
		localStorage.setItem(slotsKey, JSON.stringify($state.snapshot(slots)));
	} catch {}
}

export function loadSlot(k: 'A' | 'B' | 'C') {
	const d = slots[k];
	if (!d) return;
	merge(d);
	custom.on = true;
	save();
}

export function shareLink() {
	const d = design();
	const diff = Object.fromEntries(
		designKeys
			.filter((k) => JSON.stringify(d[k]) !== JSON.stringify(defaults[k]))
			.map((k) => [k, d[k]])
	);
	return `${location.origin}${resolve('/try')}#${encodeURIComponent(JSON.stringify(diff))}`;
}

export function applyShare(hash: string) {
	try {
		merge(JSON.parse(decodeURIComponent(hash)));
		custom.on = true;
		return true;
	} catch {
		return false;
	}
}

function list(v: string, fallback: string[]) {
	const t = v.trim();
	return t
		? t
				.split(',')
				.map((s) => s.trim())
				.filter(Boolean)
		: fallback;
}

function currentOrder(n: number) {
	const o = (custom.on ? custom.order : []).filter((i) => i < n);
	return [...o, ...[...Array(n).keys()].filter((i) => !o.includes(i))];
}

export function workItems(): GalleryItem[] {
	if (custom.on && custom.workPics.length) return custom.workPics;
	return currentOrder(gallery.length).map((i) => gallery[i]);
}

function tierOrder() {
	const n = commissions.tiers.length;
	const o = (custom.on ? custom.tierOrder : []).filter((i) => i < n);
	return [...o, ...[...Array(n).keys()].filter((i) => !o.includes(i))];
}

export function swapTiers(a: number, b: number) {
	if (a === b || commissions.tiers[a].section !== commissions.tiers[b].section) return;
	const o = tierOrder();
	const pa = o.indexOf(a);
	const pb = o.indexOf(b);
	[o[pa], o[pb]] = [o[pb], o[pa]];
	custom.tierOrder = o;
	custom.on = true;
	save();
}

export function swapWork(a: number, b: number) {
	if (a === b) return;
	if (custom.on && custom.workPics.length) {
		const w = [...custom.workPics];
		[w[a], w[b]] = [w[b], w[a]];
		custom.workPics = w;
	} else {
		const o = currentOrder(gallery.length);
		[o[a], o[b]] = [o[b], o[a]];
		custom.order = o;
	}
	custom.on = true;
	save();
}

export const editing = {
	get swap() {
		return custom.panel && custom.dragMode === 'order';
	},
	get crop() {
		return custom.panel && custom.dragMode === 'crop';
	}
};

export const view = {
	get o(): Design {
		return custom.on ? custom : defaults;
	},
	get name() {
		return (custom.on && custom.text.name.trim()) || site.name;
	},
	get tags() {
		const t = custom.on ? custom.text.tags.trim() : '';
		return t
			? t
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean)
			: site.tags;
	},
	get note() {
		return (custom.on && custom.text.note.trim()) || commissions.note;
	},
	get payment() {
		return (custom.on && custom.text.payment.trim()) || commissions.payment;
	},
	get terms() {
		const t = custom.on ? custom.text.terms.trim() : '';
		return t
			? t
					.split('\n')
					.map((s) => s.trim())
					.filter(Boolean)
			: commissions.terms;
	},
	get will() {
		return list(custom.on ? custom.text.will : '', commissions.will);
	},
	get wont() {
		return list(custom.on ? custom.text.wont : '', commissions.wont);
	},
	get sections() {
		const out: { title: string; tiers: ReturnType<typeof view.tiersRaw> }[] = [];
		for (const t of this.tiers) {
			let sec = out.find((s) => s.title === t.section);
			if (!sec) out.push((sec = { title: t.section, tiers: [] }));
			sec.tiers.push(t);
		}
		return out;
	},
	tiersRaw() {
		return commissions.tiers.map((t, i) => {
			const o = custom.on ? custom.text.tiers[i] : undefined;
			return { ...t, i, name: o?.name?.trim() || t.name, price: o?.price?.trim() || String(t.price) };
		});
	},
	get tiers() {
		const raw = this.tiersRaw();
		return tierOrder().map((i) => raw[i]);
	}
};
