/* Constants */
var AIR_DATEPICKER_SELECTOR = '.air-datepicker-field';
var INTL_TEL_INPUT_SELECTOR = '.intl-tel-input-field';
var AIR_DATEPICKER_LOCALE_EN = {
	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	today: 'Today',
	clear: 'Clear',
	dateFormat: 'MM/dd/yyyy',
	timeFormat: 'hh:mm aa',
	firstDay: 0
};
var AIR_DATEPICKER_OPTIONS = {
	autoClose: true,
	position: 'bottom left',
	locale: AIR_DATEPICKER_LOCALE_EN
};
var AIR_DATEPICKER_RANGE_OPTIONS = {
	autoClose: true,
	position: 'bottom right',
	range: true,
	multipleDatesSeparator: ' - ',
	dateFormat: 'd MMM, yyyy',
	locale: AIR_DATEPICKER_LOCALE_EN
};
/* Air Datepicker */
function initAirDatepickerFields(root) {
	if (typeof AirDatepicker === 'undefined') {
		return;
	}
	const scope = root || document;
	scope.querySelectorAll(AIR_DATEPICKER_SELECTOR).forEach(function (input) {
		if (input.classList.contains('air-datepicker-input')) {
			return;
		}
		var isRange = input.classList.contains('air-datepicker-range-field');
		var options = isRange
			? Object.assign({}, AIR_DATEPICKER_RANGE_OPTIONS)
			: Object.assign({}, AIR_DATEPICKER_OPTIONS);
		if (isRange) {
			var rangeStart = input.getAttribute('data-range-start');
			var rangeEnd = input.getAttribute('data-range-end');
			if (rangeStart && rangeEnd) {
				var startParts = rangeStart.split('-');
				var endParts = rangeEnd.split('-');
				options.selectedDates = [
					new Date(Number(startParts[0]), Number(startParts[1]) - 1, Number(startParts[2])),
					new Date(Number(endParts[0]), Number(endParts[1]) - 1, Number(endParts[2]))
				];
			}
		} else if (input.classList.contains('air-datepicker-end')) {
			options.position = 'bottom right';
		}
		new AirDatepicker(input, options);
	});
}

/* Base stepper */
function initBaseStepper() {
	var $steppers = $('.base-stepper');
	if (!$steppers.length) {
		return;
	}

	$steppers.each(function () {
		var $stepper = $(this);
		var currentStep = 1;
		var $items = $stepper.find('.step-item');
		var totalSteps = $items.length;
		var $panels = $stepper.find('.base-stepper-panel');
		var $prev = $stepper.find('.base-stepper-prev');
		var $next = $stepper.find('.base-stepper-next');

		if (!totalSteps || !$prev.length || !$next.length) {
			return;
		}

		$stepper.find('form').on('submit', function (e) {
			e.preventDefault();
		});

		function updateStepper() {
			$items.each(function (index) {
				var step = index + 1;
				var $item = $(this);
				$item.removeClass('completed current');
				if (step < currentStep) {
					$item.addClass('completed');
				} else if (step === currentStep) {
					$item.addClass('current');
				}
			});

			$panels.each(function () {
				var step = parseInt($(this).attr('data-step'), 10);
				$(this).prop('hidden', step !== currentStep);
			});

			$prev.prop('hidden', currentStep === 1);
			$next.prop('disabled', currentStep === totalSteps);
		}

		$prev.on('click', function () {
			if (currentStep > 1) {
				currentStep -= 1;
				updateStepper();
			}
		});

		$next.on('click', function () {
			if (currentStep < totalSteps) {
				currentStep += 1;
				updateStepper();
			}
		});

		updateStepper();
	});
}

