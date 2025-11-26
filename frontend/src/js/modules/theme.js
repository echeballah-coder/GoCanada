/**
 * @file modules/theme.js
 * @description Gestion du Dark Mode avec toggle et sauvegarde des préférences.
 */

// Clés pour localStorage
const THEME_KEY = 'user-theme-preference';

/**
 * Initialise le système de thème (détection, toggle, sauvegarde).
 */
export function initThemeToggle() {
  // 1. Charger le thème sauvegardé ou détecter la préférence système
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  // Appliquer le thème initial
  setTheme(initialTheme);

  // 2. Créer et ajouter le bouton toggle dans le header
  createThemeToggle();

  // 3. Écouter les changements de préférence système (optionnel)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_KEY)) {
      // Si l'utilisateur n'a pas défini de préférence manuelle
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/**
 * Applique un thème (light ou dark).
 * @param {string} theme - 'light' ou 'dark'
 */
export function setTheme(theme) {
  const html = document.documentElement;

  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
  }

  // Mettre à jour l'icône du bouton
  updateToggleIcon(theme);

  // Sauvegarder la préférence
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Crée le bouton de toggle et l'ajoute au header.
 */
function createThemeToggle() {
  const headerContainer = document.querySelector('.header-container');
  if (!headerContainer) return;

  // Créer le bouton
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.setAttribute('aria-label', 'Changer de thème');
  toggleBtn.innerHTML = getSunIcon(); // Icône par défaut

  // Event listener
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Insérer avant le menu toggle (ou après le logo si pas de menu)
  const menuToggle = headerContainer.querySelector('.menu-toggle');
  if (menuToggle) {
    headerContainer.insertBefore(toggleBtn, menuToggle);
  } else {
    headerContainer.appendChild(toggleBtn);
  }
}

/**
 * Met à jour l'icône du bouton selon le thème actif.
 * @param {string} theme - 'light' ou 'dark'
 */
function updateToggleIcon(theme) {
  const toggleBtn = document.querySelector('.theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.innerHTML = theme === 'dark' ? getSunIcon() : getMoonIcon();
}

/**
 * Retourne l'icône Soleil (SVG).
 */
function getSunIcon() {
  return `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
    `;
}

/**
 * Retourne l'icône Lune (SVG).
 */
function getMoonIcon() {
  return `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    `;
}
