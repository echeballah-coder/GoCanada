/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { initTooltips } from '../modules/tooltip.js';

describe('Tooltip Module', () => {
    beforeEach(() => {
        // Reset DOM before each test
        document.body.innerHTML = '';
    });

    it('should initialize without errors when no tooltip elements exist', () => {
        expect(() => initTooltips()).not.toThrow();
    });

    it('should find and initialize tooltip elements', () => {
        // Setup: Create an element with data-tooltip
        document.body.innerHTML = `
      <span data-tooltip="Test tooltip content">Hover me</span>
    `;

        initTooltips();

        const tooltipElement = document.querySelector('[data-tooltip]');

        // Verify the element has the tooltip class
        expect(tooltipElement.classList.contains('has-tooltip')).toBe(true);

        // Verify cursor style was applied
        expect(tooltipElement.style.cursor).toBe('help');

        // Verify tabindex was added for accessibility
        expect(tooltipElement.getAttribute('tabindex')).toBe('0');
    });

    it('should create tooltip box in the DOM', () => {
        document.body.innerHTML = `
      <span data-tooltip="Test content">Test</span>
    `;

        initTooltips();

        // Check that a tooltip-box was created
        const tooltipBox = document.querySelector('.tooltip-box');
        expect(tooltipBox).toBeTruthy();
        expect(tooltipBox.textContent).toBe('Test content');
        expect(tooltipBox.getAttribute('role')).toBe('tooltip');
    });

    it('should handle multiple tooltip elements', () => {
        document.body.innerHTML = `
      <span data-tooltip="First tooltip">First</span>
      <span data-tooltip="Second tooltip">Second</span>
      <span data-tooltip="Third tooltip">Third</span>
    `;

        initTooltips();

        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        const tooltipBoxes = document.querySelectorAll('.tooltip-box');

        expect(tooltipElements.length).toBe(3);
        expect(tooltipBoxes.length).toBe(3);
    });
});