/* Theme */
function initThemeSwitcher() {
	var $themeSwitcher = $('#bd-theme');
	if (!$themeSwitcher.length) {
		return;
	}

	function getStoredTheme() {
		return localStorage.getItem('theme');
	}

	function setStoredTheme(theme) {
		localStorage.setItem('theme', theme);
	}

	function getPreferredTheme() {
		var storedTheme = getStoredTheme();
		if (storedTheme === 'light' || storedTheme === 'dark') {
			return storedTheme;
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function setTheme(theme) {
		document.documentElement.setAttribute('data-bs-theme', theme);
		window.applyBrandLogoTheme(theme);
	}

	function showActiveTheme(theme, focus) {
		var isDark = theme === 'dark';
		var activeIcon = isDark ? 'moon' : 'sun';
		var label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

		var $activeIcon = $themeSwitcher.find('.theme-icon-active');
		if ($activeIcon.length) {
			$activeIcon.attr('data-lucide', activeIcon);
			if (typeof lucide !== 'undefined') {
				lucide.createIcons({ nodes: [$activeIcon.get(0)] });
			}
		}

		$themeSwitcher.attr('aria-label', label).attr('aria-pressed', isDark);

		if (focus) {
			$themeSwitcher.trigger('focus');
		}
	}

	setTheme(getPreferredTheme());
	showActiveTheme(getPreferredTheme());

	$themeSwitcher.on('click', function () {
		var current = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
		var next = current === 'dark' ? 'light' : 'dark';
		setStoredTheme(next);
		setTheme(next);
		showActiveTheme(next, true);
	});
}


/* Intl tel input */
function initIntlTelInputFields(root) {
	if (typeof window.intlTelInput === 'undefined') {
		return;
	}
	var scope = root || document;
	scope.querySelectorAll(INTL_TEL_INPUT_SELECTOR).forEach(function (input) {
		if (input.dataset.intlTelInputInit === 'true') {
			return;
		}
		window.intlTelInput(input, {
			separateDialCode: true,
			initialCountry: 'mw'
		});
		input.dataset.intlTelInputInit = 'true';
	});
}

/* App shell */
function initMainNavEnvSync() {
	if (!document.getElementById('main-nav-env-sandbox') || !document.getElementById('offcanvas-main-nav-env-sandbox')) {
		return;
	}
	$(document).on('change', 'input[name="main-nav-env"], input[name="main-nav-env-offcanvas"]', function () {
		if (!this.checked) {
			return;
		}
		const isLive = this.id.endsWith('live');
		if (this.name === 'main-nav-env') {
			document.getElementById(isLive ? 'offcanvas-main-nav-env-live' : 'offcanvas-main-nav-env-sandbox').checked = true;
		} else {
			document.getElementById(isLive ? 'main-nav-env-live' : 'main-nav-env-sandbox').checked = true;
		}
	});
}

function initMainNavNotifications() {
	const $menu = $('.app-main-nav-notifications-menu');
	if (!$menu.length) {
		return;
	}

	function syncUnreadUi() {
		const unread = $menu.find('.app-main-nav-notification-entry:not(.is-read)').length;
		$('.app-main-nav-notifications-dot').toggleClass('is-hidden', unread === 0);
		$menu.toggleClass('app-main-nav-notifications-menu--all-read', unread === 0);
	}

	$menu.on('click', '.app-main-nav-notifications-mark-all-read', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$menu.find('.app-main-nav-notification-entry').addClass('is-read');
		syncUnreadUi();
	});

	syncUnreadUi();
}

/* Disbursements — funds transfer */
function initFundsTransfer() {
	const modalEl = document.getElementById('fundsDestinationModal');
	const continueBtn = document.getElementById('fundsDestinationContinueBtn');
	const offcanvasEl = document.getElementById('offcanvasFundsTransfer');
	const titleEl = document.getElementById('offcanvasFundsTransferTitle');
	if (!modalEl || !continueBtn || !offcanvasEl || !titleEl || typeof bootstrap === 'undefined') {
		return;
	}

	const destinationTitles = {
		fundsDestinationOrganisation: 'Within My Organisation',
		fundsDestinationOnekhusa: 'To OneKhusa Account',
		fundsDestinationExternal: 'To Bank Account/Mobile Wallet'
	};
	const destinationBeneficiaryKeys = {
		fundsDestinationOrganisation: 'organisation',
		fundsDestinationOnekhusa: 'onekhusa',
		fundsDestinationExternal: 'external'
	};
	const sourceRefField = document.getElementById('fundsTransferSourceRefField');
	const beneficiaryPanels = offcanvasEl.querySelectorAll('[data-funds-beneficiary]');
	const transferForm = document.getElementById('offcanvas-funds-transfer-form');

	function syncFundsTransferBeneficiaryFields(activeBeneficiaryKey) {
		beneficiaryPanels.forEach(function (panel) {
			const isActive = panel.getAttribute('data-funds-beneficiary') === activeBeneficiaryKey;
			panel.hidden = !isActive;
			panel.querySelectorAll('input, select, textarea').forEach(function (field) {
				if (isActive) {
					field.disabled = false;
					if (field.dataset.fundsRequired === 'true') {
						field.required = true;
					}
				} else {
					if (field.required) {
						field.dataset.fundsRequired = 'true';
					}
					field.required = false;
					field.disabled = true;
				}
			});
		});
	}

	modalEl.querySelectorAll('input[name="fundsDestination"]').forEach(function (radio) {
		radio.addEventListener('change', function () {
			continueBtn.disabled = false;
		});
	});

	modalEl.addEventListener('hidden.bs.modal', function () {
		continueBtn.disabled = true;
		modalEl.querySelectorAll('input[name="fundsDestination"]').forEach(function (radio) {
			radio.checked = false;
		});
	});

	continueBtn.addEventListener('click', function () {
		const selected = modalEl.querySelector('input[name="fundsDestination"]:checked');
		if (!selected) {
			return;
		}
		const beneficiaryKey = destinationBeneficiaryKeys[selected.id];
		titleEl.textContent = destinationTitles[selected.id] || 'Transfer details';
		syncFundsTransferBeneficiaryFields(beneficiaryKey);
		if (sourceRefField) {
			sourceRefField.hidden = selected.id !== 'fundsDestinationExternal';
		}
		bootstrap.Modal.getOrCreateInstance(modalEl).hide();
		bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl).show();
	});

	offcanvasEl.addEventListener('hidden.bs.offcanvas', function () {
		syncFundsTransferBeneficiaryFields(null);
		if (transferForm) {
			transferForm.reset();
		}
	});

	syncFundsTransferBeneficiaryFields(null);
}

