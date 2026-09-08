(function () {
	'use strict';

	var BRAND_LOGO_LIGHT = 'onekhusa-logo.svg';
	var BRAND_LOGO_DARK = 'onekhusa-alternate-logo.svg';
	var BRAND_LOGO_COLLAPSED_LIGHT = 'onekhusa-k-logo.svg';
	var BRAND_LOGO_COLLAPSED_DARK = 'onekhusa-alternate-k-logo.svg';
	var BRAND_LOGO_EXPANDED_PATTERN = /onekhusa-(alternate-)?logo\.svg/;
	var BRAND_LOGO_COLLAPSED_PATTERN = /onekhusa-(alternate-)?k-logo\.svg/;

	function resolveBrandLogoSrc(path, theme, collapsed) {
		var expanded = theme
			? path.replace(BRAND_LOGO_EXPANDED_PATTERN, theme === 'dark' ? BRAND_LOGO_DARK : BRAND_LOGO_LIGHT)
			: path;
		if (!collapsed) {
			return expanded;
		}
		var collapsedTarget = expanded.indexOf('alternate-logo.svg') !== -1
			? BRAND_LOGO_COLLAPSED_DARK
			: BRAND_LOGO_COLLAPSED_LIGHT;
		return expanded.replace(BRAND_LOGO_EXPANDED_PATTERN, collapsedTarget);
	}

	window.getCollapsedBrandLogoSrc = function (expandedSrc) {
		return resolveBrandLogoSrc(expandedSrc, null, true);
	};

	window.applyBrandLogoTheme = function (theme) {
		document.querySelectorAll('.app-sidebar-brand-logo, .auth-brand-image').forEach(function (img) {
			var expandedSrc = img.getAttribute('data-sidebar-logo-expanded');

			if (expandedSrc) {
				expandedSrc = resolveBrandLogoSrc(expandedSrc, theme, false);
				img.setAttribute('data-sidebar-logo-expanded', expandedSrc);

				var appShell = img.closest('.app-shell');
				var isCollapsed = appShell && appShell.classList.contains('is-sidebar-collapsed');

				img.setAttribute('src', resolveBrandLogoSrc(expandedSrc, null, isCollapsed));
				return;
			}

			var src = img.getAttribute('src');
			if (!src) {
				return;
			}

			if (BRAND_LOGO_COLLAPSED_PATTERN.test(src)) {
				var collapsedTarget = theme === 'dark' ? BRAND_LOGO_COLLAPSED_DARK : BRAND_LOGO_COLLAPSED_LIGHT;
				var fromCollapsed = theme === 'dark' ? BRAND_LOGO_COLLAPSED_LIGHT : BRAND_LOGO_COLLAPSED_DARK;
				if (src.indexOf(fromCollapsed) !== -1) {
					img.setAttribute('src', src.replace(fromCollapsed, collapsedTarget));
				}
				return;
			}

			var from = theme === 'dark' ? BRAND_LOGO_LIGHT : BRAND_LOGO_DARK;
			var to = theme === 'dark' ? BRAND_LOGO_DARK : BRAND_LOGO_LIGHT;
			if (src.indexOf(from) !== -1) {
				img.setAttribute('src', src.replace(from, to));
			}
		});
	};

	var storedTheme = localStorage.getItem('theme');
	var theme;

	if (storedTheme === 'light' || storedTheme === 'dark') {
		theme = storedTheme;
	} else if (storedTheme === 'auto') {
		theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		theme = 'dark';
	} else {
		theme = 'light';
	}

	document.documentElement.setAttribute('data-bs-theme', theme);
	window.applyBrandLogoTheme(theme);
})();
