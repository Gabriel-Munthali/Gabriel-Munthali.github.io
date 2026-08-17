(function () {
	'use strict';

	var TOTAL_STEPS = 6;
	var TOTAL_SUMMARY_PAGES = 3;
	var currentStep = 1;
	var currentSummaryPage = 1;

	var panels = document.querySelectorAll('[data-kyc-step]');
	var stepItems = document.querySelectorAll('#kycStepProgress .step-item');
	var backButton = document.getElementById('kycBackButton');
	var homeButton = document.getElementById('kycHomeButton');
	var nextButtons = document.querySelectorAll('[data-kyc-next]');
	var accountRadios = document.querySelectorAll('.kyc-account-type-radio');
	var step1Next = document.getElementById('kycStep1Next');
	var summaryPrev = document.getElementById('kycSummaryPrev');
	var summaryNext = document.getElementById('kycSummaryNext');
	var summaryPageLabel = document.getElementById('kycSummaryPageLabel');
	var summaryPages = document.querySelectorAll('[data-kyc-summary-page]');
	var editLinks = document.querySelectorAll('[data-kyc-edit]');
	var confirmButton = document.getElementById('kycConfirmDetails');
	var termsModalEl = document.getElementById('kycTermsModal');
	var termsAgree = document.getElementById('kycTermsAgree');
	var termsContinue = document.getElementById('kycTermsContinue');
	var otpModalEl = document.getElementById('kycOtpModal');
	var verifyButton = document.getElementById('kycVerifyCode');
	var submittedModalEl = document.getElementById('kycSubmittedModal');
	var trackProgressButton = document.getElementById('kycTrackProgress');
	var finishButton = document.getElementById('kycFinish');

	function refreshIcons() {
		if (typeof lucide !== 'undefined') {
			lucide.createIcons();
		}
	}

	function initIntlTelOnBusinessStep() {
		var input = document.getElementById('kycBusinessContact');
		if (!input || input.dataset.intlTelInputInit === 'true' || typeof window.intlTelInput === 'undefined') {
			return;
		}
		window.intlTelInput(input, {
			separateDialCode: true,
			initialCountry: 'mw'
		});
		input.dataset.intlTelInputInit = 'true';
	}

	function updateStepProgress() {
		stepItems.forEach(function (item, index) {
			var step = index + 1;
			item.classList.remove('completed', 'current');
			if (step < currentStep) {
				item.classList.add('completed');
			} else if (step === currentStep) {
				item.classList.add('current');
			}
		});

		panels.forEach(function (panel) {
			var step = parseInt(panel.getAttribute('data-kyc-step'), 10);
			panel.hidden = step !== currentStep;
		});

		if (backButton) {
			backButton.hidden = currentStep === 1;
		}

		if (currentStep === 2) {
			initIntlTelOnBusinessStep();
		}

		if (currentStep === TOTAL_STEPS) {
			updateSummaryPage();
		}

		refreshIcons();
	}

	function goToStep(step) {
		if (step < 1 || step > TOTAL_STEPS) {
			return;
		}
		currentStep = step;
		updateStepProgress();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function updateStep1NextState() {
		if (!step1Next) {
			return;
		}
		var selected = document.querySelector('.kyc-account-type-radio:checked');
		step1Next.disabled = !selected;
	}

	function updateSummaryPage() {
		summaryPages.forEach(function (page) {
			var pageNum = parseInt(page.getAttribute('data-kyc-summary-page'), 10);
			page.hidden = pageNum !== currentSummaryPage;
		});

		if (summaryPageLabel) {
			summaryPageLabel.textContent = currentSummaryPage + ' of ' + TOTAL_SUMMARY_PAGES;
		}

		if (summaryPrev) {
			summaryPrev.disabled = currentSummaryPage === 1;
		}

		if (summaryNext) {
			summaryNext.disabled = currentSummaryPage === TOTAL_SUMMARY_PAGES;
		}

		refreshIcons();
	}

	function formatFileSize(bytes) {
		if (bytes < 1024 * 1024) {
			return Math.round(bytes / 1024) + ' KB';
		}
		return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
	}

	function initDocumentRows() {
		document.querySelectorAll('[data-kyc-upload-row]').forEach(function (row) {
			var fileInput = row.querySelector('.kyc-document-file-input');
			var uploadButton = row.querySelector('.kyc-document-upload-btn');
			var removeButton = row.querySelector('.kyc-document-remove-btn');
			var metaEl = row.querySelector('[data-upload-meta]');

			function resetRow() {
				row.classList.remove('is-uploaded');
				if (fileInput) {
					fileInput.value = '';
				}
				if (metaEl) {
					metaEl.textContent = '';
				}
			}

			if (uploadButton && fileInput) {
				uploadButton.addEventListener('click', function () {
					fileInput.click();
				});
			}

			if (fileInput) {
				fileInput.addEventListener('change', function () {
					var file = fileInput.files[0];
					if (!file) {
						resetRow();
						return;
					}
					row.classList.add('is-uploaded');
					if (metaEl) {
						metaEl.textContent = file.name + ' · ' + formatFileSize(file.size);
					}
				});
			}

			if (removeButton) {
				removeButton.addEventListener('click', resetRow);
			}
		});
	}

	function showToast(type, messageHtml) {
		if (typeof bootstrap === 'undefined') {
			return Promise.resolve();
		}

		var container = document.querySelector('.toast-container');
		if (!container) {
			container = document.createElement('div');
			container.className = 'toast-container';
			container.setAttribute('aria-live', 'polite');
			container.setAttribute('aria-atomic', 'true');
			document.body.appendChild(container);
		}

		var iconName = type === 'success' ? 'check-circle-2' : 'info';
		var toastId = 'kyc-toast-' + Date.now();
		var toast = document.createElement('div');
		toast.id = toastId;
		toast.className = 'toast toast-' + type + ' hide';
		toast.setAttribute('role', 'alert');
		toast.setAttribute('aria-live', 'assertive');
		toast.setAttribute('aria-atomic', 'true');
		toast.setAttribute('data-bs-autohide', 'true');
		toast.setAttribute('data-bs-delay', '2500');
		toast.innerHTML =
			'<div class="toast-body">' +
				'<i data-lucide="' + iconName + '" class="toast-icon" aria-hidden="true"></i>' +
				'<span class="toast-message">' + messageHtml + '</span>' +
				'<button type="button" class="button-close" data-bs-dismiss="toast" aria-label="Close">' +
					'<i data-lucide="x" aria-hidden="true"></i>' +
				'</button>' +
			'</div>';
		container.appendChild(toast);
		refreshIcons();

		return new Promise(function (resolve) {
			var instance = bootstrap.Toast.getOrCreateInstance(toast);
			toast.addEventListener('hidden.bs.toast', function () {
				toast.remove();
				resolve();
			});
			instance.show();
		});
	}

	function syncTermsContinueState() {
		if (!termsContinue || !termsAgree) {
			return;
		}
		var checked = termsAgree.checked;
		termsContinue.disabled = !checked;
		termsContinue.classList.toggle('button-primary', checked);
		termsContinue.classList.toggle('button-outline', !checked);
	}

	function initTermsModal() {
		if (!termsModalEl || typeof bootstrap === 'undefined') {
			return;
		}

		var termsModal = new bootstrap.Modal(termsModalEl, {
			backdrop: 'static',
			keyboard: false
		});

		syncTermsContinueState();
		termsModal.show();

		if (termsAgree) {
			termsAgree.addEventListener('change', syncTermsContinueState);
		}

		if (termsContinue) {
			termsContinue.addEventListener('click', function () {
				if (!termsAgree || !termsAgree.checked) {
					return;
				}
				termsModal.hide();
			});
		}
	}

	function initOtpFlow() {
		if (!verifyButton) {
			return;
		}

		verifyButton.addEventListener('click', function () {
			var otpModal = otpModalEl ? bootstrap.Modal.getInstance(otpModalEl) : null;
			if (otpModal) {
				otpModal.hide();
			}

			showToast('info', 'Please wait, saving your application').then(function () {
				return showToast('success', 'Your application has been saved');
			}).then(function () {
				if (submittedModalEl) {
					bootstrap.Modal.getOrCreateInstance(submittedModalEl).show();
				}
			});
		});
	}

	function bindEvents() {
		if (backButton) {
			backButton.addEventListener('click', function () {
				if (currentStep > 1) {
					goToStep(currentStep - 1);
				}
			});
		}

		nextButtons.forEach(function (button) {
			button.addEventListener('click', function (event) {
				event.preventDefault();
				if (currentStep < TOTAL_STEPS) {
					goToStep(currentStep + 1);
				}
			});
		});

		accountRadios.forEach(function (radio) {
			radio.addEventListener('change', updateStep1NextState);
		});

		if (summaryPrev) {
			summaryPrev.addEventListener('click', function () {
				if (currentSummaryPage > 1) {
					currentSummaryPage -= 1;
					updateSummaryPage();
				}
			});
		}

		if (summaryNext) {
			summaryNext.addEventListener('click', function () {
				if (currentSummaryPage < TOTAL_SUMMARY_PAGES) {
					currentSummaryPage += 1;
					updateSummaryPage();
				}
			});
		}

		editLinks.forEach(function (link) {
			link.addEventListener('click', function (event) {
				event.preventDefault();
				var targetStep = parseInt(link.getAttribute('data-kyc-edit'), 10);
				if (targetStep) {
					goToStep(targetStep);
				}
			});
		});

		if (confirmButton && otpModalEl && typeof bootstrap !== 'undefined') {
			confirmButton.addEventListener('click', function () {
				bootstrap.Modal.getOrCreateInstance(otpModalEl).show();
			});
		}

		if (trackProgressButton) {
			trackProgressButton.addEventListener('click', function () {
				window.location.href = 'index.html';
			});
		}

		if (finishButton) {
			finishButton.addEventListener('click', function () {
				window.location.href = '../index.html';
			});
		}

		if (homeButton) {
			homeButton.addEventListener('click', function () {
				window.location.href = '../index.html';
			});
		}
	}

	document.addEventListener('DOMContentLoaded', function () {
		if (!document.body.classList.contains('kyc-onboarding-page')) {
			return;
		}

		initDocumentRows();
		bindEvents();
		initTermsModal();
		initOtpFlow();
		updateStep1NextState();
		updateStepProgress();
	});

})();