function initDisbursementSuccessRouting() {
	var forms = document.querySelectorAll(
		'#offcanvas-single-add-form, #offcanvas-funds-transfer-form, #offcanvas-batch-add-form'
	);
	if (!forms.length) {
		return;
	}

	function getFieldValue(form, selectors) {
		for (var i = 0; i < selectors.length; i += 1) {
			var field = form.querySelector(selectors[i]);
			if (!field || field.disabled) {
				continue;
			}
			if (field.tagName === 'SELECT') {
				return field.options[field.selectedIndex] ? field.options[field.selectedIndex].text.trim() : '';
			}
			var value = field.value ? field.value.trim() : '';
			if (value) {
				return value;
			}
		}
		return '';
	}

	forms.forEach(function (form) {
		form.addEventListener('submit', function (event) {
			event.preventDefault();

			var operation = form.getAttribute('data-send-success-operation') || 'Disbursement';
			var back = form.getAttribute('data-send-success-back') || './single.html';
			var beneficiary = getFieldValue(form, [
				'#offcanvas-single-beneficiary-name',
				'#fundsTransferExternalBeneficiaryName',
				'#fundsTransferOnekhusaBeneficiaryName',
				'#fundsTransferOrgBeneficiaryName'
			]) || 'Batch payout';
			var amount = getFieldValue(form, [
				'#offcanvas-single-amount',
				'#fundsTransferAmount'
			]) || 'N/A';
			var reference = getFieldValue(form, [
				'#offcanvas-single-transaction-reference',
				'#fundsTransferTransactionRef',
				'#offcanvas-single-source-reference',
				'#fundsTransferSourceRef'
			]);
			if (!reference) {
				reference = 'REF-' + String(Date.now());
			}

			var params = new URLSearchParams();
			params.set('operation', operation);
			params.set('beneficiary', beneficiary);
			params.set('amount', amount);
			params.set('reference', reference);
			params.set('timestamp', new Date().toLocaleString());
			params.set('back', back);

			window.location.href = './send-success.html?' + params.toString();
		});
	});
}

function initSendSuccessPage() {
	var successRoot = document.getElementById('sendSuccessPage');
	if (!successRoot) {
		return;
	}

	var params = new URLSearchParams(window.location.search);
	var fieldValues = {
		operation: params.get('operation') || 'Disbursement',
		beneficiary: params.get('beneficiary') || '-',
		amount: params.get('amount') || '-',
		reference: params.get('reference') || '-',
		timestamp: params.get('timestamp') || '-'
	};
	Object.keys(fieldValues).forEach(function (field) {
		document.querySelectorAll('[data-send-success-field="' + field + '"]').forEach(function (target) {
			target.textContent = fieldValues[field];
		});
	});

	var backHref = params.get('back');
	var backLink = document.querySelector('[data-send-success-back]');
	if (backHref && backLink) {
		backLink.setAttribute('href', backHref);
	}

	var subjectInput = document.getElementById('open-dispute-subject');
	if (subjectInput && fieldValues.reference !== '-') {
		subjectInput.value = 'Transaction issue for ' + fieldValues.reference;
	}
	var commentInput = document.getElementById('open-dispute-comment');
	if (commentInput) {
		commentInput.value = 'Operation: ' + fieldValues.operation + '. Beneficiary: ' + fieldValues.beneficiary + '. Amount: ' + fieldValues.amount + '.';
	}
}

function initDisputesIndexFlow() {
	var linkOffcanvasEl = document.getElementById('offcanvasLinkDisputeTransaction');
	if (!linkOffcanvasEl) {
		return;
	}

	var disputeOffcanvasEl = document.getElementById('offcanvasOpenDispute');
	var linkOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(linkOffcanvasEl);
	var disputeOffcanvas = disputeOffcanvasEl
		? bootstrap.Offcanvas.getOrCreateInstance(disputeOffcanvasEl)
		: null;

	document.querySelectorAll('[data-dispute-report-trigger]').forEach(function (trigger) {
		trigger.addEventListener('click', function (event) {
			event.preventDefault();
			linkOffcanvas.show();
		});
	});

	var continueBtn = document.getElementById('disputeLinkTransactionContinue');
	var refInput = document.getElementById('dispute-link-reference');
	var linkedSection = document.getElementById('offcanvas-dispute-linked-transaction');
	var linkedRef = document.getElementById('open-dispute-linked-reference');
	var subjectInput = document.getElementById('open-dispute-subject');
	var commentInput = document.getElementById('open-dispute-comment');

	function prefillDisputeFromReference(reference) {
		if (linkedRef) {
			linkedRef.textContent = reference;
		}
		if (linkedSection) {
			linkedSection.hidden = false;
		}
		if (subjectInput) {
			subjectInput.value = 'Transaction issue for ' + reference;
		}
		if (commentInput) {
			commentInput.value = 'Transaction reference: ' + reference + '.';
		}
	}

	function resetDisputeForm() {
		if (linkedSection) {
			linkedSection.hidden = true;
		}
		if (refInput) {
			refInput.value = '';
		}
		if (subjectInput) {
			subjectInput.value = '';
		}
		if (commentInput) {
			commentInput.value = '';
		}
	}

	if (continueBtn) {
		continueBtn.addEventListener('click', function () {
			var reference = refInput ? refInput.value.trim() : '';
			if (!reference) {
				if (refInput) {
					refInput.focus();
				}
				return;
			}

			prefillDisputeFromReference(reference);
			linkOffcanvasEl.addEventListener('hidden.bs.offcanvas', function openDisputeOffcanvas() {
				linkOffcanvasEl.removeEventListener('hidden.bs.offcanvas', openDisputeOffcanvas);
				if (disputeOffcanvas) {
					disputeOffcanvas.show();
				}
				if (typeof lucide !== 'undefined') {
					lucide.createIcons();
				}
			});
			linkOffcanvas.hide();
		});
	}

	document.querySelectorAll('[data-dispute-change-transaction]').forEach(function (trigger) {
		trigger.addEventListener('click', function () {
			if (disputeOffcanvas) {
				disputeOffcanvas.hide();
			}
			disputeOffcanvasEl.addEventListener('hidden.bs.offcanvas', function reopenLinkOffcanvas() {
				disputeOffcanvasEl.removeEventListener('hidden.bs.offcanvas', reopenLinkOffcanvas);
				linkOffcanvas.show();
				if (refInput) {
					refInput.focus();
				}
			});
		});
	});

	if (disputeOffcanvasEl) {
		disputeOffcanvasEl.addEventListener('hidden.bs.offcanvas', resetDisputeForm);
	}
}

