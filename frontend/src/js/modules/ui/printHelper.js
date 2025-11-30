/**
 * @file modules/printHelper.js
 * @description Aide à l'impression avec options de personnalisation.
 */

/**
 * Initialise le helper d'impression.
 */
export function initPrintHelper() {
  // Ajouter un bouton d'impression sur les pages imprimables
  const printablePages = ['checklists', 'budget', 'parcours'];
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');

  if (printablePages.some(page => currentPage.includes(page))) {
    addPrintButton();
  }
}

/**
 * Ajoute un bouton d'impression flottant.
 */
function addPrintButton() {
  const button = document.createElement('button');
  button.className = 'print-button';
  button.textContent = 'Imprimer cette page';
  button.setAttribute('aria-label', 'Imprimer la page');

  button.addEventListener('click', () => {
    preparePrintView();
    window.print();
  });

  document.body.appendChild(button);
}

/**
 * Prépare la vue pour l'impression.
 */
function preparePrintView() {
  // Ajouter la date d'impression
  const printHeader = document.createElement('div');
  printHeader.className = 'print-header';
  printHeader.setAttribute('data-print-date', new Date().toLocaleDateString('fr-FR'));

  const main = document.querySelector('main');
  if (main) {
    main.insertBefore(printHeader, main.firstChild);
  }

  // Ouvrir tous les accordéons du parcours pour l'impression
  const steps = document.querySelectorAll('.parcours-step');
  steps.forEach(step => {
    const content = step.querySelector('.step-content');
    if (content) {
      content.style.maxHeight = 'none';
    }
  });

  // Nettoyer après impression
  window.addEventListener(
    'afterprint',
    () => {
      printHeader.remove();
    },
    { once: true }
  );
}

/**
 * Fonction helper pour imprimer une section spécifique.
 * @param {string} selector - Sélecteur CSS de la section à imprimer.
 */
export function printSection(selector) {
  const section = document.querySelector(selector);
  if (!section) {
    console.error(`Section ${selector} not found`);
    return;
  }

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Impression - GoCanada</title>
            <link rel="stylesheet" href="/src/css/variables.css">
            <link rel="stylesheet" href="/src/css/print.css">
        </head>
        <body>
            ${section.outerHTML}
        </body>
        </html>
    `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
