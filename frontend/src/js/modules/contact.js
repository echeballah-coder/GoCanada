/**
 * @file modules/contact.js
 * @description Gestion du formulaire de contact (Validation, Envoi AJAX, Feedback UI).
 */

export function initContactForm() {
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Récupérer les données
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const submitBtn = form.querySelector('button[type="submit"]');

        // Désactiver le bouton pour éviter les doubles soumissions
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';

        // Masquer le message précédent
        if (messageDiv) messageDiv.style.display = 'none';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Succès
                showMessage(messageDiv, result.message, 'success');
                form.reset();
            } else {
                // Erreur API (Validation ou autre)
                showMessage(messageDiv, result.message || "Une erreur est survenue.", 'error');

                // Afficher les erreurs de validation spécifiques si disponibles
                if (result.errors && Array.isArray(result.errors)) {
                    console.warn("Erreurs de validation:", result.errors);
                    // On pourrait les afficher sous chaque champ ici
                }
            }

        } catch (error) {
            console.error('Erreur Réseau:', error);
            showMessage(messageDiv, "Impossible de contacter le serveur. Vérifiez votre connexion.", 'error');
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer le message';
        }
    });
}

/**
 * Affiche un message de feedback à l'utilisateur.
 * @param {HTMLElement} element - L'élément DOM où afficher le message.
 * @param {string} text - Le texte du message.
 * @param {string} type - Le type de message ('success' ou 'error').
 */
function showMessage(element, text, type) {
    if (!element) return;

    element.textContent = text;
    element.style.display = 'block';

    if (type === 'success') {
        element.style.backgroundColor = '#d4edda';
        element.style.color = '#155724';
        element.style.border = '1px solid #c3e6cb';
    } else {
        element.style.backgroundColor = '#f8d7da';
        element.style.color = '#721c24';
        element.style.border = '1px solid #f5c6cb';
    }
}
