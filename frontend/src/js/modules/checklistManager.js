/**
 * ==========================================================================
 * Module : checklistManager.js
 * Description : Gère les checklists interactives.
 *               - Sauvegarde l'état (coché/décoché) dans le localStorage
 *               - Calcule la progression (%)
 *               - Déclenche des récompenses (Confetti, Toast)
 * ==========================================================================
 */

import { showToast } from './toast.js';
import { triggerConfetti } from './confetti.js';

/**
 * Initialise toutes les sections de checklist présentes sur la page.
 */
export function initChecklists() {
    const sections = document.querySelectorAll('.checklist-section');
    if (sections.length === 0) return;

    // 1. Charger l'état précédent depuis le stockage du navigateur
    loadState();

    // 2. Configurer chaque section
    sections.forEach(section => {
        const sectionId = section.dataset.section; // ex: "academic", "financial"
        const checkboxes = section.querySelectorAll('input[type="checkbox"]');
        const progressBar = section.querySelector('.progress-bar');
        const progressText = section.querySelector('.progress-text');
        const resetBtn = section.querySelector('.btn-reset');

        // Initialisation visuelle de la barre de progression
        updateProgress(checkboxes, progressBar, progressText);

        // Écouteur d'événements sur chaque case à cocher
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // A. Sauvegarder le nouvel état
                saveState(sectionId, checkboxes);

                // B. Mettre à jour la barre de progression
                const percent = updateProgress(checkboxes, progressBar, progressText);

                // C. Gamification : Célébration si 100% atteint
                if (percent === 100) {
                    triggerConfetti();
                    showToast('Félicitations ! Section complétée ! 🎉', 'success');
                }
            });
        });

        // Gestion du bouton "Réinitialiser"
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Voulez-vous vraiment réinitialiser cette section ?')) {
                    checkboxes.forEach(cb => cb.checked = false); // Tout décocher
                    saveState(sectionId, checkboxes);             // Sauvegarder vide
                    updateProgress(checkboxes, progressBar, progressText); // Reset barre
                    showToast('Section réinitialisée.', 'info');
                }
            });
        }
    });
}

/**
 * Calcule et met à jour l'affichage de la progression.
 * @param {NodeList} checkboxes - Liste des checkboxes de la section
 * @param {HTMLElement} progressBar - Élément DOM de la barre
 * @param {HTMLElement} progressText - Élément DOM du texte (%)
 * @returns {number} Le pourcentage calculé (0-100)
 */
function updateProgress(checkboxes, progressBar, progressText) {
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;

    // Calcul du pourcentage (arrondi)
    const percent = total === 0 ? 0 : Math.round((checked / total) * 100);

    // Mise à jour du DOM
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `${percent}%`;

    return percent;
}

/**
 * Sauvegarde l'état des checkboxes dans le localStorage.
 * Clé de stockage : "checklist_{sectionId}"
 */
function saveState(sectionId, checkboxes) {
    const state = {};
    checkboxes.forEach(cb => {
        // On associe l'ID de la checkbox à son état (true/false)
        state[cb.dataset.id] = cb.checked;
    });
    localStorage.setItem(`checklist_${sectionId}`, JSON.stringify(state));
}

/**
 * Restaure l'état des checkboxes depuis le localStorage.
 */
function loadState() {
    const sections = document.querySelectorAll('.checklist-section');
    sections.forEach(section => {
        const sectionId = section.dataset.section;
        const saved = localStorage.getItem(`checklist_${sectionId}`);

        if (saved) {
            const state = JSON.parse(saved);
            const checkboxes = section.querySelectorAll('input[type="checkbox"]');

            checkboxes.forEach(cb => {
                // Si l'ID est trouvé dans la sauvegarde, on coche la case
                if (state[cb.dataset.id]) {
                    cb.checked = true;
                }
            });
        }
    });
}
