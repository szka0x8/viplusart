export type Font = {
	id: string;
	name: string;
	family: string;
	weight: number;
	stretch: string;
	spacing: string;
	adjust?: number;
	load?: () => Promise<unknown>;
};

export const fonts: Font[] = [
	{ id: 'archivo', name: 'Archivo', family: "'Archivo Variable'", weight: 900, stretch: '125%', spacing: '-0.03em' },
	{
		id: 'playfair',
		name: 'Playfair',
		family: "'Playfair Display Variable'",
		weight: 800,
		stretch: 'normal',
		spacing: '-0.02em',
		load: () => import('@fontsource-variable/playfair-display')
	},
	{
		id: 'cormorant',
		name: 'Cormorant',
		family: "'Cormorant Garamond'",
		adjust: 0.5,
		weight: 700,
		stretch: 'normal',
		spacing: '-0.01em',
		load: () => import('@fontsource/cormorant-garamond/700.css')
	},
	{
		id: 'unbounded',
		name: 'Unbounded',
		family: "'Unbounded Variable'",
		weight: 800,
		stretch: 'normal',
		spacing: '-0.03em',
		load: () => import('@fontsource-variable/unbounded')
	},
	{
		id: 'syne',
		name: 'Syne',
		family: "'Syne Variable'",
		weight: 800,
		stretch: 'normal',
		spacing: '-0.02em',
		load: () => import('@fontsource-variable/syne')
	},
	{
		id: 'bebas',
		name: 'Bebas Neue',
		family: "'Bebas Neue'",
		weight: 400,
		stretch: 'normal',
		spacing: '0.01em',
		load: () => import('@fontsource/bebas-neue')
	},
	{
		id: 'vibes',
		name: 'Great Vibes',
		family: "'Great Vibes'",
		adjust: 0.48,
		weight: 400,
		stretch: 'normal',
		spacing: '0',
		load: () => import('@fontsource/great-vibes')
	},
	{
		id: 'fraktur',
		name: 'Fraktur',
		family: "'UnifrakturMaguntia'",
		weight: 400,
		stretch: 'normal',
		spacing: '0',
		load: () => import('@fontsource/unifrakturmaguntia')
	},
	{
		id: 'mono',
		name: 'Space Mono',
		family: "'Space Mono'",
		weight: 700,
		stretch: 'normal',
		spacing: '-0.04em',
		load: () => import('@fontsource/space-mono/700.css')
	},
	{
		id: 'rubik',
		name: 'Rubik Mono',
		family: "'Rubik Mono One'",
		weight: 400,
		stretch: 'normal',
		spacing: '-0.02em',
		load: () => import('@fontsource/rubik-mono-one')
	}
];

export const fontById = (id: string) => fonts.find((f) => f.id === id) ?? fonts[0];

export const bodyFonts: Font[] = [
	{ id: 'archivo', name: 'Archivo', family: "'Archivo Variable'", weight: 400, stretch: '100%', spacing: '0' },
	{
		id: 'cormorant',
		name: 'Cormorant',
		family: "'Cormorant Garamond'",
		adjust: 0.5,
		weight: 400,
		stretch: 'normal',
		spacing: '0',
		load: () => import('@fontsource/cormorant-garamond/400.css')
	},
	{
		id: 'playfair',
		name: 'Playfair',
		family: "'Playfair Display Variable'",
		weight: 400,
		stretch: 'normal',
		spacing: '0',
		load: () => import('@fontsource-variable/playfair-display')
	},
	{
		id: 'syne',
		name: 'Syne',
		family: "'Syne Variable'",
		weight: 400,
		stretch: 'normal',
		spacing: '0',
		load: () => import('@fontsource-variable/syne')
	},
	{
		id: 'mono',
		name: 'Space Mono',
		family: "'Space Mono'",
		weight: 400,
		stretch: 'normal',
		spacing: '0',
		load: () => import('@fontsource/space-mono/400.css')
	}
];

export const bodyFontById = (id: string) => bodyFonts.find((f) => f.id === id) ?? bodyFonts[0];
