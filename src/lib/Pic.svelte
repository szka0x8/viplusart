<script lang="ts">
	import type { Picture } from 'vite-imagetools';

	let {
		pic,
		url,
		alt,
		sizes,
		loading = 'lazy',
		fetchpriority = 'auto'
	}: {
		pic?: Picture;
		url?: string | null;
		alt: string;
		sizes: string;
		loading?: 'lazy' | 'eager';
		fetchpriority?: 'high' | 'low' | 'auto';
	} = $props();
</script>

{#if url}
	<img src={url} {alt} {loading} />
{:else if pic}
	<enhanced:img src={pic} {alt} {sizes} {loading} {fetchpriority} />
{/if}
