/**
 * @file utils/validation.js
 * @description Utilitaires de validation backend.
 */

/**
 * Valide un email.
 * @param {string} email - L'email à valider.
 * @returns {boolean}
 */
const isValidEmail = email => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

/**
 * Valide qu'une chaîne n'est pas vide avec longueur minimale.
 * @param {string} text - La chaîne à valider.
 * @param {number} minLength - Longueur minimale.
 * @returns {boolean}
 */
const isValidText = (text, minLength = 1) => {
  return text && text.trim().length >= minLength;
};

/**
 * Valide les données du formulaire de contact.
 * @param {Object} data - Les données du formulaire.
 * @returns {{isValid: boolean, errors: Array}}
 */
const validateContactForm = data => {
  const { nom, email, message } = data;
  const errors = [];

  if (!isValidText(nom, 2)) {
    errors.push('Le nom doit avoir au moins 2 caractères.');
  }
  if (!isValidEmail(email)) {
    errors.push("L'email est invalide.");
  }
  if (!isValidText(message, 10)) {
    errors.push('Le message doit contenir au moins 10 caractères.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  isValidEmail,
  isValidText,
  validateContactForm,
};
