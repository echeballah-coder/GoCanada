/**
 * @file utils/format.js
 * @description Utilitaires de formatage pour nombres, devises, dates, etc.
 */

/**
 * Formate un nombre avec séparateurs de milliers (locale FR-DZ).
 * @param {number} value - La valeur à formater.
 * @param {number} [decimals=0] - Nombre de décimales.
 * @returns {string}
 *
 * @example
 * formatNumber(1234567.89) => "1 234 567,89"
 */
export const formatNumber = (value, decimals = 0) => {
  return parseFloat(value).toLocaleString('fr-DZ', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Formate une valeur en devise (CAD).
 * @param {number} value - La valeur à formater.
 * @param {string} [currency='CAD'] - Code de devise.
 * @returns {string}
 *
 * @example
 * formatCurrency(1500) => "1 500 $CAD"
 */
export const formatCurrency = (value, currency = 'CAD') => {
  return `${formatNumber(value)} $${currency}`;
};

/**
 * Formate une date selon la locale FR-DZ.
 * @param {Date|string|number} date - La date à formater.
 * @param {Object} [options] - Options de formatage Intl.DateTimeFormat.
 * @returns {string}
 *
 * @example
 * formatDate(new Date()) => "30/11/2025"
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options,
  };
  return new Date(date).toLocaleDateString('fr-DZ', defaultOptions);
};

/**
 * Formate une durée en heures/minutes/secondes.
 * @param {number} seconds - La durée en secondes.
 * @returns {string} Format "1h 30m 45s"
 */
export const formatDuration = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);

  return parts.length > 0 ? parts.join(' ') : '0s';
};

/**
 * Limite un texte à une longueur donnée et ajoute "...".
 * @param {string} text - Le texte à tronquer.
 * @param {number} length - Longueur maximale.
 * @param {string} [suffix='...'] - Suffixe d'ajout.
 * @returns {string}
 */
export const truncate = (text, length, suffix = '...') => {
  if (text.length <= length) return text;
  return text.slice(0, length - suffix.length) + suffix;
};

/**
 * Convertit un objet en paramètres URL.
 * @param {Object} params - L'objet de paramètres.
 * @returns {string} Format: "key1=value1&key2=value2"
 */
export const objectToURLParams = params => {
  return new URLSearchParams(params).toString();
};

/**
 * Convertit des paramètres URL en objet.
 * @param {string} queryString - La chaîne de paramètres (sans '?').
 * @returns {Object}
 */
export const urlParamsToObject = queryString => {
  const params = new URLSearchParams(queryString);
  const obj = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

/**
 * Capitalise la première lettre d'une chaîne.
 * @param {string} text - La chaîne à capitaliser.
 * @returns {string}
 */
export const capitalize = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Convertit un texte en slug (URL-friendly).
 * @param {string} text - Le texte à convertir.
 * @returns {string}
 *
 * @example
 * toSlug("Bonjour le Monde") => "bonjour-le-monde"
 */
export const toSlug = text => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
