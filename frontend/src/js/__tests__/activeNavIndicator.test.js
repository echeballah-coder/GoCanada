/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { initActiveNavIndicator } from '../modules/activeNavIndicator.js';

describe('Active Nav Indicator Module', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Reset window.location.pathname for each test
    delete window.location;
    window.location = { pathname: '/parcours.html' };
  });

  it('should mark the correct link as active based on current page', () => {
    document.body.innerHTML = `
      <nav>
        <a href="index.html" class="nav-link">Home</a>
        <a href="parcours.html" class="nav-link">Parcours</a>
        <a href="budget.html" class="nav-link">Budget</a>
      </nav>
    `;

    initActiveNavIndicator();

    const links = document.querySelectorAll('.nav-link');

    // Only parcours.html should be active
    expect(links[0].classList.contains('active')).toBe(false);
    expect(links[1].classList.contains('active')).toBe(true);
    expect(links[2].classList.contains('active')).toBe(false);
  });

  it('should add aria-current attribute to active link', () => {
    document.body.innerHTML = `
      <nav>
        <a href="parcours.html" class="nav-link">Parcours</a>
      </nav>
    `;

    initActiveNavIndicator();

    const activeLink = document.querySelector('.nav-link');
    expect(activeLink.getAttribute('aria-current')).toBe('page');
  });

  it('should handle root path correctly', () => {
    window.location = { pathname: '/' };

    document.body.innerHTML = `
      <nav>
        <a href="index.html" class="nav-link">Home</a>
        <a href="parcours.html" class="nav-link">Parcours</a>
      </nav>
    `;

    initActiveNavIndicator();

    const homeLink = document.querySelector('[href="index.html"]');
    expect(homeLink.classList.contains('active')).toBe(true);
    expect(homeLink.getAttribute('aria-current')).toBe('page');
  });

  it('should not throw error when no nav links exist', () => {
    document.body.innerHTML = '<div>No navigation here</div>';

    expect(() => initActiveNavIndicator()).not.toThrow();
  });
});
