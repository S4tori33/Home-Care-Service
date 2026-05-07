/**
 * MOBILE RESPONSIVE UTILITIES
 * Hamburger menu, sidebar toggle, responsive helpers
 */

class MobileResponsive {
  constructor() {
    this.sidebarOpen = false;
    this.init();
  }

  init() {
    this.setupSidebarToggle();
    this.setupOverlayClose();
    this.handleWindowResize();
    this.setupMobileMenuLinks();
  }

  /**
   * Setup hamburger menu toggle
   */
  setupSidebarToggle() {
    const toggleBtns = document.querySelectorAll('[data-sidebar-toggle], .sidebar-toggle, .hamburger');
    toggleBtns.forEach(btn => {
      btn?.addEventListener('click', () => this.toggleSidebar());
    });
  }

  /**
   * Toggle sidebar visibility
   */
  toggleSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const overlay = document.querySelector('.dashboard-overlay');
    
    if (!sidebar) return;

    this.sidebarOpen = !this.sidebarOpen;
    
    if (this.sidebarOpen) {
      sidebar.classList.add('open');
      overlay?.classList.add('show');
      document.body.style.overflow = 'hidden';
    } else {
      sidebar.classList.remove('open');
      overlay?.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  /**
   * Close sidebar when clicking overlay
   */
  setupOverlayClose() {
    const overlay = document.querySelector('.dashboard-overlay');
    overlay?.addEventListener('click', () => this.closeSidebar());
  }

  /**
   * Close sidebar
   */
  closeSidebar() {
    if (this.sidebarOpen) {
      this.toggleSidebar();
    }
  }

  /**
   * Close sidebar on link click (mobile navigation)
   */
  setupMobileMenuLinks() {
    const sidebarLinks = document.querySelectorAll('.dashboard-sidebar a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          this.closeSidebar();
        }
      });
    });
  }

  /**
   * Handle window resize - close sidebar if resizing to desktop
   */
  handleWindowResize() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 768 && this.sidebarOpen) {
          this.closeSidebar();
        }
      }, 150);
    });
  }

  /**
   * Get device breakpoint
   */
  static getBreakpoint() {
    const width = window.innerWidth;
    if (width < 320) return 'xs';
    if (width < 375) return 'sm';
    if (width < 425) return 'md';
    if (width < 640) return 'lg';
    if (width < 768) return 'xl';
    if (width < 1024) return '2xl';
    if (width < 1280) return '3xl';
    return '4xl';
  }

  /**
   * Check if mobile
   */
  static isMobile() {
    return window.innerWidth < 768;
  }

  /**
   * Check if tablet
   */
  static isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  }

  /**
   * Check if desktop
   */
  static isDesktop() {
    return window.innerWidth >= 1024;
  }
}

/**
 * RESPONSIVE TABLE UTILITIES
 */
class ResponsiveTable {
  static init() {
    document.querySelectorAll('.table').forEach(table => {
      ResponsiveTable.wrapTable(table);
      ResponsiveTable.addDataLabels(table);
    });
  }

  static wrapTable(table) {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }

  static addDataLabels(table) {
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
    
    table.querySelectorAll('tbody tr').forEach(row => {
      row.querySelectorAll('td').forEach((td, index) => {
        td.setAttribute('data-label', headers[index]);
      });
    });
  }

  /**
   * Stack table on mobile
   */
  static makeResponsive(tableSelector) {
    const table = document.querySelector(tableSelector);
    if (!table) return;

    ResponsiveTable.wrapTable(table);
    ResponsiveTable.addDataLabels(table);
  }
}

/**
 * RESPONSIVE FORM UTILITIES
 */
class ResponsiveForm {
  static init() {
    document.querySelectorAll('form').forEach(form => {
      forms.querySelectorAll('.form-row').forEach(row => {
        ResponsiveForm.makeRowResponsive(row);
      });
    });
  }

  static makeRowResponsive(row) {
    const inputs = row.querySelectorAll('input, select, textarea');
    if (inputs.length > 1) {
      row.style.display = 'grid';
      row.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
      row.style.gap = 'var(--spacing-md)';
    }
  }

