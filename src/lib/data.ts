import type { Picture } from 'vite-imagetools';
import { siTelegram, siX, siInstagram, siTiktok, siPinterest } from 'simple-icons';

const files = import.meta.glob<Picture>('./art/*.{jpg,jpeg,png,webp}', {
	eager: true,
	query: { enhanced: true, w: '2400;1600;1000;600' },
	import: 'default'
});

const avatar = Object.values(
	import.meta.glob<Picture>('./assets/avatar.{jpg,jpeg,png,webp}', {
		eager: true,
		query: { enhanced: true, w: '800;400' },
		import: 'default'
	})
)[0];

export const art: Record<string, Picture> = Object.fromEntries(
	Object.entries(files).map(([path, pic]) => [path.split('/').pop()!, pic])
);

export const gallery = Object.keys(art)
	.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
	.map((file) => ({
		pic: art[file],
		title: file.replace(/\.\w+$/, '').replace(/[-_]/g, ' ')
	}));

export type GalleryItem = (typeof gallery)[number];

export const site = {
	name: 'viplusart',
	tags: ['she/her', 'illustrator'],
	avatar,
	email: 'artist@example.com',
	socials: [
		{ name: 'Telegram', url: 'https://t.me/', icon: siTelegram },
		{ name: 'X', url: 'https://x.com/', icon: siX },
		{ name: 'Instagram', url: 'https://instagram.com/', icon: siInstagram },
		{ name: 'TikTok', url: 'https://tiktok.com/', icon: siTiktok },
		{ name: 'Pinterest', url: 'https://pinterest.com/', icon: siPinterest }
	]
};

export const commissions = {
	open: true,
	currency: '$',
	tiers: [
		{ name: 'bust', price: 20, desc: 'head and shoulders', img: '1.jpg' },
		{ name: 'half body', price: 35, desc: 'waist up', img: '2.jpg' },
		{ name: 'full body', price: 50, desc: 'whole character', img: '3.jpg' }
	],
	extras: [
		{ name: 'simple background', price: 10 },
		{ name: 'extra character', price: '+80%' }
	],
	will: ['original characters', 'fanart', 'couples'],
	wont: ['nsfw', 'mecha', 'heavy gore'],
	terms: [
		'payment upfront before i start',
		'you get a sketch to approve before the final',
		'up to 2 small revisions included',
		'usually done in 1–2 weeks',
		'no refunds once the sketch is done'
	],
	howTo: 'email me with your character refs, the tier you want and any details'
};