function initMerchantDetailContentsNav() {
	var navLinks = document.querySelectorAll('[data-merchant-detail-nav]');
	if (!navLinks.length) {
		return;
	}

	var scrollRoot = document.querySelector('.app-content');
	var sections = document.querySelectorAll('.merchant-detail-anchor');
	if (!scrollRoot || !sections.length) {
		return;
	}

	function setActive(id) {
		if (!id) {
			return;
		}
		navLinks.forEach(function (link) {
			var isActive = link.getAttribute('data-merchant-detail-nav') === id;
			link.classList.toggle('is-active', isActive);
			if (isActive) {
				link.setAttribute('aria-current', 'page');
			} else {
				link.removeAttribute('aria-current');
			}
		});
	}

	var visibleSections = new Set();

	var observer = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					visibleSections.add(entry.target.id);
				} else {
					visibleSections.delete(entry.target.id);
				}
			});

			if (!visibleSections.size) {
				return;
			}

			var activeId = null;
			sections.forEach(function (section) {
				if (visibleSections.has(section.id)) {
					activeId = section.id;
				}
			});

			setActive(activeId);
		},
		{
			root: scrollRoot,
			rootMargin: '-5rem 0px -55% 0px',
			threshold: 0
		}
	);

	sections.forEach(function (section) {
		observer.observe(section);
	});

	navLinks.forEach(function (link) {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			var id = link.getAttribute('data-merchant-detail-nav');
			var target = id ? document.getElementById(id) : null;
			if (target) {
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				setActive(id);
			}
		});
	});
}

function initAdminDashboardNav() {
	var tabs = document.querySelectorAll('[data-admin-dashboard-tab]');
	if (!tabs.length) {
		return;
	}

	var panels = document.querySelectorAll('[data-admin-dashboard-panel]');

	function activateTab(tab) {
		var panelId = tab.getAttribute('aria-controls');

		tabs.forEach(function (item) {
			var isActive = item === tab;
			item.classList.toggle('is-active', isActive);
			item.setAttribute('aria-selected', isActive ? 'true' : 'false');
		});

		panels.forEach(function (panel) {
			var isVisible = panel.id === panelId;
			panel.hidden = !isVisible;
		});
	}

	var initialTab = document.querySelector('[data-admin-dashboard-tab].is-active') || tabs[0];
	if (initialTab) {
		activateTab(initialTab);
	}

	tabs.forEach(function (tab) {
		tab.addEventListener('click', function () {
			activateTab(tab);
		});
	});
}

function initApplicationDetailTabs() {
	var tabNav = document.querySelector('.application-tab-nav');
	if (!tabNav) {
		return;
	}

	var tabs = tabNav.querySelectorAll('.application-tab-link');
	var panels = document.querySelectorAll('.application-tab-panel');

	function activateTab(tabKey) {
		var targetTab = tabNav.querySelector('[data-application-tab="' + tabKey + '"]');
		if (!targetTab) {
			return;
		}

		var panelId = targetTab.getAttribute('aria-controls');

		tabs.forEach(function (item) {
			var isActive = item === targetTab;
			item.classList.toggle('is-active', isActive);
			item.setAttribute('aria-selected', isActive ? 'true' : 'false');
		});

		panels.forEach(function (panel) {
			var isVisible = panel.id === panelId;
			panel.hidden = !isVisible;
		});
	}

	var initialTab = tabNav.querySelector('.application-tab-link.is-active') || tabs[0];
	if (initialTab) {
		activateTab(initialTab.getAttribute('data-application-tab'));
	}

	tabs.forEach(function (tab) {
		tab.addEventListener('click', function () {
			activateTab(tab.getAttribute('data-application-tab'));
		});
	});

	var eventsButton = document.getElementById('applicationFloatingEvents');
	if (eventsButton) {
		eventsButton.addEventListener('click', function () {
			activateTab('events');
		});
	}
}

function getChartTheme() {
	var root = getComputedStyle(document.documentElement);

	function token(name) {
		return root.getPropertyValue(name).trim();
	}

	return {
		text: token('--text-gray-700'),
		border: token('--text-gray-200'),
		fills: [
			token('--chart-fill-emphasis'),
			token('--chart-fill-mid'),
			token('--chart-fill-soft')
		],
		tooltip: {
			background: token('--color-white'),
			title: token('--text-gray-900'),
			body: token('--text-gray-700'),
			border: token('--text-gray-200')
		}
	};
}

var adminOrganizationsChartLegendLabels = [
	'Total active organizations',
	'Total suspended organizations',
	'Total blacklisted organizations'
];

var adminApplicationsChartLegendLabels = [
	'Total reviewed applications',
	'Total approved applications',
	'Total rejected applications'
];

var adminDisbursementsChartLegendLabels = [
	'Total number of disbursements for the current month',
	'Total transactions processed for the current month',
	'Total transactions processed to-date'
];

