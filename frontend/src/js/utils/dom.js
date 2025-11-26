/**
 * @file utils/dom.js
 * @description Utilitaires DOM réutilisables pour simplifier les manipulations courantes.
 */

/**
 * Sélectionne un élément de manière sécurisée.
 * @param {string} selector - Le sélecteur CSS.
 * @param {HTMLElement} [parent=document] - Conteneur parent optionnel.
 * @returns {HTMLElement|null}
 */
export const querySelector = (selector, parent = document) => {
  return parent.querySelector(selector);
};

/**
 * Sélectionne tous les éléments correspondant au sélecteur.
 * @param {string} selector - Le sélecteur CSS.
 * @param {HTMLElement} [parent=document] - Conteneur parent optionnel.
 * @returns {NodeList}
 */
export const querySelectorAll = (selector, parent = document) => {
  return parent.querySelectorAll(selector);
};

/**
 * Sélectionne un élément par ID avec vérification.
 * @param {string} id - L'ID de l'élément.
 * @returns {HTMLElement|null}
 */
export const getElementByID = id => {
  return document.getElementById(id);
};

/**
 * Ajoute une classe à un élément s'il n'existe pas, la retire sinon.
 * @param {HTMLElement} element - L'élément cible.
 * @param {string} className - La classe à basculer.
 */
export const toggleClass = (element, className) => {
  element?.classList.toggle(className);
};

/**
 * Ajoute une ou plusieurs classes à un élément.
 * @param {HTMLElement} element - L'élément cible.
 * @param {...string} classNames - Les classes à ajouter.
 */
export const addClass = (element, ...classNames) => {
  element?.classList.add(...classNames);
};

/**
 * Retire une ou plusieurs classes d'un élément.
 * @param {HTMLElement} element - L'élément cible.
 * @param {...string} classNames - Les classes à retirer.
 */
export const removeClass = (element, ...classNames) => {
  element?.classList.remove(...classNames);
};

/**
 * Modifie plusieurs attributs d'un élément.
 * @param {HTMLElement} element - L'élément cible.
 * @param {Object} attributes - Objet des attributs à modifier.
 */
export const setAttributes = (element, attributes) => {
  if (!element) return;
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

/**
 * Affiche ou masque un élément.
 * @param {HTMLElement} element - L'élément cible.
 * @param {boolean} [show=true] - true = affiche, false = masque.
 */
export const toggleVisibility = (element, show = true) => {
  if (!element) return;
  element.style.display = show ? '' : 'none';
};

/**
 * Scrolle vers un élément de manière fluide.
 * @param {HTMLElement} element - L'élément vers lequel scroller.
 */
export const scrollToElement = element => {
  element?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Crée un élément DOM avec des attributs et du contenu.
 * @param {string} tag - La balise HTML (ex: 'div', 'span').
 * @param {Object} [options] - Options (className, id, attributes, textContent, innerHTML).
 * @returns {HTMLElement}
 */
export const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);

  if (options.className) {
    element.className = options.className;
  }
  if (options.id) {
    element.id = options.id;
  }
  if (options.textContent) {
    element.textContent = options.textContent;
  }
  if (options.innerHTML) {
    element.innerHTML = options.innerHTML;
  }
  if (options.attributes) {
    setAttributes(element, options.attributes);
  }

  return element;
};

/**
 * Ajoute un événement qui s'exécute une seule fois.
 * @param {HTMLElement} element - L'élément cible.
 * @param {string} eventType - Le type d'événement (ex: 'click').
 * @param {Function} handler - La fonction de rappel.
 */
export const addOneTimeListener = (element, eventType, handler) => {
  const wrapper = event => {
    handler(event);
    element.removeEventListener(eventType, wrapper);
  };
  element?.addEventListener(eventType, wrapper);
};

/**
 * Nettoie tous les enfants d'un élément.
 * @param {HTMLElement} element - L'élément cible.
 */
export const clearChildren = element => {
  if (!element) return;
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

/**
 * Désactiver le scroll du body (utile pour les modals/menus).
 */
export const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

/**
 * Réactiver le scroll du body.
 */
export const enableBodyScroll = () => {
  document.body.style.overflow = '';
};

/**
 * Récupère une variable CSS personnalisée.
 * @param {string} varName - Le nom de la variable (ex: '--color-primary').
 * @returns {string} La valeur de la variable.
 */
export const getCSSVariable = varName => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};
