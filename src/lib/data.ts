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

export type GalleryItem = { pic?: Picture; url?: string; title: string };

export const gallery: GalleryItem[] = Object.keys(art)
	.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
	.map((file) => ({
		pic: art[file],
		title: file.replace(/\.\w+$/, '').replace(/[-_]/g, ' ')
	}));

export const site = {
	name: 'viplusart',
	tags: ['she/her', 'illustrator'],
	avatar,
	email: 'viplus017@gmail.com',
	socials: [
		{ name: 'Telegram', url: 'https://t.me/Viplus_Art', icon: siTelegram },
		{ name: 'X', url: 'https://x.com/', icon: siX },
		{ name: 'Instagram', url: 'https://instagram.com/', icon: siInstagram },
		{ name: 'TikTok', url: 'https://www.tiktok.com/@vi_plus', icon: siTiktok },
		{ name: 'Pinterest', url: 'https://pinterest.com/', icon: siPinterest }
	]
};

export const commissions = {
	open: true,
	currency: '$',
	tiers: [
		{ name: 'tier one', price: '??', img: '1.jpg' },
		{ name: 'tier two', price: '??', img: '2.jpg' },
		{ name: 'tier three', price: '??', img: '3.jpg' }
	],
	note: 'to order, message me with your idea and references'
};
