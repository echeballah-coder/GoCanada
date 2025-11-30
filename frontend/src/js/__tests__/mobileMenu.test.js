/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { initMobileMenu } from '../modules/ui/mobileMenu.js';

describe('Mobile Menu Module', () => {
  beforeEach(() => {
    // Setup basic mobile menu HTML structure
    document.body.innerHTML = `
      <button class="menu-toggle" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="main-nav">
        <ul>
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li><a href="parcours.html" class="nav-link">Parcours</a></li>
        </ul>
      </nav>
    `;

    // Reset body overflow
    document.body.style.overflow = '';
  });

  it('should toggle menu when clicking toggle button', () => {
    initMobileMenu();

    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Initially closed
    expect(menuToggle.classList.contains('is-active')).toBe(false);
    expect(mainNav.classList.contains('is-open')).toBe(false);

    // Click to open
    menuToggle.click();
    expect(menuToggle.classList.contains('is-active')).toBe(true);
    expect(mainNav.classList.contains('is-open')).toBe(true);
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');

    // Click to close
    menuToggle.click();
    expect(menuToggle.classList.contains('is-active')).toBe(false);
    expect(mainNav.classList.contains('is-open')).toBe(false);
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('should prevent body scroll when menu is open', () => {
    initMobileMenu();

    const menuToggle = document.querySelector('.menu-toggle');

    // Open menu
    menuToggle.click();
    expect(document.body.style.overflow).toBe('hidden');

    // Close menu
    menuToggle.click();
    expect(document.body.style.overflow).toBe('');
  });

  it('should close menu when nav link is clicked', done => {
    initMobileMenu();

    const menuToggle = document.querySelector('.menu-toggle');
    const navLink = document.querySelector('.nav-link');
    const mainNav = document.querySelector('.main-nav');

    // Open menu first
    menuToggle.click();
    expect(mainNav.classList.contains('is-open')).toBe(true);

    // Click a nav link
    navLink.click();

    // Wait for setTimeout to complete (100ms delay in the code)
    setTimeout(() => {
      expect(mainNav.classList.contains('is-open')).toBe(false);
      done();
    }, 150);
  });

  it('should not throw error when menu elements are missing', () => {
    document.body.innerHTML = '<div>No menu here</div>';

    expect(() => initMobileMenu()).not.toThrow();
  });
});
