/**
 * @file toast.js
 * @description Système de notifications type "Toast" pour l'application.
 */

/**
 * Affiche une notification temporaire (Toast).
 * @param {string} message - Le message à afficher.
 * @param {string} type - Le type de notification ('success', 'error', 'info').
 */
export function showToast(message, type = 'info') {
    // Créer le conteneur s'il n'existe pas
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Créer l'élément toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Ajouter au DOM
    container.appendChild(toast);

    // Animation d'entrée
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Supprimer après 3 secondes
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        });
    }, 3000);
}
