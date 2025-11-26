/**
 * @file modules/mobileMenu.js
 * @description Gestion du menu mobile (burger menu).
 * Permet d'ouvrir/fermer le menu avec animations fluides.
 */

/**
 * Initialise le menu mobile.
 */
export function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Vérifier que les éléments existent
    if (!menuToggle || !mainNav) {
        console.warn('Mobile menu: Elements not found');
        return;
    }

    /**
     * Toggle le menu (ouvrir/fermer).
     */
    const toggleMenu = () => {
        const isOpen = menuToggle.classList.contains('is-active');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    /**
     * Ouvre le menu mobile.
     */
    const openMenu = () => {
        menuToggle.classList.add('is-active');
        mainNav.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');

        // Empêcher le scroll du body quand le menu est ouvert
        document.body.style.overflow = 'hidden';
    };

    /**
     * Ferme le menu mobile.
     */
    const closeMenu = () => {
        menuToggle.classList.remove('is-active');
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');

        // Réactiver le scroll du body
        document.body.style.overflow = '';
    };

    // Event listener sur le bouton toggle
    menuToggle.addEventListener('click', toggleMenu);

    // Fermer le menu au clic sur un lien de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Délai court pour laisser l'animation se terminer
            setTimeout(closeMenu, 100);
        });
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // Fermer le menu si on clique en dehors (overlay)
    mainNav.addEventListener('click', (e) => {
        // Si on clique sur le nav lui-même (pas sur un enfant)
        if (e.target === mainNav) {
            closeMenu();
        }
    });
}
