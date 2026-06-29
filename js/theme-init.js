(function () {
	'use strict';

	var BRAND_LOGO_LIGHT = 'onekhusa-logo.svg';
	var BRAND_LOGO_DARK = 'onekhusa-alternate-logo.svg';

	window.applyBrandLogoTheme = function (theme) {
		var from = theme === 'dark' ? BRAND_LOGO_LIGHT : BRAND_LOGO_DARK;
		var to = theme === 'dark' ? BRAND_LOGO_DARK : BRAND_LOGO_LIGHT;
		document.querySelectorAll('.app-sidebar-brand-logo, .auth-brand-image').forEach(function (img) {
			var src = img.getAttribute('src');
			if (src && src.indexOf(from) !== -1) {
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
