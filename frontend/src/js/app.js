/**
 * ==========================================================================
 * Fichier : app.js
 * Description : Point d'entrée principal (Main Entry Point) de l'application.
 *               Ce fichier orchestre le chargement des modules en fonction
 *               de la page visitée par l'utilisateur.
 * Auteur : GoCanada Team
 * ==========================================================================
 */

// Modules globaux (interface, thème, animations)
import {
  initThemeToggle,
  initScrollReveal,
  initMobileMenu,
  initTooltips,
  initActiveNavIndicator,
  initTimeline,
  initPrintHelper,
  initPWA
} from './modules/ui/index.js';

// Modules spécifiques aux pages
import { initParcours, initContactForm, initBudgetCalculator, initChecklists } from './modules/page/index.js';

/**
 * Événement : DOMContentLoaded
 * Se déclenche quand le HTML est entièrement chargé et analysé.
 */
document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------
  // 1. INITIALISATION GLOBALE (S'exécute sur toutes les pages)
  // ---------------------------------------------------------

  // Gestion du Thème (Dark/Light Mode)
  initThemeToggle();

  // Menu mobile (Burger)
  initMobileMenu();

  // Indicateur de page active
  initActiveNavIndicator();

  // Tooltips (infobulles)
  initTooltips();

  // Print helper (bouton d'impression)
  initPrintHelper();

  // PWA (Service Worker)
  initPWA();

  // Animations d'apparition au défilement
  initScrollReveal();

  // ---------------------------------------------------------
  // 2. ROUTING CÔTÉ CLIENT (Chargement conditionnel)
  // ---------------------------------------------------------
  // On vérifie l'URL pour savoir quel script lancer.

  const path = window.location.pathname;

  if (path.includes('parcours.html')) {
    // Page Parcours : Accordéon des étapes + Timeline
    // console.log('📍 Page Parcours détectée');
    initParcours();
    initTimeline();
  } else if (path.includes('checklists.html')) {
    // Page Checklists : Gestion des tâches et progression
    // console.log('✅ Page Checklists détectée');
    initChecklists();
  } else if (path.includes('budget.html')) {
    // Page Budget : Calculateur et Graphiques
    // console.log('💰 Page Budget détectée');
    initBudgetCalculator();
  } else if (path.includes('contact.html')) {
    // Page Contact : Gestion du formulaire
    // console.log('📩 Page Contact détectée');
    initContactForm();
  }

  // console.log('🚀 GoCanada App Initialized Successfully');
});
