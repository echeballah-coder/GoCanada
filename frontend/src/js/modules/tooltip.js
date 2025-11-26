/**
 * @file modules/tooltip.js
 * @description Système de tooltips (infobulles) pour expliquer les termes techniques.
 * Utilise l'attribut data-tooltip pour afficher des explications au survol.
 */

/**
 * Initialise le système de tooltips.
 */
export function initTooltips() {
    // Sélectionner tous les éléments avec l'attribut data-tooltip
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    if (tooltipElements.length === 0) {
        console.log('Tooltips: No elements with data-tooltip found');
        return;
    }

    tooltipElements.forEach(element => {
        // Rendre l'élément focusable pour l'accessibilité
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }

        // Ajouter un indicateur visuel (curseur help)
        element.style.cursor = 'help';
        element.classList.add('has-tooltip');

        // Créer l'élément tooltip
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltipBox = createTooltipElement(tooltipText);

        // Événements pour afficher/masquer le tooltip
        element.addEventListener('mouseenter', () => showTooltip(element, tooltipBox));
        element.addEventListener('mouseleave', () => hideTooltip(tooltipBox));
        element.addEventListener('focus', () => showTooltip(element, tooltipBox));
        element.addEventListener('blur', () => hideTooltip(tooltipBox));

        // Support mobile : tap pour afficher/masquer
        element.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                toggleTooltip(tooltipBox);
            }
        });
    });

    console.log(`✅ Tooltips initialized: ${tooltipElements.length} element(s)`);
}

/**
 * Crée un élément tooltip DOM.
 * @param {string} text - Le texte du tooltip.
 * @returns {HTMLElement} L'élément tooltip.
 */
function createTooltipElement(text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-box';
    tooltip.textContent = text;
    tooltip.setAttribute('role', 'tooltip');
    document.body.appendChild(tooltip);
    return tooltip;
}

/**
 * Affiche le tooltip à la position appropriée.
 * @param {HTMLElement} element - L'élément déclencheur.
 * @param {HTMLElement} tooltipBox - L'élément tooltip.
 */
function showTooltip(element, tooltipBox) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Positionner le tooltip au-dessus de l'élément
    tooltipBox.style.left = `${rect.left + scrollLeft + rect.width / 2}px`;
    tooltipBox.style.top = `${rect.top + scrollTop - 10}px`;

    // Afficher avec animation
    tooltipBox.classList.add('visible');
}

/**
 * Masque le tooltip.
 * @param {HTMLElement} tooltipBox - L'élément tooltip.
 */
function hideTooltip(tooltipBox) {
    tooltipBox.classList.remove('visible');
}

/**
 * Toggle le tooltip (pour mobile).
 * @param {HTMLElement} tooltipBox - L'élément tooltip.
 */
function toggleTooltip(tooltipBox) {
    tooltipBox.classList.toggle('visible');
}
