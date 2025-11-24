/**
 * Gestionnaire des checklists avec sauvegarde localStorage
 */

const STORAGE_PREFIX = 'gocanada_checklist_';

export function initChecklists() {
    const sections = document.querySelectorAll('.checklist-section');

    if (sections.length === 0) return;

    sections.forEach(section => {
        const sectionId = section.dataset.section;
        const checkboxes = section.querySelectorAll('input[type="checkbox"]');
        const resetButton = section.querySelector('.btn-reset');

        // Charger l'état initial
        loadState(sectionId, checkboxes);

        // Écouter les changements
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                saveState(sectionId, checkboxes);
            });
        });

        // Bouton Reset
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                if (confirm('Voulez-vous vraiment réinitialiser cette liste ?')) {
                    resetSection(sectionId, checkboxes);
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
