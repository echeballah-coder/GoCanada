/**
 * @file modules/toast.js
 * @description Système de notifications Toast (Succès, Erreur, Info).
 */

/**
 * Affiche une notification Toast.
 * @param {string} message - Le message à afficher.
 * @param {string} type - 'success', 'error', ou 'info' (défaut: 'info').
 * @param {number} duration - Durée en ms avant disparition (défaut: 4000).
 */
export function showToast(message, type = 'info', duration = 4000) {
    // 1. Créer le conteneur s'il n'existe pas
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // 2. Créer l'élément Toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Icône selon le type
    let icon = '';
    if (type === 'success') icon = '✅';
    else if (type === 'error') icon = '❌';
    else icon = 'ℹ️';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close">&times;</button>
    `;

    // 3. Ajouter au conteneur
    container.appendChild(toast);

    // 4. Animation d'entrée (via CSS keyframes ou transition)
    // On force un reflow pour que la transition CSS fonctionne si on utilise opacity/transform
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // 5. Gestion de la fermeture (Click)
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        removeToast(toast);
    });

    // 6. Auto-dismiss
    setTimeout(() => {
        removeToast(toast);
    }, duration);
}

/**
 * Supprime un toast avec animation de sortie.
 * @param {HTMLElement} toast 
 */
function removeToast(toast) {
    toast.classList.remove('show');
    toast.classList.add('hide');

    // Attendre la fin de l'animation CSS (ex: 0.3s)
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }

        // Supprimer le conteneur s'il est vide
        const container = document.getElementById('toast-container');
        if (container && container.children.length === 0) {
            container.parentElement.removeChild(container);
        }
    }, 300);
}
