/**
 * Vedha Navigation & Front-End Enhancements
 *
 * @package Vedha
 */

(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		// 1. Mobile Menu Drawer Toggle
		var mobileToggle = document.getElementById('vedha-mobile-toggle');
		var mobileNav    = document.getElementById('mobile-navigation');

		if (mobileToggle && mobileNav) {
			mobileToggle.addEventListener('click', function () {
				var isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
				mobileToggle.setAttribute('aria-expanded', !isExpanded);
				mobileNav.setAttribute('aria-hidden', isExpanded);
				mobileNav.classList.toggle('is-active');
			});
		}

		// 2. Header Search Drawer Toggle
		var searchToggle = document.getElementById('vedha-search-btn');
		var searchDrawer = document.getElementById('vedha-header-search');
		var searchInput  = document.getElementById('vedha-search-field');

		if (searchToggle && searchDrawer) {
			searchToggle.addEventListener('click', function () {
				searchDrawer.classList.toggle('is-active');
				if (searchDrawer.classList.contains('is-active') && searchInput) {
					searchInput.focus();
				}
			});
		}

		// 3. Accessible Escape Key to Dismiss Overlays
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' || e.key === 'Esc') {
				if (searchDrawer && searchDrawer.classList.contains('is-active')) {
					searchDrawer.classList.remove('is-active');
					searchToggle.focus();
				}
				if (mobileNav && mobileNav.classList.contains('is-active')) {
					mobileNav.classList.remove('is-active');
					mobileToggle.setAttribute('aria-expanded', 'false');
					mobileNav.setAttribute('aria-hidden', 'true');
					mobileToggle.focus();
				}
			}
		});

		// 4. Smooth Anchor Scrolling with Sticky Header Offset
		document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
			anchor.addEventListener('click', function (e) {
				var targetId = this.getAttribute('href');
				if (targetId === '#' || targetId === '#primary') return;

				var targetElement = document.querySelector(targetId);
				if (targetElement) {
					e.preventDefault();
					var headerOffset = 80;
					var elementPosition = targetElement.getBoundingClientRect().top;
					var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					});

					// If mobile drawer was open, close it
					if (mobileNav && mobileNav.classList.contains('is-active')) {
						mobileNav.classList.remove('is-active');
						mobileToggle.setAttribute('aria-expanded', 'false');
						mobileNav.setAttribute('aria-hidden', 'true');
					}
				}
			});
		});

		// 5. WooCommerce AJAX Add-to-Cart Live Counter Sync
		if (typeof jQuery !== 'undefined') {
			jQuery(document.body).on('added_to_cart', function (event, fragments, cart_hash) {
				var badge = document.getElementById('vedha-cart-badge');
				if (badge && fragments && fragments['span.vedha-cart-count']) {
					badge.outerHTML = fragments['span.vedha-cart-count'];
				}
			});
		}
	});
})();
