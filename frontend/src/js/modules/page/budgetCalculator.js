import Chart from 'chart.js/auto';
import { formatCurrency } from '../../utils/format.js';
import { getCSSVariable } from '../../utils/dom.js';

let budgetChartInstance = null;

/**
 * Initialise le calculateur de budget.
 */
export function initBudgetCalculator() {
  const form = document.getElementById('budget-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const results = calculateBudget(data);
    displayResults(results);
  });

  const resetBtn = document.getElementById('reset-budget');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => resetCalculator(form));
  }

  // Live calculation: recalculer au fur et à mesure que l'utilisateur saisit
  const inputs = form.querySelectorAll('input[type="number"], input[type="text"], input[type="tel"]');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const results = calculateBudget(data);
      // Met à jour les éléments de résultat sans masquer le formulaire
      displayLiveResults(results);
    });
  });
}

/**
 * Calcule le budget total avec catégories.
 */
function calculateBudget(data) {
  const tuition = parseFloat(data.tuition) || 0;
  const housing = parseFloat(data.housing) || 0;
  const food = parseFloat(data.food) || 0;
  const transport = parseFloat(data.transport) || 0;
  const other = parseFloat(data.other) || 0;

  const monthlyExpenses = housing + food + transport + other;
  const totalAnnual = tuition + monthlyExpenses * 12;

  // Logique métier : Commentaire selon budget
  const commentaire = getCommentaryForBudget(totalAnnual);

  // Mettre à jour le graphique
  updateChart(housing, food, transport, other, tuition / 12);

  return {
    totalMensuel: monthlyExpenses,
    totalAnnuel: totalAnnual,
    commentaire,
  };
}

/**
 * Génère un commentaire selon le budget total.
 */
function getCommentaryForBudget(totalAnnual) {
  if (totalAnnual < 20000) {
    return "⚠️ Budget très serré. Assurez-vous d'avoir des économies supplémentaires ou une bourse.";
  }
  if (totalAnnual < 35000) {
    return '✅ Budget réaliste pour une année étudiante standard au Canada.';
  }
  return "🌟 Budget confortable. Vous devriez être à l'aise pour vos études.";
}

/**
 * Affiche les résultats dans le DOM.
 */
function displayResults(results) {
  const formSection = document.getElementById('budget-form-section');
  const resultsSection = document.getElementById('budget-results');

  if (!formSection || !resultsSection) return;

  formSection.style.display = 'none';
  resultsSection.style.display = 'block';
  resultsSection.scrollIntoView({ behavior: 'smooth' });

  // Injecter les valeurs formatées
  const monthlyEl = document.getElementById('total-monthly');
  const annualEl = document.getElementById('total-annual');
  const commentEl = document.getElementById('result-comment');

  if (monthlyEl) monthlyEl.textContent = formatCurrency(results.totalMensuel);
  if (annualEl) annualEl.textContent = formatCurrency(results.totalAnnuel);
  if (commentEl) commentEl.textContent = results.commentaire;
}

/**
 * Met à jour les valeurs affichées en live sans changer la visibilité des sections.
 */
function displayLiveResults(results) {
  const monthlyEl = document.getElementById('total-monthly');
  const annualEl = document.getElementById('total-annual');
  const commentEl = document.getElementById('result-comment');

  if (monthlyEl) monthlyEl.textContent = formatCurrency(results.totalMensuel);
  if (annualEl) annualEl.textContent = formatCurrency(results.totalAnnuel);
  if (commentEl) commentEl.textContent = results.commentaire;
}

/**
 * Réinitialise le calculateur.
 */
function resetCalculator(form) {
  form.reset();
  const formSection = document.getElementById('budget-form-section');
  const resultsSection = document.getElementById('budget-results');

  if (formSection) formSection.style.display = 'block';
  if (resultsSection) resultsSection.style.display = 'none';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Crée ou met à jour le graphique Chart.js.
 */
function updateChart(housing, food, transport, other, monthlyTuition) {
  const ctx = document.getElementById('budgetChart');
  if (!ctx) return;

  if (budgetChartInstance) {
    budgetChartInstance.destroy();
  }

  const colors = ['#D80621', '#FFC107', '#2962FF', '#00C853', '#9E9E9E'];
  const bgCardColor = getCSSVariable('--color-bg-card');
  const textColor = getCSSVariable('--color-text-main');

  budgetChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Logement', 'Nourriture', 'Transport', 'Autres', 'Scolarité (mensuel)'],
      datasets: [
        {
          data: [housing, food, transport, other, monthlyTuition],
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: bgCardColor,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: textColor },
        },
        tooltip: {
          callbacks: {
            label: context => {
              let label = context.label || '';
              if (label) label += ': ';
              if (context.parsed !== null) {
                label += formatCurrency(context.parsed);
              }
              return label;
            },
          },
        },
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  });
}
