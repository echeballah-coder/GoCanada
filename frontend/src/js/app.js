/**
 * @file app.js
 * @description Point d'entrée principal du JavaScript Frontend.
 * Orchestre l'initialisation des modules et gère la navigation globale.
 */

import { calculateBudget } from './modules/budgetCalculator.js';
import { initChecklists } from './modules/checklistManager.js';
import { initParcours } from './modules/parcours.js';
import { initContactForm } from './modules/contact.js';

/**
 * Initialisation de l'application au chargement du DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 GoCanada – Algérie : Application Démarrée');

    try {
        initNavigation();
        initMobileMenu();

        // Initialisation conditionnelle des modules (ils vérifient eux-mêmes s'ils doivent s'activer)
        initBudgetSimulator();
        initChecklists();
        initParcours();
        initContactForm();

    } catch (error) {
        console.error("Erreur critique lors de l'initialisation de l'application :", error);
    }
});

/**
 * Gère l'état actif des liens de navigation (Soulignement du lien courant).
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
            link.setAttribute('aria-current', 'page'); // Accessibilité
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

/**
 * Gère l'ouverture/fermeture du menu mobile (Burger).
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

        // Fermer le menu si on clique en dehors (Optionnel mais UX friendly)
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('is-open')) {
                menuToggle.classList.remove('is-active');
                mainNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * Initialise le simulateur de budget si le formulaire est présent.
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
        document.getElementById('result-monthly').textContent = `${result.totalMensuel.toLocaleString('fr-CA')} $CAD`;
        document.getElementById('result-annual').textContent = `${result.totalAnnuel.toLocaleString('fr-CA')} $CAD`;
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
