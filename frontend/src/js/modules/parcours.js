/**
 * Gestionnaire de la page Parcours (Accordéon)
 */

export function initParcours() {
    const steps = document.querySelectorAll('.parcours-step');

    if (steps.length === 0) return;

    steps.forEach(step => {
        const header = step.querySelector('.step-header');

        header.addEventListener('click', () => {
            const isActive = step.classList.contains('is-active');

            // Fermer toutes les étapes
            closeAllSteps(steps);

            // Si l'étape n'était pas active, l'ouvrir
            if (!isActive) {
                openStep(step);
            }
        });
    });
}

function closeAllSteps(steps) {
    steps.forEach(step => {
        step.classList.remove('is-active');
        const content = step.querySelector('.step-content');
        content.style.maxHeight = null;
    });
}

function openStep(step) {
    step.classList.add('is-active');
    const content = step.querySelector('.step-content');
    // Calculer la hauteur réelle du contenu pour l'animation
    content.style.maxHeight = content.scrollHeight + "px";
}
