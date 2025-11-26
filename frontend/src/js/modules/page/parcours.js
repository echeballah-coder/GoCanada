/**
 * @file modules/page/parcours.js
 * @description Gestionnaire de la page Parcours (Accordéon).
 * REFACTORISÉ : Logique d'accordéon simplifiée et réutilisable.
 */

import { querySelectorAll } from '../../utils/dom.js';

/**
 * Initialise l'accordéon de la page Parcours.
 */
export function initParcours() {
  const steps = querySelectorAll('.parcours-step');
  if (steps.length === 0) return;
  // helper: close a single step
  const closeStep = s => {
    s.classList.remove('is-active');
    const content = s.querySelector('.step-content');
    const header = s.querySelector('.step-header');
    if (content) {
      content.style.maxHeight = null;
    }
    if (header) header.setAttribute('aria-expanded', 'false');
  };

  const openStep = s => {
    s.classList.add('is-active');
    const content = s.querySelector('.step-content');
    const header = s.querySelector('.step-header');
    if (content) {
      // for smooth transition, set maxHeight to scrollHeight
      content.style.maxHeight = content.scrollHeight + 'px';
    }
    if (header) header.setAttribute('aria-expanded', 'true');
  };

  // Initialize ARIA and collapsed state
  steps.forEach(s => {
    const header = s.querySelector('.step-header');
    const content = s.querySelector('.step-content');
    if (header) {
      // make header keyboard-focusable
      if (!header.hasAttribute('tabindex')) header.setAttribute('tabindex', '0');
      header.setAttribute('role', 'button');
      header.setAttribute('aria-expanded', s.classList.contains('is-active') ? 'true' : 'false');

      // keyboard support
      header.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    }
    if (content) {
      // ensure initial collapsed state if not active
      if (!s.classList.contains('is-active')) content.style.maxHeight = null;
      else content.style.maxHeight = content.scrollHeight + 'px';
    }
  });

  // Click handling
  steps.forEach(step => {
    const header = step.querySelector('.step-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = step.classList.contains('is-active');

      // Close all steps
      steps.forEach(s => closeStep(s));

      // Toggle the clicked one
      if (!isActive) {
        openStep(step);
      }
    });
  });
}
