/**
 * @file modules/lazyLoad.js
 * @description Lazy loading des images pour améliorer les performances.
 * Images chargées uniquement quand elles entrent dans le viewport.
 */

/**
 * Initialise le lazy loading des images.
 */
export function initLazyLoad() {
  // Support natif du lazy loading
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
    // console.log(`✅ Lazy loading natif: ${images.length} images`);
    return;
  }

  // Fallback avec Intersection Observer pour anciens navigateurs
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            loadImage(img);
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Charger 50px avant d'entrer dans le viewport
        threshold: 0.01,
      }
    );

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));

    // console.log(`✅ Lazy loading (Intersection Observer): ${images.length} images`);
  } else {
    // Fallback: charger toutes les images immédiatement
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(loadImage);
    // console.log(`⚠️ Lazy loading non supporté, chargement de ${images.length} images`);
  }
}

/**
 * Charge une image lazy.
 * @param {HTMLImageElement} img - L'élément image.
 */
function loadImage(img) {
  const src = img.dataset.src;
  if (!src) return;

  // Créer une nouvelle image pour pré-charger
  const tempImage = new Image();

  tempImage.onload = () => {
    img.src = src;
    img.classList.add('loaded');
    img.removeAttribute('data-src');
  };

  tempImage.onerror = () => {
    console.error(`Failed to load image: ${src}`);
    img.classList.add('error');
  };

  tempImage.src = src;
}

/**
 * Applique le lazy loading sur des images ajoutées dynamiquement.
 * @param {HTMLElement} container - Container avec les nouvelles images.
 */
export function applyLazyLoad(container) {
  const images = container.querySelectorAll('img[data-src]');

  if ('loading' in HTMLImageElement.prototype) {
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  } else if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    images.forEach(loadImage);
  }
}
