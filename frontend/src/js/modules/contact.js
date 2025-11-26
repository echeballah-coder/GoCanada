/**
 * @file contact.js
 * @description Gestion du formulaire de contact.
 */

import { showToast } from './toast.js';

export function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                showToast('Message envoyé avec succès ! 🚀', 'success');
                form.reset();
            } else {
                throw new Error(result.message || 'Erreur inconnue');
            }
        } catch (error) {
            console.error('Erreur:', error);
            showToast('Erreur lors de l\'envoi du message. Veuillez réessayer.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}
