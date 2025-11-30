/**
 * @file modules/ui/mobileMenu.js
 * @description Gestion du menu mobile (burger menu).
 * REFACTORISÉ : Utilise les utilitaires dom pour réduire la duplication.
 */

import {
  querySelector,
  querySelectorAll,
  addClass,
  removeClass,
  disableBodyScroll,
  enableBodyScroll,
} from '../../utils/dom.js';

/**
 * Initialise le menu mobile.
 */
export function initMobileMenu() {
  const menuToggle = querySelector('.menu-toggle');
  const mainNav = querySelector('.main-nav');
  const navLinks = querySelectorAll('.nav-link');

  if (!menuToggle || !mainNav) {
    return;
  }

  const toggleMenu = () => {
    menuToggle.classList.contains('is-active') ? closeMenu() : openMenu();
  };

  const openMenu = () => {
    addClass(menuToggle, 'is-active');
    addClass(mainNav, 'is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    disableBodyScroll();
  };

  const closeMenu = () => {
    removeClass(menuToggle, 'is-active');
    removeClass(mainNav, 'is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    enableBodyScroll();
  };

  menuToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 100);
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  mainNav.addEventListener('click', e => {
    if (e.target === mainNav) {
      closeMenu();
    }
  });
}
