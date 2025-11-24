// Scripts globaux

document.addEventListener('DOMContentLoaded', () => {
    console.log('GoCanada - Algérie app initialized');

    initNavigation();
    initMobileMenu();
});

/**
 * Gère l'état actif des liens de navigation
 */
function initNavigation() {
    const currentPath = window.location.pathname;
    // Gérer le cas de la racine '/' qui correspond à 'index.html'
    const pageName = currentPath === '/' ? 'index.html' : currentPath.split('/').pop();

    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        // Si le lien correspond à la page actuelle
        if (linkHref === pageName || (pageName === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Gère l'ouverture/fermeture du menu mobile
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

            // Toggle classes
            menuToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-open');

            // Update a11y attribute
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
}
