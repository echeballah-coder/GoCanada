```javascript
// Scripts globaux
import { calculateBudget } from './modules/budgetCalculator.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('GoCanada - Algérie app initialized');

    initNavigation();
    initMobileMenu();
    initBudgetSimulator();
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

/**
 * Initialise le simulateur de budget si on est sur la page budget.html
 */
function initBudgetSimulator() {
    const form = document.getElementById('budget-form');
    const resultsSection = document.getElementById('budget-results');

    if (!form) return; // On n'est pas sur la page budget

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération des données
        const formData = new FormData(form);
        const data = {
            tuition: formData.get('tuition'),
            housing: formData.get('housing'),
            food: formData.get('food'),
            transport: formData.get('transport'),
            other: formData.get('other')
        };

        // Calcul
        const result = calculateBudget(data);

        // Affichage des résultats
        document.getElementById('result-monthly').textContent = `${ result.totalMensuel.toLocaleString('fr-CA') } $CAD`;
        document.getElementById('result-annual').textContent = `${ result.totalAnnuel.toLocaleString('fr-CA') } $CAD`;
        document.getElementById('result-comment').textContent = result.commentaire;

        // Afficher la section résultats si elle était cachée
        resultsSection.style.display = 'block';

        // Scroll vers les résultats sur mobile pour une meilleure UX
        if (window.innerWidth < 768) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Bouton Reset
    const resetButton = document.getElementById('reset-budget');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            form.reset();
            resultsSection.style.display = 'none';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
```
