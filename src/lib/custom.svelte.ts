export const defaults = {
	paper: '#eeebe4',
	ink: '#151515',
	mute: '#77736b',
	line: '#d3cec4',
	bgOpacity: 0.35,
	bgBlur: 4,
	font: 'archivo',
	commLayout: 'pictures' as 'pictures' | 'list',
	commShape: 'portrait' as 'portrait' | 'square' | 'original',
	workLayout: 'masonry' as 'masonry' | 'grid' | 'big',
	workCols: 3 as 2 | 3 | 4,
	workGap: 'normal' as 'tight' | 'normal' | 'wide',
	workTitles: true
};

export const custom = $state({
	on: false,
	panel: false,
	open: true,
	lang: 'ru' as 'ru' | 'en',
	...defaults,
	bg: null as string | null,
	bgName: '',
	avatarUrl: null as string | null,
	workPics: [] as { url: string; title: string }[],
	tierPics: [] as (string | null)[]
});

const key = 'custom';

export function load() {
	try {
		const saved = JSON.parse(localStorage.getItem(key) ?? 'null');
		if (saved) Object.assign(custom, saved);
	} catch {}
}

export function save() {
	try {
		const { bg, bgName, avatarUrl, workPics, tierPics, ...rest } = custom;
		localStorage.setItem(key, JSON.stringify(rest));
	} catch {}
}

export function reset() {
	Object.assign(custom, defaults, { on: false, bg: null, bgName: '', avatarUrl: null, workPics: [], tierPics: [] });
	save();
}
