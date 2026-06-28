/*!
 * 八幡山ブーメラン — Option C: Playful
 * Vanilla JS: メニュー開閉、Intersection Observer による reveal、
 * 動画のセットアップ、ヘッダー Scroll 影、Footer 年表示。
 */
(function () {
	'use strict';

	// ---------- DOM ready ----------
	function ready(fn) {
		if (document.readyState !== 'loading') fn();
		else document.addEventListener('DOMContentLoaded', fn);
	}

	ready(function () {

		// ---------- Footer year ----------
		var yearEl = document.getElementById('footer-year');
		if (yearEl) {
			var y = new Date().getFullYear();
			if (y > 2010) yearEl.textContent = '-' + y;
		}

		// ---------- Menu toggle ----------
		var toggle = document.querySelector('.menu-toggle');
		var nav = document.getElementById('menu');

		if (toggle && nav) {
			toggle.addEventListener('click', function () {
				var open = nav.classList.toggle('is-open');
				toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
				toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
			});

			// メニュー内のリンクをクリックしたら閉じる
			nav.addEventListener('click', function (e) {
				var link = e.target.closest('a');
				if (link) {
					nav.classList.remove('is-open');
					toggle.setAttribute('aria-expanded', 'false');
					toggle.setAttribute('aria-label', 'メニューを開く');
				}
			});

			// ESC で閉じる
			document.addEventListener('keydown', function (e) {
				if (e.key === 'Escape' && nav.classList.contains('is-open')) {
					nav.classList.remove('is-open');
					toggle.setAttribute('aria-expanded', 'false');
					toggle.focus();
				}
			});

			// 外側クリックで閉じる
			document.addEventListener('click', function (e) {
				if (!nav.classList.contains('is-open')) return;
				if (nav.contains(e.target) || toggle.contains(e.target)) return;
				nav.classList.remove('is-open');
				toggle.setAttribute('aria-expanded', 'false');
			});
		}

		// ---------- Header scroll shadow ----------
		var header = document.getElementById('header');
		if (header) {
			var lastScroll = -1;
			var onScroll = function () {
				var y = window.scrollY || window.pageYOffset;
				if (y === lastScroll) return;
				lastScroll = y;
				if (y > 20) header.classList.add('is-scrolled');
				else header.classList.remove('is-scrolled');
			};
			window.addEventListener('scroll', onScroll, { passive: true });
			onScroll();
		}

		// ---------- Reveal on scroll (Intersection Observer) ----------
		var revealTargets = document.querySelectorAll('[data-reveal]');
		if ('IntersectionObserver' in window && revealTargets.length) {
			var io = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry, i) {
					if (entry.isIntersecting) {
						// 同じセクション内の複数要素には少しずつディレイを掛ける
						entry.target.style.transitionDelay = (i % 4) * 80 + 'ms';
						entry.target.classList.add('is-visible');
						io.unobserve(entry.target);
					}
				});
			}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

			revealTargets.forEach(function (el) { io.observe(el); });
		} else {
			// fallback: すぐ表示
			revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
		}

		// ---------- Video: モバイル再生のサポート ----------
		// autoplay が一部端末でブロックされた場合、ユーザー操作で再生する
		var heroVideo = document.querySelector('.hero__video');
		if (heroVideo) {
			var tryPlay = function () {
				var p = heroVideo.play();
				if (p && typeof p.catch === 'function') {
					p.catch(function () { /* 無視: ポスター画像が表示される */ });
				}
			};
			tryPlay();
			// ユーザー操作で確実に開始
			var resume = function () {
				tryPlay();
				document.removeEventListener('touchstart', resume);
				document.removeEventListener('click', resume);
			};
			document.addEventListener('touchstart', resume, { passive: true, once: true });
			document.addEventListener('click', resume, { once: true });

			// prefers-reduced-motion が有効ならポーズ
			var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
			if (rm && rm.matches) heroVideo.pause();
		}

		// ---------- Smooth scroll (フォールバック) ----------
		// CSS の scroll-behavior に任せるが、ヘッダーオフセット用に micro-adjust
		document.querySelectorAll('a[href^="#"]').forEach(function (a) {
			a.addEventListener('click', function (e) {
				var href = a.getAttribute('href');
				if (!href || href === '#') return;
				var target = document.querySelector(href);
				if (!target) return;
				e.preventDefault();
				var top = target.getBoundingClientRect().top + window.scrollY - 16;
				window.scrollTo({ top: top, behavior: 'smooth' });
				// フォーカス移動 (アクセシビリティ)
				if (target.tabIndex < 0) target.setAttribute('tabindex', '-1');
				setTimeout(function () { target.focus({ preventScroll: true }); }, 400);
			});
		});

	});
})();