  static setupResponsiveCheckboxes() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.style.minWidth = '44px';
      checkbox.style.minHeight = '44px';
      checkbox.style.cursor = 'pointer';
    });
  }

  static setupResponsiveRadios() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.style.minWidth = '44px';
      radio.style.minHeight = '44px';
      radio.style.cursor = 'pointer';
    });
  }
}

/**
 * RESPONSIVE MODAL UTILITIES
 */
class ResponsiveModal {
  constructor(modalSelector) {
    this.modal = document.querySelector(modalSelector);
    this.isOpen = false;
    if (this.modal) {
      this.init();
    }
  }

  init() {
    this.setupCloseButtons();
    this.handleOutsideClick();
    this.preventScroll();
  }

  setupCloseButtons() {
    this.modal.querySelectorAll('[data-close-modal], .modal-close').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });
  }

  handleOutsideClick() {
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }

  preventScroll() {
    // Prevent scroll on body when modal open
    this.originalOverflow = '';
  }

  open() {
    this.modal.style.display = 'flex';
    this.modal.style.alignItems = 'center';
    this.modal.style.justifyContent = 'center';
    this.isOpen = true;
    this.originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.style.display = 'none';
    this.isOpen = false;
    document.body.style.overflow = this.originalOverflow;
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
}

/**
 * RESPONSIVE DROPDOWN UTILITIES
 */
class ResponsiveDropdown {
  static init() {
    document.querySelectorAll('[data-dropdown]').forEach(trigger => {
      ResponsiveDropdown.setup(trigger);
    });
  }

  static setup(trigger) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = trigger.nextElementSibling;
      if (menu?.classList.contains('dropdown-menu')) {
        menu.classList.toggle('show');
      }
    });

    document.addEventListener('click', () => {
      trigger.nextElementSibling?.classList.remove('show');
    });
  }
}

/**
 * RESPONSIVE TOUCH UTILITIES
 */
class TouchUtilities {
  static setupSwipeDetection() {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      TouchUtilities.handleSwipe(touchStartX, touchEndX);
    });
  }

  static handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left
        document.querySelector('.dashboard-sidebar')?.classList.remove('open');
      } else {
        // Swiped right
        document.querySelector('.dashboard-sidebar')?.classList.add('open');
      }
    }
  }

  static setupTouchTargets() {
    // Ensure all clickable elements have 44x44px minimum touch target
    document.querySelectorAll('button, a, [role="button"]').forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        element.style.padding = 'clamp(0.5rem, 2vw, 1rem)';
        element.style.minWidth = '44px';
        element.style.minHeight = '44px';
        element.style.display = 'inline-flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
      }
    });
  }
}

/**
 * RESPONSIVE VIEWPORT DETECTION
 */
class ViewportDetector {
  static getOrientation() {
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  }

  static isPortrait() {
    return window.innerHeight > window.innerWidth;
  }

  static isLandscape() {
    return window.innerWidth > window.innerHeight;
  }

  static hasNotch() {
    // Check for notch/safe area (mobile notches)
    return CSS.supports('padding-top', 'max(1em, env(safe-area-inset-top))');
  }
}

/**
 * AUTO-INITIALIZE ALL RESPONSIVE UTILITIES
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile sidebar toggle
  if (document.querySelector('.dashboard-sidebar')) {
    window.mobileResponsive = new MobileResponsive();
  }

  // Initialize responsive tables
  if (document.querySelector('table')) {
    ResponsiveTable.init();
  }

  // Initialize responsive forms
  if (document.querySelector('form')) {
    ResponsiveForm.init();
    ResponsiveForm.setupResponsiveCheckboxes();
    ResponsiveForm.setupResponsiveRadios();
  }

  // Initialize dropdowns
  if (document.querySelector('[data-dropdown]')) {
    ResponsiveDropdown.init();
  }

  // Initialize touch utilities for mobile
  if (window.innerWidth < 768) {
    TouchUtilities.setupSwipeDetection();
    TouchUtilities.setupTouchTargets();
  }
});
