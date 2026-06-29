/* =========================================================
   Option A — Energetic
   Vanilla JS: ヒーロー動画セットアップ / メニュー / スクロール演出 / カウントアップ
   ========================================================= */

(function () {
	'use strict';

	/* -------- 1. ヘッダーのスクロール状態 -------- */
	const header = document.getElementById('site-header');
	const onScroll = () => {
		if (!header) return;
		if (window.scrollY > 40) header.classList.add('scrolled');
		else header.classList.remove('scrolled');
	};
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	/* -------- 2. モバイルメニュー -------- */
	const toggle = document.getElementById('menu-toggle');
	const menu   = document.getElementById('mobile-menu');
	if (toggle && menu) {
		const setOpen = (open) => {
			toggle.classList.toggle('open', open);
			menu.classList.toggle('open', open);
			toggle.setAttribute('aria-expanded', String(open));
			menu.setAttribute('aria-hidden', String(!open));
			document.body.style.overflow = open ? 'hidden' : '';
		};
		toggle.addEventListener('click', () => {
			const next = !menu.classList.contains('open');
			setOpen(next);
		});
		// メニュー内リンクで自動的に閉じる
		menu.querySelectorAll('a').forEach(a => {
			a.addEventListener('click', () => setOpen(false));
		});
		// Esc で閉じる
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && menu.classList.contains('open')) setOpen(false);
		});
	}

	/* -------- 3. ヒーロー動画セットアップ (旧版 rev-2020.03 方式) -------- */
	// iOS Safari/Chrome での autoplay 安定化のため、HTML には <video> を置かず、
	// window.load 後に <video><source></video> を innerHTML で一括挿入する。
	// (静的配置でも仕様上は動くはずだが、実機で autoplay が拒否されるケースが多発したため)
	const heroWrap = document.querySelector('.hero-video-wrap');
	if (heroWrap) {
		window.addEventListener('load', () => {
			const isMobile = window.matchMedia('(max-width: 720px)').matches;
			const src = isMobile ? 'images/movie2_sp.mp4' : 'images/movie2.mp4';
			heroWrap.insertAdjacentHTML(
				'afterbegin',
				'<video class="hero-video" id="hero-video" autoplay loop muted playsinline preload="metadata">' +
				'<source src="' + src + '" type="video/mp4">' +
				'</video>'
			);

			const video = document.getElementById('hero-video');
			if (!video) return;

			// 再生開始フラグと、未再生のままならフォールバック画像を表示するハンドラ
			let hasPlayed = false;
			video.addEventListener('playing', () => { hasPlayed = true; }, { once: true });
			const showFallback = () => {
				if (!hasPlayed) video.setAttribute('poster', 'images/all.jpg');
			};
			video.addEventListener('error', showFallback);
			video.addEventListener('stalled', showFallback);
			// 5 秒経っても再生開始しなければフォールバック (autoplay 拒否, 低電力モード等)
			setTimeout(showFallback, 5000);
		});
	}

	/* -------- 4. スクロール連動の出現アニメーション (Intersection Observer) -------- */
	const revealEls = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window && revealEls.length) {
		const io = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
		revealEls.forEach(el => io.observe(el));
	} else {
		// IntersectionObserver 非対応ブラウザは即時表示
		revealEls.forEach(el => el.classList.add('in-view'));
	}

	/* -------- 5. 数字のカウントアップ (stats) -------- */
	const counters = document.querySelectorAll('.stat-num');
	const animateCount = (el) => {
		const target  = parseInt(el.dataset.count || '0', 10);
		const prefix  = el.dataset.prefix || '';
		const suffix  = el.dataset.suffix || '';
		const duration = 1400;
		const start = performance.now();

		const formatNumber = (n) => {
			// 1000 以上はカンマ区切り
			return target >= 1000 ? n.toLocaleString('en-US') : String(n);
		};

		const tick = (now) => {
			const t = Math.min(1, (now - start) / duration);
			// ease-out cubic
			const eased = 1 - Math.pow(1 - t, 3);
			const value = Math.round(target * eased);
			el.textContent = `${prefix}${formatNumber(value)}${suffix}`;
			if (t < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	};

	if ('IntersectionObserver' in window && counters.length) {
		const co = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					animateCount(entry.target);
					co.unobserve(entry.target);
				}
			});
		}, { threshold: 0.4 });
		counters.forEach(c => co.observe(c));
	} else {
		counters.forEach(animateCount);
	}

	/* -------- 6. アンカーリンクの平滑スクロール (ヘッダー分のオフセット補正) -------- */
	const headerOffset = 80;
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', (e) => {
			const id = a.getAttribute('href');
			if (!id || id === '#') return;
			const target = document.querySelector(id);
			if (!target) return;
			e.preventDefault();
			const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
			window.scrollTo({ top: y, behavior: 'smooth' });
		});
	});

	/* -------- 7. フッターの年号自動更新 -------- */
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();
