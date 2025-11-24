/**
 * Gestionnaire du formulaire de contact
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

        // Désactiver le bouton
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        messageDiv.style.display = 'none';

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
                // Erreur API
                showMessage(messageDiv, result.message || "Une erreur est survenue.", 'error');
            }

        } catch (error) {
            console.error('Erreur:', error);
            showMessage(messageDiv, "Impossible de contacter le serveur. Veuillez réessayer plus tard.", 'error');
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer le message';
        }
    });
}

function showMessage(element, text, type) {
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
