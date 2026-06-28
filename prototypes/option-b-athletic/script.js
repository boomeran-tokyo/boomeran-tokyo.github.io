/* ============================================================
   八幡山ブーメラン - Athletic Prototype
   Vanilla JS: ヘッダー、メニュー、スクロール出現、カウントアップ、
   ヒーロー動画セットアップ
   ============================================================ */

(function () {
	'use strict';

	// ---------- ヒーロー動画の動的セットアップ（モバイル/デスクトップ振り分け） ----------
	function setupHeroVideo() {
		var video = document.getElementById('heroVideo');
		if (!video) return;

		var isMobile = window.matchMedia('(max-width: 768px)').matches;
		var src = isMobile
			? '../../images/movie2_sp.mp4'
			: '../../images/movie2.mp4';

		// 既に同じ src なら何もしない
		if (video.currentSrc && video.currentSrc.indexOf(src) !== -1) return;

		video.src = src;
		// 再生試行（autoplay が拒否された場合のフォールバック）
		var playPromise = video.play();
		if (playPromise && typeof playPromise.catch === 'function') {
			playPromise.catch(function () {
				// 静かに失敗、poster が見える状態
			});
		}
	}

	// ---------- ヘッダーのスクロール状態 ----------
	function setupHeaderScroll() {
		var header = document.getElementById('siteHeader');
		if (!header) return;

		var ticking = false;
		function update() {
			if (window.scrollY > 32) header.classList.add('is-scrolled');
			else header.classList.remove('is-scrolled');
			ticking = false;
		}
		window.addEventListener('scroll', function () {
			if (!ticking) {
				window.requestAnimationFrame(update);
				ticking = true;
			}
		}, { passive: true });
		update();
	}

	// ---------- モバイルメニュー開閉 ----------
	function setupMobileMenu() {
		var toggle = document.getElementById('menuToggle');
		var menu = document.getElementById('mobileMenu');
		if (!toggle || !menu) return;

		function open() {
			toggle.classList.add('is-open');
			menu.classList.add('is-open');
			menu.setAttribute('aria-hidden', 'false');
			toggle.setAttribute('aria-expanded', 'true');
			document.body.style.overflow = 'hidden';
		}
		function close() {
			toggle.classList.remove('is-open');
			menu.classList.remove('is-open');
			menu.setAttribute('aria-hidden', 'true');
			toggle.setAttribute('aria-expanded', 'false');
			document.body.style.overflow = '';
		}
		toggle.addEventListener('click', function () {
			if (menu.classList.contains('is-open')) close();
			else open();
		});
		// メニュー内リンクで閉じる
		menu.querySelectorAll('a').forEach(function (a) {
			a.addEventListener('click', close);
		});
		// Esc で閉じる
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && menu.classList.contains('is-open')) close();
		});
	}

	// ---------- IntersectionObserver による出現アニメーション ----------
	function setupReveal() {
		var els = document.querySelectorAll('.reveal');
		if (!('IntersectionObserver' in window)) {
			els.forEach(function (el) { el.classList.add('is-visible'); });
			return;
		}
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					var delay = entry.target.getAttribute('data-delay');
					if (delay) {
						entry.target.style.transitionDelay = delay + 'ms';
					}
					entry.target.classList.add('is-visible');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

		els.forEach(function (el) { io.observe(el); });
	}

	// ---------- セクション単位の is-visible（背景演出用） ----------
	function setupSectionVisibility() {
		var sections = document.querySelectorAll('.join');
		if (!('IntersectionObserver' in window)) return;
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) entry.target.classList.add('is-visible');
			});
		}, { threshold: 0.2 });
		sections.forEach(function (s) { io.observe(s); });
	}

	// ---------- 数値カウントアップ ----------
	function setupCountUp() {
		var els = document.querySelectorAll('[data-count]');
		if (!els.length) return;
		if (!('IntersectionObserver' in window)) {
			els.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
			return;
		}

		function animate(el) {
			var target = parseInt(el.getAttribute('data-count'), 10);
			if (isNaN(target)) return;
			var duration = target > 1000 ? 1600 : 1100;
			var start = performance.now();
			var startVal = 0;

			function step(now) {
				var p = Math.min(1, (now - start) / duration);
				// easeOutCubic
				var eased = 1 - Math.pow(1 - p, 3);
				var v = Math.floor(startVal + (target - startVal) * eased);
				el.textContent = v.toLocaleString('en-US');
				if (p < 1) requestAnimationFrame(step);
				else el.textContent = target.toLocaleString('en-US');
			}
			requestAnimationFrame(step);
		}

		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					animate(entry.target);
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.5 });

		els.forEach(function (el) { io.observe(el); });
	}

	// ---------- 内部リンクのスムーススクロール（ヘッダー高さ補正） ----------
	function setupSmoothAnchors() {
		var headerH = 72;
		document.querySelectorAll('a[href^="#"]').forEach(function (a) {
			a.addEventListener('click', function (e) {
				var id = a.getAttribute('href');
				if (!id || id === '#') return;
				var target = document.querySelector(id);
				if (!target) return;
				e.preventDefault();
				var top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
				window.scrollTo({ top: top, behavior: 'smooth' });
			});
		});
	}

	// ---------- 初期化 ----------
	function init() {
		setupHeroVideo();
		setupHeaderScroll();
		setupMobileMenu();
		setupReveal();
		setupSectionVisibility();
		setupCountUp();
		setupSmoothAnchors();

		// 画面リサイズで動画切替が必要になるケース
		var resizeTimer;
		window.addEventListener('resize', function () {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(setupHeroVideo, 250);
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
