type Opts = { i: number; enabled: boolean; onswap: (a: number, b: number) => void };

export function swappable(node: HTMLElement, opts: Opts) {
	let o = opts;
	let start: { x: number; y: number } | null = null;
	let dragging = false;
	let timer: ReturnType<typeof setTimeout> | undefined;
	let target: HTMLElement | null = null;
	node.dataset.swap = String(o.i);

	function down(e: PointerEvent) {
		if (!o.enabled || e.button > 0) return;
		start = { x: e.clientX, y: e.clientY };
		if (e.pointerType !== 'mouse') timer = setTimeout(begin, 280);
		window.addEventListener('pointermove', move);
		window.addEventListener('pointerup', up);
		window.addEventListener('pointercancel', cleanup);
	}

	function begin() {
		dragging = true;
		node.classList.add('swap-drag');
		navigator.vibrate?.(12);
	}

	function move(e: PointerEvent) {
		if (!start) return;
		const dx = e.clientX - start.x;
		const dy = e.clientY - start.y;
		if (!dragging) {
			if (e.pointerType !== 'mouse') {
				if (Math.hypot(dx, dy) > 10) cleanup();
				return;
			}
			if (Math.hypot(dx, dy) < 6) return;
			begin();
		}
		node.style.transform = `translate(${dx}px, ${dy}px)`;
		node.style.pointerEvents = 'none';
		const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>('[data-swap]') ?? null;
		const next = hit && hit !== node ? hit : null;
		if (next !== target) {
			target?.classList.remove('swap-target');
			target = next;
			target?.classList.add('swap-target');
		}
	}

	function up() {
		if (dragging) {
			if (target) o.onswap(o.i, Number(target.dataset.swap));
			const stop = (ev: Event) => {
				ev.stopPropagation();
				ev.preventDefault();
			};
			window.addEventListener('click', stop, { capture: true, once: true });
			setTimeout(() => window.removeEventListener('click', stop, { capture: true }), 60);
		}
		cleanup();
	}

	function cleanup() {
		clearTimeout(timer);
		start = null;
		dragging = false;
		node.classList.remove('swap-drag');
		node.style.transform = '';
		node.style.pointerEvents = '';
		target?.classList.remove('swap-target');
		target = null;
		window.removeEventListener('pointermove', move);
		window.removeEventListener('pointerup', up);
		window.removeEventListener('pointercancel', cleanup);
	}

	const touchmove = (e: TouchEvent) => dragging && e.preventDefault();
	const nodrag = (e: Event) => o.enabled && e.preventDefault();
	node.addEventListener('pointerdown', down);
	node.addEventListener('touchmove', touchmove, { passive: false });
	node.addEventListener('dragstart', nodrag);
	node.addEventListener('contextmenu', nodrag);

	return {
		update(n: Opts) {
			o = n;
			node.dataset.swap = String(n.i);
		},
		destroy() {
			cleanup();
			node.removeEventListener('pointerdown', down);
			node.removeEventListener('touchmove', touchmove);
			node.removeEventListener('dragstart', nodrag);
			node.removeEventListener('contextmenu', nodrag);
		}
	};
}
