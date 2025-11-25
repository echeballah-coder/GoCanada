/**
 * Gestionnaire des checklists avec sauvegarde localStorage et Gamification
 */

import { showToast } from './toast.js';
import { triggerConfetti } from './confetti.js';

const STORAGE_PREFIX = 'gocanada_checklist_';

export function initChecklists() {
    const sections = document.querySelectorAll('.checklist-section');

    if (sections.length === 0) return;

    sections.forEach(section => {
        const sectionId = section.dataset.section;
        const checkboxes = section.querySelectorAll('input[type="checkbox"]');
        const resetButton = section.querySelector('.btn-reset');
        const progressBar = section.querySelector('.progress-bar');
        const progressText = section.querySelector('.progress-text');

        // Charger l'état initial
        loadState(sectionId, checkboxes);
        updateProgress(checkboxes, progressBar, progressText);

        // Écouter les changements
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                saveState(sectionId, checkboxes);
                const percent = updateProgress(checkboxes, progressBar, progressText);

                // Feedback immédiat
                if (checkbox.checked) {
                    // Petit toast discret ou son (optionnel)
                }

                // Célébration si 100%
                if (percent === 100) {
                    triggerConfetti();
                    showToast('Félicitations ! Section complétée ! 🎉', 'success');
                }
            });
        });

        // Bouton Reset
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (confirm('Voulez-vous vraiment réinitialiser cette liste ?')) {
                    resetSection(sectionId, checkboxes);
                    updateProgress(checkboxes, progressBar, progressText);
                    showToast('Liste réinitialisée.', 'info');
                }
            });
        }
    });
}

function loadState(sectionId, checkboxes) {
    const savedData = localStorage.getItem(STORAGE_PREFIX + sectionId);
    if (savedData) {
        const state = JSON.parse(savedData);
        checkboxes.forEach(checkbox => {
            const id = checkbox.dataset.id;
            if (state[id]) {
                checkbox.checked = true;
            }
        });
    }
}

function saveState(sectionId, checkboxes) {
    const state = {};
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            state[checkbox.dataset.id] = true;
        }
    });
    localStorage.setItem(STORAGE_PREFIX + sectionId, JSON.stringify(state));
}

function resetSection(sectionId, checkboxes) {
    // Vider le storage
    localStorage.removeItem(STORAGE_PREFIX + sectionId);

    // Décocher visuellement
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

/**
 * Calcule et met à jour la barre de progression
 */
function updateProgress(checkboxes, progressBar, progressText) {
    if (!progressBar || !progressText) return 0;

    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = Math.round((checked / total) * 100);

    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${percent}%`;

    return percent;
}
