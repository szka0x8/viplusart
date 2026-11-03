import { site, commissions } from './data.ts';
import { resolve } from '$app/paths';

export const defaults = {
	paper: '#eeebe4',
	ink: '#151515',
	mute: '#77736b',
	line: '#d3cec4',
	bgOpacity: 0.35,
	bgBlur: 4,
	font: 'archivo',
	bodyFont: 'archivo',
	titleScale: 1,
	avatarShape: 'square' as 'square' | 'round' | 'arch',
	bw: false,
	grain: 0,
	showTags: true,
	showStatus: true,
	showRecent: true,
	commLayout: 'pictures' as 'pictures' | 'list',
	commShape: 'portrait' as 'portrait' | 'square' | 'original',
	workLayout: 'masonry' as 'masonry' | 'grid' | 'big',
	workCols: 3 as 2 | 3 | 4,
	workGap: 'normal' as 'tight' | 'normal' | 'wide',
	workTitles: true,
	text: {
		name: '',
		tags: '',
		note: '',
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
	get tiers() {
		return commissions.tiers.map((t, i) => {
			const o = custom.on ? custom.text.tiers[i] : undefined;
			return { ...t, name: o?.name?.trim() || t.name, price: o?.price?.trim() || t.price };
		});
	}
};
