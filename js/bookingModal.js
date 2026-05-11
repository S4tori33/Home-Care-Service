/**
 * ============================================================================
 * Booking Modal System
 * ============================================================================
 * Handles edit and cancel (delete) booking modals with:
 *  - Two-step cancel confirmation (no browser alert())
 *  - In-page toast notifications for success/error feedback
 *  - Proper form validation on edit
 *  - Smooth open/close animations via CSS classes
 *
 * Depends on: #bookingActionModal and its children in dashboard.html
 * Exposes: openBookingModal, closeBookingModal, confirmBookingAction (global)
 */

(function () {
  'use strict';

  /* ── State ─────────────────────────────────────────────────────────────── */
  let _ctx = { item: null, action: null, step: 'main' };

  /* ── Toast ──────────────────────────────────────────────────────────────── */
  /**
   * Show a non-blocking toast notification.
   * @param {string} message
   * @param {'success'|'error'|'info'} type
   */
  function showToast(message, type = 'success') {
    // Remove any existing toast so they don't stack
    document.querySelectorAll('.bm-toast').forEach(t => t.remove());

    const icons = {
      success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>`,
      error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>`,
      info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>`,
    };

    const toast = document.createElement('div');
    toast.className = `bm-toast bm-toast--${type}`;
    toast.innerHTML = `
      <span class="bm-toast__icon">${icons[type] || icons.info}</span>
      <span class="bm-toast__msg">${message}</span>
      <button class="bm-toast__close" aria-label="Dismiss" onclick="this.closest('.bm-toast').remove()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>`;

    document.body.appendChild(toast);

    // Trigger enter animation on next frame
    requestAnimationFrame(() => toast.classList.add('bm-toast--visible'));

    // Auto-dismiss after 4 s
    const timer = setTimeout(() => dismissToast(toast), 4000);
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
    toast.addEventListener('mouseleave', () => setTimeout(() => dismissToast(toast), 1500));
  }

  function dismissToast(toast) {
    if (!toast || !toast.isConnected) return;
    toast.classList.remove('bm-toast--visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }

  /* ── Helpers ────────────────────────────────────────────────────────────── */
  function toInputDateValue(displayDate) {
    if (!displayDate) return '';
    const parsed = new Date(displayDate);
    return isNaN(parsed.getTime()) ? '' : parsed.toISOString().slice(0, 10);
  }

  function formatBookingDateForDisplay(dateValue) {
    if (!dateValue) return 'Date TBD';
    const parsed = new Date(dateValue + 'T00:00:00'); // avoid timezone offset
    return isNaN(parsed.getTime())
      ? dateValue
      : parsed.toLocaleDateString(undefined, {
          weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
        });
  }

  /* ── Modal DOM refs (lazy) ──────────────────────────────────────────────── */
  function getRefs() {
    return {
      modal:         document.getElementById('bookingActionModal'),
      deleteView:    document.getElementById('bookingModalDeleteView'),
      editView:      document.getElementById('bookingModalEditView'),
      confirmView:   document.getElementById('bookingModalConfirmView'),
      titleEl:       document.getElementById('bookingModalTitle'),
      subtitleEl:    document.getElementById('bookingModalSubtitle'),
      headerIcon:    document.querySelector('#bookingActionModal .modal-header-icon'),
      confirmBtn:    document.getElementById('bookingModalConfirmButton'),
      deleteTitle:   document.getElementById('bookingModalDeleteTitle'),
      serviceInput:  document.getElementById('bookingServiceInput'),
      dateInput:     document.getElementById('bookingDateInput'),
      timeInput:     document.getElementById('bookingTimeInput'),
      locationInput: document.getElementById('bookingLocationInput'),
    };
  }

  /* ── Open ───────────────────────────────────────────────────────────────── */
  function openBookingModal(action, bookingId) {
    const refs = getRefs();
    if (!refs.modal) { console.error('[BookingModal] Modal element not found'); return; }

    const item = document.querySelector(`[data-booking-id="${bookingId}"]`);
    if (!item) { console.error(`[BookingModal] Booking item not found: ${bookingId}`); return; }

    _ctx = { item, action, step: 'main' };

    const titleText    = item.querySelector('.booking-title')?.textContent.trim() || 'Booking';
    const metaEls      = Array.from(item.querySelectorAll('.booking-meta'));
    const dateTimeMeta = metaEls[0]?.textContent.trim() || '';
    const locationMeta = metaEls[1]?.textContent.trim() || '';
    const [datePart, timePart] = dateTimeMeta.split(' · ');

    // Hide all views first
    _hideAllViews(refs);

    if (action === 'delete') {
      _setupDeleteView(refs, titleText);
    } else {
      _setupEditView(refs, titleText, datePart, timePart, locationMeta);
    }

    refs.modal.classList.add('modal-open');
    refs.modal.setAttribute('aria-hidden', 'false');

    // Trap focus on first input / button
    requestAnimationFrame(() => {
      const firstFocusable = refs.modal.querySelector(
        'input:not([disabled]), button:not([disabled])'
      );
      if (firstFocusable) firstFocusable.focus();
    });
  }

  function _hideAllViews(refs) {
    [refs.deleteView, refs.editView, refs.confirmView].forEach(v => {
      if (v) v.style.display = 'none';
    });
  }

  function _setupDeleteView(refs, titleText) {
    refs.titleEl.textContent    = 'Cancel Booking';
    refs.subtitleEl.textContent = 'This action cannot be undone.';
    if (refs.headerIcon) {
      refs.headerIcon.className = 'modal-header-icon red';
    }
    if (refs.deleteView) {
      refs.deleteView.style.display = 'block';
      if (refs.deleteTitle) refs.deleteTitle.textContent = titleText;
    }
    _setConfirmBtn(refs, 'Cancel Booking', true);
  }

  function _setupEditView(refs, titleText, datePart, timePart, locationMeta) {
    refs.titleEl.textContent    = 'Edit Booking';
    refs.subtitleEl.textContent = 'Update the details below and save your changes.';
    if (refs.headerIcon) {
      refs.headerIcon.className = 'modal-header-icon blue';
    }
    if (refs.editView) {
      refs.editView.style.display = 'block';
      refs.serviceInput.value  = titleText;
      refs.dateInput.value     = toInputDateValue(datePart);
      refs.timeInput.value     = timePart || '';
      refs.locationInput.value = locationMeta;
    }
    _setConfirmBtn(refs, 'Save Changes', false);
  }

  function _setConfirmBtn(refs, label, isDanger) {
    const btn = refs.confirmBtn;
    if (!btn) return;
    btn.textContent = label;
    if (isDanger) {
      btn.className = 'btn btn-danger-solid';
    } else {
      btn.className = 'btn btn-primary--blue';
    }
    btn.disabled = false;
  }

  /* ── Close ──────────────────────────────────────────────────────────────── */
  function closeBookingModal() {
    const modal = document.getElementById('bookingActionModal');
    if (!modal) return;
    modal.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
    _ctx = { item: null, action: null, step: 'main' };

    // Reset confirm view if it was injected
    const confirmView = document.getElementById('bookingModalConfirmView');
    if (confirmView) confirmView.style.display = 'none';
  }

  /* ── Confirm (main button) ──────────────────────────────────────────────── */
  function confirmBookingAction() {
    const { item, action } = _ctx;
    if (!item || !action) return;

    if (action === 'delete') {
      _handleDelete(item);
    } else {
      _handleEdit(item);
    }
  }

  /* ── Delete flow ────────────────────────────────────────────────────────── */
  /**
   * Two-step cancel:
   *   Step 1 — user clicks "Cancel Booking" → show inline confirmation panel
   *   Step 2 — user clicks "Yes, Cancel It" → actually remove the booking
   */
  function _handleDelete(item) {
    if (_ctx.step === 'main') {
      // Move to confirmation step
      _ctx.step = 'confirm';
      _showCancelConfirmationStep();
    } else {
      // Actually cancel the booking
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      item.style.opacity    = '0';
      item.style.transform  = 'translateX(-12px)';
      setTimeout(() => item.remove(), 320);

      closeBookingModal();
      showToast('Booking has been cancelled successfully.', 'success');
    }
  }

  function _showCancelConfirmationStep() {
    // Inject or show the confirm sub-view inside the modal body
    let confirmView = document.getElementById('bookingModalConfirmView');
    if (!confirmView) {
      confirmView = document.createElement('div');
      confirmView.id = 'bookingModalConfirmView';
      const body = document.querySelector('#bookingActionModal .modal-body');
      if (body) body.appendChild(confirmView);
    }

    const deleteView = document.getElementById('bookingModalDeleteView');
    if (deleteView) deleteView.style.display = 'none';

    confirmView.style.display = 'block';
    confirmView.innerHTML = `
      <div class="bm-confirm-panel">
        <div class="bm-confirm-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <p class="bm-confirm-heading">Are you absolutely sure?</p>
        <p class="bm-confirm-body">
          Cancelling <strong>${_ctx.item?.querySelector('.booking-title')?.textContent.trim() || 'this booking'}</strong>
          will permanently remove it. You'll need to book again if you change your mind.
        </p>
      </div>`;

    // Update the header and confirm button
    const titleEl    = document.getElementById('bookingModalTitle');
    const subtitleEl = document.getElementById('bookingModalSubtitle');
    const confirmBtn = document.getElementById('bookingModalConfirmButton');
    const headerIcon = document.querySelector('#bookingActionModal .modal-header-icon');

    if (titleEl)    titleEl.textContent    = 'Confirm Cancellation';
    if (subtitleEl) subtitleEl.textContent = 'This cannot be undone.';
    if (headerIcon) headerIcon.className   = 'modal-header-icon red';
    if (confirmBtn) {
      confirmBtn.textContent = 'Yes, Cancel It';
      confirmBtn.className   = 'btn btn-danger-solid';
    }

    // Add a "Go Back" secondary button if not already there
    const footer = document.querySelector('#bookingActionModal .modal-footer');
    if (footer && !footer.querySelector('.bm-back-btn')) {
      const backBtn = document.createElement('button');
      backBtn.type      = 'button';
      backBtn.className = 'btn btn-secondary bm-back-btn';
      backBtn.textContent = 'Go Back';
      backBtn.onclick = _resetToDeleteStep;
      // Insert before the confirm button
      footer.insertBefore(backBtn, confirmBtn);
    }

    confirmView.focus?.();
  }

  function _resetToDeleteStep() {
    _ctx.step = 'main';

    const confirmView = document.getElementById('bookingModalConfirmView');
    if (confirmView) confirmView.style.display = 'none';

    const deleteView = document.getElementById('bookingModalDeleteView');
    if (deleteView) deleteView.style.display = 'block';

    const titleEl    = document.getElementById('bookingModalTitle');
    const subtitleEl = document.getElementById('bookingModalSubtitle');
    const confirmBtn = document.getElementById('bookingModalConfirmButton');
    const headerIcon = document.querySelector('#bookingActionModal .modal-header-icon');

    if (titleEl)    titleEl.textContent    = 'Cancel Booking';
    if (subtitleEl) subtitleEl.textContent = 'This action cannot be undone.';
    if (headerIcon) headerIcon.className   = 'modal-header-icon red';
    if (confirmBtn) {
      confirmBtn.textContent = 'Cancel Booking';
      confirmBtn.className   = 'btn btn-danger-solid';
    }

    // Remove the back button
    document.querySelector('.bm-back-btn')?.remove();
  }

  /* ── Edit flow ──────────────────────────────────────────────────────────── */
  function _handleEdit(item) {
    const refs = getRefs();

    // Validate
    const service  = refs.serviceInput?.value.trim();
    const date     = refs.dateInput?.value.trim();
    const time     = refs.timeInput?.value.trim();
    const location = refs.locationInput?.value.trim();

    if (!service) {
      _fieldError(refs.serviceInput, 'Service name is required.');
      return;
    }

    // Apply updates to the DOM booking card
    const titleNode  = item.querySelector('.booking-title');
    const metaNodes  = item.querySelectorAll('.booking-meta');

    if (titleNode) titleNode.textContent = service;
    if (metaNodes[0]) {
      const displayDate = formatBookingDateForDisplay(date);
      metaNodes[0].textContent = time ? `${displayDate} · ${time}` : displayDate;
    }
    if (metaNodes[1] && location) {
      metaNodes[1].textContent = location;
    }

    closeBookingModal();
    showToast('Booking updated successfully.', 'success');
  }

  function _fieldError(inputEl, message) {
    if (!inputEl) return;
    inputEl.style.borderColor = '#ef4444';
    inputEl.style.boxShadow   = '0 0 0 3px rgba(239,68,68,.15)';
    inputEl.focus();
    inputEl.setAttribute('aria-invalid', 'true');

    // Show inline error
    let errEl = inputEl.parentElement?.querySelector('.bm-field-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'bm-field-error';
      inputEl.parentElement?.appendChild(errEl);
    }
    errEl.textContent = message;

    const reset = () => {
      inputEl.style.borderColor = '';
      inputEl.style.boxShadow   = '';
      inputEl.removeAttribute('aria-invalid');
      errEl?.remove();
    };
    inputEl.addEventListener('input', reset, { once: true });
  }

  /* ── Click-outside to close ─────────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    const modal = document.getElementById('bookingActionModal');
    if (!modal || !modal.classList.contains('modal-open')) return;
    if (e.target === modal) closeBookingModal();
  });

  /* ── Keyboard: Escape to close ──────────────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('bookingActionModal');
      if (modal?.classList.contains('modal-open')) closeBookingModal();
    }
  });

  /* ── Delegate action buttons (data-action pattern) ──────────────────────── */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.booking-actions button[data-action]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const action    = btn.dataset.action;
    const bookingId = btn.closest('[data-booking-id]')?.dataset.bookingId;
    if (action && bookingId) openBookingModal(action, bookingId);
  });

  /* ── Expose globals ─────────────────────────────────────────────────────── */
  window.openBookingModal    = openBookingModal;
  window.closeBookingModal   = closeBookingModal;
  window.confirmBookingAction = confirmBookingAction;

  // Legacy aliases used elsewhere in dashboard.js
  window.editBooking      = (id, btn) => { btn?.blur(); openBookingModal('edit', id); };
  window.askDeleteBooking = (id, btn) => { btn?.blur(); openBookingModal('delete', id); };

})();