/**
 * @file modules/contact.js
 * @description Gestion du formulaire de contact (Validation, Envoi AJAX, Feedback UI).
 */

import { showToast } from './toast.js';

export function initContactForm() {
    const form = document.getElementById('contact-form');
    // const messageDiv = document.getElementById('form-message'); // Plus besoin du div statique

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
                showToast(result.message, 'success');
                form.reset();
            } else {
                // Erreur API (Validation ou autre)
                showToast(result.message || "Une erreur est survenue.", 'error');

                if (result.errors && Array.isArray(result.errors)) {
                    console.warn("Erreurs de validation:", result.errors);
                }
            }

        } catch (error) {
            console.error('Erreur Réseau:', error);
            showToast("Impossible de contacter le serveur. Vérifiez votre connexion.", 'error');
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer le message';
        }
    });
}