function buildAdminStatusDoughnutOptions(theme, legendLabels) {
	return {
		maintainAspectRatio: false,
		cutout: '60%',
		plugins: {
			legend: {
				position: 'right',
				align: 'center',
				labels: {
					color: theme.text,
					usePointStyle: true,
					pointStyle: 'circle',
					boxWidth: 8,
					boxHeight: 8,
					padding: 14,
					font: {
						family: 'Inter, sans-serif',
						size: 12
					},
					generateLabels: function (chart) {
						var dataset = chart.data.datasets[0];
						var labelColor = chart.options.plugins.legend.labels.color;

						return chart.data.labels.map(function (label, index) {
							return {
								text: legendLabels[index],
								fillStyle: dataset.backgroundColor[index],
								strokeStyle: dataset.backgroundColor[index],
								fontColor: labelColor,
								lineWidth: 0,
								hidden: !chart.getDataVisibility(index),
								index: index
							};
						});
					}
				}
			},
			tooltip: {
				backgroundColor: theme.tooltip.background,
				titleColor: theme.tooltip.title,
				bodyColor: theme.tooltip.body,
				borderColor: theme.tooltip.border,
				borderWidth: 1,
				padding: 12,
				cornerRadius: 8,
				displayColors: false,
				titleFont: {
					family: 'Inter, sans-serif',
					size: 14,
					weight: '600'
				},
				bodyFont: {
					family: 'Inter, sans-serif',
					size: 13
				},
				callbacks: {
					title: function (items) {
						return items.length ? items[0].label : '';
					},
					label: function (context) {
						return context.label + ': ' + context.parsed;
					}
				}
			}
		}
	};
}

function applyAdminStatusChartTheme(chart) {
	var theme = getChartTheme();

	chart.data.datasets[0].backgroundColor = theme.fills;
	chart.options.plugins.legend.labels.color = theme.text;
	chart.options.plugins.tooltip.backgroundColor = theme.tooltip.background;
	chart.options.plugins.tooltip.titleColor = theme.tooltip.title;
	chart.options.plugins.tooltip.bodyColor = theme.tooltip.body;
	chart.options.plugins.tooltip.borderColor = theme.tooltip.border;
	chart.update();
}

function refreshChartTheme() {
	document.querySelectorAll('[data-chart="admin-status"]').forEach(function (canvas) {
		if (canvas.chartInstance) {
			applyAdminStatusChartTheme(canvas.chartInstance);
		}
	});

	document.querySelectorAll('[data-chart="admin-bar"]').forEach(function (canvas) {
		if (canvas.chartInstance) {
			applyAdminBarChartTheme(canvas.chartInstance);
		}
	});
}

function buildAdminBarChartOptions(theme) {
	return {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				backgroundColor: theme.tooltip.background,
				titleColor: theme.tooltip.title,
				bodyColor: theme.tooltip.body,
				borderColor: theme.tooltip.border,
				borderWidth: 1,
				padding: 12,
				cornerRadius: 8,
				displayColors: false,
				titleFont: {
					family: 'Inter, sans-serif',
					size: 14,
					weight: '600'
				},
				bodyFont: {
					family: 'Inter, sans-serif',
					size: 13
				},
				callbacks: {
					title: function (items) {
						return items.length ? items[0].label : '';
					},
					label: function (context) {
						var value = context.parsed.y;
						return 'MWK ' + value.toLocaleString('en-US');
					}
				}
			}
		},
		scales: {
			x: {
				grid: {
					display: false
				},
				ticks: {
					color: theme.text,
					font: {
						family: 'Inter, sans-serif',
						size: 12
					}
				},
				border: {
					color: theme.border
				}
			},
			y: {
				grid: {
					color: theme.border
				},
				ticks: {
					color: theme.text,
					font: {
						family: 'Inter, sans-serif',
						size: 12
					},
					callback: function (value) {
						if (value >= 1000000) {
							return (value / 1000000) + 'M';
						}

						if (value >= 1000) {
							return (value / 1000) + 'K';
						}

						return value;
					}
				},
				border: {
					color: theme.border
				}
			}
		}
	};
}

function applyAdminBarChartTheme(chart) {
	var theme = getChartTheme();

	chart.data.datasets[0].backgroundColor = theme.fills[0];
	chart.options.plugins.tooltip.backgroundColor = theme.tooltip.background;
	chart.options.plugins.tooltip.titleColor = theme.tooltip.title;
	chart.options.plugins.tooltip.bodyColor = theme.tooltip.body;
	chart.options.plugins.tooltip.borderColor = theme.tooltip.border;
	chart.options.scales.x.ticks.color = theme.text;
	chart.options.scales.x.border.color = theme.border;
	chart.options.scales.y.ticks.color = theme.text;
	chart.options.scales.y.grid.color = theme.border;
	chart.options.scales.y.border.color = theme.border;
	chart.update();
}

function initAdminBarChart(canvasId, labels, data, datasetLabel) {
	var canvas = document.getElementById(canvasId);
	if (!canvas || typeof Chart === 'undefined') {
		return;
	}

	var theme = getChartTheme();

	canvas.chartInstance = new Chart(canvas, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: datasetLabel,
				data: data,
				backgroundColor: theme.fills[0],
				borderWidth: 0,
				borderRadius: 4
			}]
		},
		options: buildAdminBarChartOptions(theme)
	});
}

var adminAnalyticsMonthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

function initAdminDisputesAnalyticsChart() {
	initAdminBarChart(
		'adminDisputesAmountChart',
		adminAnalyticsMonthLabels,
		[1800000, 2100000, 1900000, 2400000, 2000000, 2250000],
		'Total amount of disputes'
	);
}

function initAdminRefundsAnalyticsChart() {
	initAdminBarChart(
		'adminRefundsAmountChart',
		adminAnalyticsMonthLabels,
		[3200000, 3800000, 3500000, 4100000, 3900000, 3950000],
		'Total amount of approved refunds'
	);
}

function initAdminDisbursementsAnalyticsChart() {
	initAdminBarChart(
		'adminDisbursementsAmountChart',
		adminAnalyticsMonthLabels,
		[38000000, 42000000, 45000000, 48000000, 44000000, 52400000],
		'Total amount of disbursements'
	);
}

