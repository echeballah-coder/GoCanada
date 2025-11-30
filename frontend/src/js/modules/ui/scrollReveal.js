/**
 * @file modules/scrollReveal.js
 * @description Animations d'apparition au scroll (Intersection Observer).
 */

/**
 * Initialise les animations Scroll Reveal.
 */
export function initScrollReveal() {
  // Sélectionner tous les éléments à animer
  const elements = document.querySelectorAll('.fade-in');

  // Si pas d'éléments, pas besoin de continuer
  if (elements.length === 0) return;

  // Configuration de l'Intersection Observer
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px 0px -100px 0px', // Déclencher 100px avant que l'élément n'entre
    threshold: 0.15, // 15% de l'élément visible
  };

  // Callback quand un élément entre/sort du viewport
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // L'élément est visible, ajouter la classe 'revealed'
        entry.target.classList.add('revealed');

        // Optionnel : arrêter d'observer cet élément (animation une seule fois)
        observer.unobserve(entry.target);
      }
    });
  };

  // Créer l'observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observer chaque élément
  elements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Ajoute la classe fade-in aux éléments spécifiés.
 * @param {string} selector - Sélecteur CSS des éléments à animer.
 */
export function addFadeInClass(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => el.classList.add('fade-in'));
}
