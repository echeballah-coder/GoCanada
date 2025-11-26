/**
 * @file modules/page/contact.js
 * @description Gestion du formulaire de contact.
 * REFACTORISÉ : Utilise utilitaires validation et simplifie la logique.
 */

import { showToast } from '../toast.js';
import { validateData, isValidEmail, isValidText } from '../../utils/validation.js';

/**
 * Initialise le formulaire de contact avec validation.
 */
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn?.textContent;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Récupérer et valider les données
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const rules = {
      nom: value => isValidText(value, 2) || 'Le nom doit avoir au moins 2 caractères.',
      email: value => isValidEmail(value) || "L'email est invalide.",
      message: value =>
        isValidText(value, 10) || 'Le message doit contenir au moins 10 caractères.',
    };

    const { isValid, errors } = validateData(data, rules);

    if (!isValid) {
      const errorMsg = Object.values(errors).join(' ');
      showToast(errorMsg, 'error');
      return;
    }

    // Envoyer les données
    await sendContactForm(data, form, submitBtn, originalText);
  });
}

/**
 * Envoie le formulaire de contact à l'API backend.
 */
async function sendContactForm(data, form, submitBtn, originalText) {
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      showToast('Message envoyé avec succès ! 🚀', 'success');
      form.reset();
    } else {
      throw new Error(result.message || 'Erreur inconnue');
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);
    showToast("Erreur lors de l'envoi. Veuillez réessayer.", 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}
