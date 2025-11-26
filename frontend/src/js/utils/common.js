/**
 * @file utils/common.js
 * @description Utilitaires généraux (debounce, throttle, attente, etc.).
 */

/**
 * Retarde l'exécution d'une fonction (debounce).
 * Utile pour les événements de saisie ou redimensionnement fréquents.
 * @param {Function} fn - La fonction à exécuter.
 * @param {number} delay - Délai en millisecondes.
 * @returns {Function} Fonction retardée.
 *
 * @example
 * const onSearch = debounce((query) => { search(query); }, 300);
 * input.addEventListener('input', (e) => onSearch(e.target.value));
 */
export const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Limite la fréquence d'exécution d'une fonction (throttle).
 * @param {Function} fn - La fonction à exécuter.
 * @param {number} interval - Intervalle minimum en millisecondes.
 * @returns {Function} Fonction limitée.
 *
 * @example
 * const onScroll = throttle(() => { checkPosition(); }, 100);
 * window.addEventListener('scroll', onScroll);
 */
export const throttle = (fn, interval) => {
  let lastRunTime = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRunTime >= interval) {
      fn(...args);
      lastRunTime = now;
    }
  };
};

/**
 * Crée une Promesse qui se résout après un délai.
 * @param {number} ms - Délai en millisecondes.
 * @returns {Promise<void>}
 *
 * @example
 * await delay(1000); // Attendre 1 seconde
 */
export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Essaie une fonction, réessaie sur erreur avec délai exponentiel.
 * @param {Function} fn - Fonction à exécuter.
 * @param {number} [maxAttempts=3] - Nombre de tentatives.
 * @param {number} [baseDelay=1000] - Délai initial (doubler à chaque tentative).
 * @returns {Promise}
 *
 * @example
 * const data = await retry(() => fetch('/api/data'), 3, 500);
 */
export const retry = async (fn, maxAttempts = 3, baseDelay = 1000) => {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        const waitTime = baseDelay * Math.pow(2, attempt - 1);
        console.warn(`Tentative ${attempt} échouée. Nouvelle tentative dans ${waitTime}ms...`);
        await delay(waitTime);
      }
    }
  }
  throw lastError;
};

/**
 * Crée une Promesse qui timeout après un délai.
 * @param {Promise} promise - La Promesse à attendre.
 * @param {number} timeoutMs - Timeout en millisecondes.
 * @returns {Promise}
 *
 * @example
 * try {
 *   await withTimeout(fetch('/api/data'), 5000);
 * } catch (error) {
 *   console.error('Timeout ou erreur');
 * }
 */
export const withTimeout = (promise, timeoutMs) => {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout après ${timeoutMs}ms`)), timeoutMs)
  );
  return Promise.race([promise, timeoutPromise]);
};

/**
 * Enregistre un message de debug avec timestamp (déactivable via ENV).
 * @param {string} message - Le message à enregistrer.
 * @param {*} [data] - Données optionnelles à afficher.
 */
export const debug = (message, data) => {
  if (process.env.NODE_ENV !== 'production') {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] 🔍 ${message}`, data || '');
  }
};

/**
 * Clone profond un objet (simple alternative à structuredClone).
 * @param {*} obj - L'objet à cloner.
 * @returns {*} Clone profond.
 */
export const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Fusionne deux objets (shallow merge).
 * @param {Object} target - L'objet cible.
 * @param {Object} source - L'objet source.
 * @returns {Object} Nouvel objet fusionné.
 */
export const merge = (target, source) => {
  return { ...target, ...source };
};

/**
 * Groupe un tableau par une clé de propriété.
 * @param {Array} array - Le tableau à grouper.
 * @param {string} key - La clé de propriété.
 * @returns {Object} Objet groupé.
 *
 * @example
 * const students = [{grade: 'A', name: 'Alice'}, {grade: 'B', name: 'Bob'}];
 * groupBy(students, 'grade') => {A: [{...}], B: [{...}]}
 */
export const groupBy = (array, key) => {
  return array.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
};

/**
 * Filtre les valeurs nulles/undefined d'un objet.
 * @param {Object} obj - L'objet à filtrer.
 * @returns {Object} Nouvel objet filtré.
 */
export const filterEmpty = obj => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value != null));
};
