/**
 * @file utils/validation.js
 * @description Utilitaires de validation réutilisables.
 */

/**
 * Valide un email.
 * @param {string} email - L'email à valider.
 * @returns {boolean}
 */
export const isValidEmail = email => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

/**
 * Valide qu'une chaîne n'est pas vide (minLength optionnel).
 * @param {string} text - La chaîne à valider.
 * @param {number} [minLength=1] - Longueur minimale requise.
 * @returns {boolean}
 */
export const isValidText = (text, minLength = 1) => {
  return text && text.trim().length >= minLength;
};

/**
 * Valide un nombre (optionnel: intervalle min/max).
 * @param {*} value - La valeur à valider.
 * @param {number} [min=-Infinity] - Valeur minimale.
 * @param {number} [max=Infinity] - Valeur maximale.
 * @returns {boolean}
 */
export const isValidNumber = (value, min = -Infinity, max = Infinity) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Valide une URL.
 * @param {string} url - L'URL à valider.
 * @returns {boolean}
 */
export const isValidURL = url => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valide un formulaire avec des règles personnalisées.
 * @param {HTMLFormElement} form - Le formulaire à valider.
 * @param {Object} rules - Objet des règles (fieldName: validationFunction).
 * @returns {Object} {isValid: boolean, errors: {fieldName: [errorMessages]}}
 */
export const validateForm = (form, rules) => {
  const errors = {};
  let isValid = true;

  Object.entries(rules).forEach(([fieldName, validationFn]) => {
    const field = form.elements[fieldName];
    if (!field) return;

    const result = validationFn(field.value);
    if (result !== true) {
      isValid = false;
      errors[fieldName] = Array.isArray(result) ? result : [result];
    }
  });

  return { isValid, errors };
};

/**
 * Valide un objet de données avec des règles spécifiées.
 * @param {Object} data - Les données à valider.
 * @param {Object} rules - Objet des règles de validation.
 * @returns {Object} {isValid: boolean, errors: Object}
 *
 * @example
 * const rules = {
 *   nom: (value) => isValidText(value, 2) || "Le nom doit avoir au moins 2 caractères",
 *   email: (value) => isValidEmail(value) || "Email invalide"
 * };
 * const { isValid, errors } = validateData(formData, rules);
 */
export const validateData = (data, rules) => {
  const errors = {};
  let isValid = true;

  Object.entries(rules).forEach(([fieldName, validationFn]) => {
    const value = data[fieldName];
    const result = validationFn(value);

    if (result !== true) {
      isValid = false;
      errors[fieldName] = result;
    }
  });

  return { isValid, errors };
};