function initMerchantDisbursementsAnalyticsChart() {
	initAdminBarChart(
		'merchantDisbursementsAmountChart',
		adminAnalyticsMonthLabels,
		[8200000, 9400000, 10100000, 11800000, 10600000, 12480200],
		'Total amount of disbursements'
	);
}

function initMerchantCollectionsAnalyticsChart() {
	initAdminBarChart(
		'merchantCollectionsAmountChart',
		adminAnalyticsMonthLabels,
		[6400000, 7100000, 7800000, 8200000, 8600000, 8902450],
		'Total amount collected'
	);
}

function initAdminStatusChart(canvasId, data, legendLabels, sliceLabels) {
	var canvas = document.getElementById(canvasId);
	if (!canvas || typeof Chart === 'undefined') {
		return;
	}

	var theme = getChartTheme();
	var labels = sliceLabels || ['Active', 'Suspended', 'Blacklisted'];

	canvas.chartInstance = new Chart(canvas, {
		type: 'doughnut',
		data: {
			labels: labels,
			datasets: [{
				data: data,
				backgroundColor: theme.fills,
				borderWidth: 0
			}]
		},
		options: buildAdminStatusDoughnutOptions(theme, legendLabels)
	});
}

function initAdminOrganizationsChart() {
	initAdminStatusChart('adminOrgsStatusChart', [47, 3, 1], adminOrganizationsChartLegendLabels);
}

function initAdminApplicationsChart() {
	initAdminStatusChart(
		'adminApplicationsStatusChart',
		[3020, 1000, 316],
		adminApplicationsChartLegendLabels,
		['Reviewed', 'Approved', 'Rejected']
	);
}

function initAdminDisbursementsChart() {
	initAdminStatusChart(
		'adminDisbursementsChart',
		[23020, 16000, 23020],
		adminDisbursementsChartLegendLabels,
		['Disbursements (month)', 'Transactions (month)', 'Transactions (to date)']
	);
}

function initChartThemeRefresh() {
	var themeSwitcher = document.getElementById('bd-theme');
	if (!themeSwitcher) {
		return;
	}

	themeSwitcher.addEventListener('click', function () {
		window.requestAnimationFrame(function () {
			refreshChartTheme();
		});
	});
}

var USER_AVATAR_PALETTE = [
	'#0078D4',
	'#2A9D8F',
	'#264653',
	'#4A1E9E',
	'#004700',
	'#7D6200',
	'#8F0029',
	'#1F2937'
];

function hashString(str) {
	var hash = 0;
	var i;

	for (i = 0; i < str.length; i += 1) {
		hash = ((hash << 5) - hash) + str.charCodeAt(i);
		hash |= 0;
	}

	return Math.abs(hash);
}

function getAvatarPaletteColor(hash) {
	return USER_AVATAR_PALETTE[hash % USER_AVATAR_PALETTE.length];
}

function getContrastColor(hex) {
	var normalized = hex.replace('#', '');
	var r = parseInt(normalized.slice(0, 2), 16);
	var g = parseInt(normalized.slice(2, 4), 16);
	var b = parseInt(normalized.slice(4, 6), 16);
	var luminance = (0.299 * r) + (0.587 * g) + (0.114 * b);

	return luminance > 150 ? '#111827' : '#FFFFFF';
}

