/**
 * @file modules/ui/tooltip.js
 * @description Système de tooltips (infobulles) pour expliquer les termes techniques.
 * REFACTORISÉ : Utilise utilitaires dom et simplifie la logique.
 */

import { querySelectorAll, createElement, setAttributes } from '../../utils/dom.js';

/**
 * Initialise le système de tooltips.
 */
export function initTooltips() {
  const tooltipElements = querySelectorAll('[data-tooltip]');

  if (tooltipElements.length === 0) {
    console.log('Tooltips: No elements with data-tooltip found');
    return;
  }

  tooltipElements.forEach(element => {
    if (!element.hasAttribute('tabindex')) {
      setAttributes(element, { tabindex: '0' });
    }

    element.style.cursor = 'help';
    element.classList.add('has-tooltip');

    const tooltipText = element.getAttribute('data-tooltip');
    const tooltipBox = createTooltipElement(tooltipText);

    element.addEventListener('mouseenter', () => showTooltip(element, tooltipBox));
    element.addEventListener('mouseleave', () => hideTooltip(tooltipBox));
    element.addEventListener('focus', () => showTooltip(element, tooltipBox));
    element.addEventListener('blur', () => hideTooltip(tooltipBox));

    element.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        tooltipBox.classList.toggle('visible');
      }
    });
  });

  console.log(`✅ Tooltips initialized: ${tooltipElements.length} element(s)`);
}

/**
 * Crée un élément tooltip DOM.
 * @param {string} text - Le texte du tooltip.
 * @returns {HTMLElement}
 */
function createTooltipElement(text) {
  const el = createElement('div', {
    className: 'tooltip-box',
    textContent: text,
    attributes: { role: 'tooltip' },
  });
  document.body.appendChild(el);
  return el;
}

/**
 * Affiche le tooltip à la position appropriée.
 */
function showTooltip(element, tooltipBox) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  tooltipBox.style.left = `${rect.left + scrollLeft + rect.width / 2}px`;
  tooltipBox.style.top = `${rect.top + scrollTop - 10}px`;
  tooltipBox.classList.add('visible');
}

/**
 * Masque le tooltip.
 */
function hideTooltip(tooltipBox) {
  tooltipBox.classList.remove('visible');
}
