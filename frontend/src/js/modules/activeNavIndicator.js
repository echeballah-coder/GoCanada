/**
 * @file modules/activeNavIndicator.js
 * @description Indique visuellement la page active dans la navigation.
 * Ajoute automatiquement la classe 'active' au lien correspondant.
 */

/**
 * Initialise l'indicateur de page active.
 */
export function initActiveNavIndicator() {
  // Récupérer tous les liens de navigation
  const navLinks = document.querySelectorAll('.nav-link');

  if (navLinks.length === 0) {
    console.warn('Active Nav Indicator: No nav links found');
    return;
  }

  // Obtenir le chemin de la page actuelle (sans le domaine)
  const currentPath = window.location.pathname;

  // Extraire juste le nom du fichier (ex: '/parcours.html' → 'parcours.html')
  const currentPage = currentPath.split('/').pop() || 'index.html';

  // Trouver et marquer le lien actif
  navLinks.forEach(link => {
    // Récupérer le href du lien
    const linkHref = link.getAttribute('href');

    // Vérifier si le lien correspond à la page actuelle
    if (linkHref === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      // Retirer 'active' des autres liens (au cas où)
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // Cas spécial : Si on est à la racine ('/'), activer 'index.html'
  if (currentPath === '/' || currentPage === '') {
    const homeLink = Array.from(navLinks).find(link => link.getAttribute('href') === 'index.html');

    if (homeLink) {
      homeLink.classList.add('active');
      homeLink.setAttribute('aria-current', 'page');
    }
  }
}