function getInitialsFromName(name) {
	var parts = name.trim().split(/\s+/).filter(Boolean);

	if (!parts.length) {
		return '';
	}

	if (parts.length === 1) {
		return parts[0].slice(0, 2).toUpperCase();
	}

	return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function getFirstName(fullName) {
	var parts = fullName.trim().split(/\s+/).filter(Boolean);

	return parts.length ? parts[0] : '';
}

function getTimeGreeting(hour) {
	if (hour < 12) {
		return 'Good morning';
	}

	if (hour < 17) {
		return 'Good afternoon';
	}

	return 'Good evening';
}

function initUserAvatars() {
	document.querySelectorAll('.app-sidebar-user').forEach(function (userBlock) {
		var nameEl = userBlock.querySelector('.app-sidebar-user-name');
		var avatarEl = userBlock.querySelector('.app-sidebar-user-avatar');
		var fullName;
		var bgColor;
		var hash;

		if (!nameEl || !avatarEl) {
			return;
		}

		fullName = nameEl.textContent.trim();

		if (!fullName) {
			return;
		}

		hash = hashString(fullName);
		bgColor = getAvatarPaletteColor(hash);
		avatarEl.textContent = getInitialsFromName(fullName);
		avatarEl.style.setProperty('--user-avatar-bg', bgColor);
		avatarEl.style.setProperty('--user-avatar-color', getContrastColor(bgColor));
	});
}

function initDashboardGreetings() {
	var nameEl = document.querySelector('.app-sidebar-user-name');
	var firstName = nameEl ? getFirstName(nameEl.textContent) : '';
	var greeting = getTimeGreeting(new Date().getHours());

	document.querySelectorAll('.app-dashboard-greeting').forEach(function (greetingEl) {
		greetingEl.textContent = firstName ? greeting + ', ' + firstName : greeting;
	});
}

function initBootstrapToastTriggers() {
	$(document).on('click', '[data-bs-toggle="toast"]', function () {
		var target = this.getAttribute('data-bs-target');
		var toastEl;

		if (!target || typeof bootstrap === 'undefined') {
			return;
		}

		toastEl = document.querySelector(target);
		if (toastEl) {
			bootstrap.Toast.getOrCreateInstance(toastEl).show();
		}
	});
}

function initProcessingButtons() {
	$(document).on('click', '[data-action-btn]:not(.button-loading)', function () {
		var $btn = $(this).addClass('button-loading');
		var label = $btn.html();
		$btn.html('Processing <i data-lucide="loader-circle"></i>');
		lucide.createIcons({ nodes: [$btn[0]] });
		setTimeout(function () { $btn.removeClass('button-loading').html(label); }, 1800);
	});
}

function initCloseDisputeRefundToggle() {
	var $switch = $('#close-dispute-refund-merchant');
	var $select = $('#close-dispute-charge-holder');

	if (!$switch.length || !$select.length) {
		return;
	}

	function syncChargeHolderState() {
		$select.prop('disabled', !$switch.is(':checked'));
	}

	$switch.on('change', syncChargeHolderState);
	syncChargeHolderState();
}

function initConnectorLogoPreview() {
	var input = document.querySelector('#new-connector-logo');
	var preview = document.querySelector('#new-connector-logo-preview');
	var placeholder = document.querySelector('#new-connector-logo-placeholder');

	if (!input || !preview) {
		return;
	}

	input.addEventListener('change', function () {
		var file = input.files && input.files[0];
		if (!file) {
			return;
		}
		preview.src = URL.createObjectURL(file);
		preview.classList.remove('d-none');
		if (placeholder) {
			placeholder.classList.add('d-none');
		}
	});
}

/* Pitch tour (Driver.js) */
/* A guided journey across pages: Home (intro + theme), then the design system
   reference (components, iconology), then the Merchant and Admin portals. State
   is carried across page loads because Driver.js only highlights the current page. */
var PITCH_TOUR_SEEN_KEY = 'khusaPitchTourSeen';
var PITCH_TOUR_RESUME_KEY = 'khusaPitchTourResume';
var PITCH_TOUR_TOTAL_STEPS = 9;
var PITCH_TOUR_HOME_PATH = '/index.html';
var PITCH_TOUR_COMPONENTS_PATH = '/components.html';
var PITCH_TOUR_ICONOLOGY_PATH = '/iconology.html';
var PITCH_TOUR_MERCHANT_PATH = '/pages/merchant-portal/index.html';
var PITCH_TOUR_ADMIN_PATH = '/pages/admin-portal/index.html';

function pitchTourStepTitle(step, label) {
	return '#' + step + ' of ' + PITCH_TOUR_TOTAL_STEPS + ': ' + label;
}

function finishPitchTour(driverObj) {
	localStorage.setItem(PITCH_TOUR_SEEN_KEY, '1');
	sessionStorage.removeItem(PITCH_TOUR_RESUME_KEY);
	if (driverObj) {
		driverObj.destroy();
	}
}

function navigatePitchTour(driverObj, nextPath) {
	if (driverObj) {
		driverObj.destroy();
	}
	sessionStorage.setItem(PITCH_TOUR_RESUME_KEY, '1');
	window.location.href = nextPath;
}

function getPitchTourPage() {
	var path = location.pathname;

	if (/\/pages\/merchant-portal\/(index\.html)?$/.test(path)) {
		return 'merchant';
	}

	if (/\/pages\/admin-portal\/(index\.html)?$/.test(path)) {
		return 'admin';
	}

	if (path.endsWith('/components.html')) {
		return 'components';
	}

	if (path.endsWith('/iconology.html')) {
		return 'iconology';
	}

	var trimmed = path.replace(/\/$/, '') || '/';
	if (trimmed === '/' || trimmed.endsWith('/index.html')) {
		return 'home';
	}

	return null;
}

function getPitchTourSteps() {
	return {
		home: [
			{
				popover: {
					title: pitchTourStepTitle(1, 'A refreshed Khusa experience'),
					description: 'A short tour of the redesign: full dark mode, reusable components, a unified icon set, and a responsive layout.',
					align: 'center'
				}
			},
			{
				element: '#bd-theme',
				popover: {
					title: pitchTourStepTitle(2, 'Light and dark, built in'),
					description: 'Switch themes from here. Try dark mode now: every screen, chart, and component adapts automatically. Next, the reusable components.',
					side: 'bottom',
					align: 'end',
					doneBtnText: 'See components',
					onNextClick: function (element, step, options) {
						navigatePitchTour(options.driver, PITCH_TOUR_COMPONENTS_PATH);
					}
				}
			}
		],
		components: [
			{
				element: function () { return document.querySelectorAll('.component-card')[0]; },
				popover: {
					title: pitchTourStepTitle(3, 'Buttons, one set of styles'),
					description: 'This is the shared component library. Buttons come in one set of sizes, colors, and states, so every call to action stays consistent.',
					side: 'bottom',
					align: 'start'
				}
			},
			{
				element: function () { return document.querySelectorAll('.component-card')[1]; },
				popover: {
					title: pitchTourStepTitle(4, 'Badges for status'),
					description: 'The same badge styles signal status across disbursements, disputes, users, and more.',
					side: 'bottom',
					align: 'start'
				}
			},
			{
				element: function () { return document.querySelectorAll('.component-card')[8]; },
				popover: {
					title: pitchTourStepTitle(5, 'Forms and inputs'),
					description: 'Inputs, selects, and validation share one look and spacing on every screen.',
					side: 'top',
					align: 'start'
				}
			},
			{
				element: function () { return document.querySelectorAll('.component-card')[10]; },
				popover: {
					title: pitchTourStepTitle(6, 'Tables for data'),
					description: 'Records and lists use one responsive table pattern across the product. Each pattern is defined once and reused everywhere.',
					side: 'top',
					align: 'start',
					doneBtnText: 'See icons',
					onNextClick: function (element, step, options) {
						navigatePitchTour(options.driver, PITCH_TOUR_ICONOLOGY_PATH);
					}
				}
			}
		],
		iconology: [
			{
				element: '.iconology-grid',
				popover: {
					title: pitchTourStepTitle(7, 'A unified icon language'),
					description: 'Each action and status maps to one documented icon, so the same symbol always means the same thing across the product.',
					side: 'bottom',
					align: 'start',
					doneBtnText: 'Open Merchant portal',
					onNextClick: function (element, step, options) {
						navigatePitchTour(options.driver, PITCH_TOUR_MERCHANT_PATH);
					}
				}
			}
		],
		merchant: [
			{
				popover: {
					title: pitchTourStepTitle(8, 'Designed for every screen'),
					description: 'Try it now: shrink your browser window or open mobile view in your browser dev tools. The layout reflows and the sidebar becomes a slide-in menu. Next, the Admin portal.',
					align: 'center',
					doneBtnText: 'Open Admin portal',
					onNextClick: function (element, step, options) {
						navigatePitchTour(options.driver, PITCH_TOUR_ADMIN_PATH);
					}
				}
			}
		],
		admin: [
			{
				popover: {
					title: pitchTourStepTitle(9, 'Explore the rest yourself'),
					description: 'That is the tour. Now take a moment to explore freely: open the sidebar sections, switch themes, and move between pages and portals to see the same components and icons at work everywhere.',
					align: 'center',
					doneBtnText: 'Back to home',
					onNextClick: function (element, step, options) {
						finishPitchTour(options.driver);
						window.location.href = PITCH_TOUR_HOME_PATH;
					}
				}
			}
		]
	};
}

function initPitchTour() {
	if (!window.driver || !window.driver.js || typeof window.driver.js.driver !== 'function') {
		return;
	}

	var page = getPitchTourPage();
	if (!page) {
		return;
	}

	var hasResume = sessionStorage.getItem(PITCH_TOUR_RESUME_KEY) !== null;
	var seen = localStorage.getItem(PITCH_TOUR_SEEN_KEY) === '1';
	var shouldStart = false;

	if (page === 'home') {
		if (!seen) {
			shouldStart = true;
			localStorage.setItem(PITCH_TOUR_SEEN_KEY, '1');
		}
	} else if (hasResume) {
		shouldStart = true;
		sessionStorage.removeItem(PITCH_TOUR_RESUME_KEY);
	}

	if (shouldStart) {
		startPitchTour(page);
	}
}

function startPitchTour(page) {
	if (!window.driver || !window.driver.js || typeof window.driver.js.driver !== 'function') {
		return;
	}

	var steps = getPitchTourSteps()[page];
	if (!steps || !steps.length) {
		return;
	}

	var driverObj = window.driver.js.driver({
		popoverClass: 'khusa-tour',
		smoothScroll: true,
		allowClose: true,
		showProgress: false,
		doneBtnText: 'Done',
		onCloseClick: function (element, step, options) {
			finishPitchTour(options.driver);
		},
		onDestroyed: function () {
			localStorage.setItem(PITCH_TOUR_SEEN_KEY, '1');
		},
		steps: steps
	});

	window.requestAnimationFrame(function () {
		driverObj.drive();
	});
}

$(function () {
	initThemeSwitcher();
	window.applyBrandLogoTheme(
		document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light'
	);
	initUserAvatars();
	initDashboardGreetings();

	if (typeof lucide !== 'undefined') {
		lucide.createIcons();
	}

	initPitchTour();

	initAirDatepickerFields();
	initIntlTelInputFields();
	initBaseStepper();
	initMainNavNotifications();
	initMainNavEnvSync();
	initFundsTransfer();
	initDisbursementSuccessRouting();
	initSendSuccessPage();
	initDisputesIndexFlow();
	initMerchantDetailContentsNav();
	initAdminDashboardNav();
	initApplicationDetailTabs();
	initAdminOrganizationsChart();
	initAdminApplicationsChart();
	initAdminDisbursementsChart();
	initAdminDisputesAnalyticsChart();
	initAdminRefundsAnalyticsChart();
	initAdminDisbursementsAnalyticsChart();
	initMerchantDisbursementsAnalyticsChart();
	initMerchantCollectionsAnalyticsChart();
	initChartThemeRefresh();
	initBootstrapToastTriggers();
	initProcessingButtons();
	initCloseDisputeRefundToggle();
	initConnectorLogoPreview();

	$('#modalAddConnector').on('shown.bs.modal', function () {
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
	});

	$('#modalAddUserAccount, #modalEditUserAccount').on('shown.bs.modal', function () {
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
		initIntlTelInputFields(this);
	});

	$('#offcanvasUserDetails').on('shown.bs.offcanvas', function () {
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
	});

	$('#appSidebarMenu').on('shown.bs.offcanvas', function () {
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
	});

	$('#offcanvasAddBatch').on('shown.bs.offcanvas', function () {
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
		initAirDatepickerFields(document.getElementById('offcanvasAddBatch'));
	});

	$('#webhook-notifications-filters-panel').on('shown.bs.collapse', function () {
		initAirDatepickerFields(this);
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
	});

	$('#offcanvasAddTransaction').on('shown.bs.offcanvas', function () {
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
		initAirDatepickerFields(document.getElementById('offcanvasAddTransaction'));
	});

	$('#offcanvasFundsTransfer').on('shown.bs.offcanvas', function () {
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
		initAirDatepickerFields(document.getElementById('offcanvasFundsTransfer'));
	});

	$('#modalAddDisputeParties, #modalAddOrganisation, #modalAddIndividual').on('shown.bs.modal', function () {
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
	});

	$('#offcanvasCloseDispute, #offcanvasAddDisputeEvent').on('shown.bs.offcanvas', function () {
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
	});
});
