/**
 * ==========================================================================
 * Module : budgetCalculator.js
 * Description : Gère la logique du simulateur de budget.
 *               - Récupère les entrées utilisateur
 *               - Calcule les totaux mensuels et annuels
 *               - Affiche un graphique interactif (Doughnut Chart)
 *               - Fournit un feedback visuel (Commentaire)
 * Dépendances : Chart.js (chargé via CDN dans budget.html)
 * ==========================================================================
 */

let budgetChartInstance = null; // Stocke l'instance du graphique pour pouvoir le détruire/recréer

/**
 * Initialise le calculateur de budget.
 * Attache les écouteurs d'événements au formulaire.
 */
export function initBudgetCalculator() {
    const form = document.getElementById('budget-form');
    if (!form) return; // Sécurité : on quitte si le formulaire n'existe pas

    // Écouteur sur la soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Extraction des données du formulaire
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Calcul et Affichage
        const results = calculateBudget(data);
        displayResults(results, data);
    });

    // Écouteur sur le bouton "Refaire une simulation"
    const resetBtn = document.getElementById('reset-budget');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetCalculator(form);
        });
    }
}

/**
 * Calcule le budget total et génère un commentaire.
 * @param {Object} data - Les données du formulaire (tuition, housing, etc.)
 * @returns {Object} Les résultats calculés (mensuel, annuel, commentaire)
 */
function calculateBudget(data) {
    // Conversion des entrées en nombres (Float) avec valeur par défaut 0
    const tuition = parseFloat(data.tuition) || 0;
    const housing = parseFloat(data.housing) || 0;
    const food = parseFloat(data.food) || 0;
    const transport = parseFloat(data.transport) || 0;
    const other = parseFloat(data.other) || 0;

    // Calculs
    const monthlyExpenses = housing + food + transport + other;
    const totalAnnual = tuition + (monthlyExpenses * 12);

    // Logique métier : Commentaire selon le budget total
    let commentaire = "";
    if (totalAnnual < 20000) {
        commentaire = "⚠️ Budget très serré. Assurez-vous d'avoir des économies supplémentaires ou une bourse.";
    } else if (totalAnnual < 35000) {
        commentaire = "✅ Budget réaliste pour une année étudiante standard au Canada.";
    } else {
        commentaire = "🌟 Budget confortable. Vous devriez être à l'aise pour vos études.";
    }

    // Mise à jour du graphique avec les nouvelles données
    // Note: On divise les frais de scolarité par 12 pour la vue mensuelle du graphique
    updateChart(housing, food, transport, other, tuition / 12);

    return {
        totalMensuel: monthlyExpenses,
        totalAnnuel: totalAnnual,
        commentaire: commentaire
    };
}

/**
 * Affiche les résultats dans le DOM et fait défiler la page.
 * @param {Object} results - Les résultats calculés
 */
function displayResults(results) {
    // Bascule de l'affichage : Cache le formulaire, montre les résultats
    document.getElementById('budget-form-section').style.display = 'none';
    const resultsSection = document.getElementById('budget-results');
    resultsSection.style.display = 'block';

    // Animation de défilement fluide vers les résultats
    resultsSection.scrollIntoView({ behavior: 'smooth' });

    // Injection des valeurs formatées (ex: 1 200 $CAD)
    document.getElementById('total-monthly').textContent = `${results.totalMensuel.toLocaleString('fr-DZ')} $CAD`;
    document.getElementById('total-annual').textContent = `${results.totalAnnuel.toLocaleString('fr-DZ')} $CAD`;
    document.getElementById('result-comment').textContent = results.commentaire;
}

/**
 * Réinitialise le calculateur pour une nouvelle simulation.
 * @param {HTMLFormElement} form - Le formulaire à reset
 */
function resetCalculator(form) {
    form.reset();
    document.getElementById('budget-results').style.display = 'none';
    document.getElementById('budget-form-section').style.display = 'block';

    // Remonter en haut de page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Crée ou met à jour le graphique Chart.js.
 * @param {number} housing - Logement
 * @param {number} food - Nourriture
 * @param {number} transport - Transport
 * @param {number} other - Autres
 * @param {number} monthlyTuition - Scolarité (mensualisée)
 */
function updateChart(housing, food, transport, other, monthlyTuition) {
    const ctx = document.getElementById('budgetChart');
    if (!ctx) return;

    // Si un graphique existe déjà, on le détruit pour éviter les superpositions
    if (budgetChartInstance) {
        budgetChartInstance.destroy();
    }

    // Palette de couleurs
    const colors = ['#D80621', '#FFC107', '#2962FF', '#00C853', '#9E9E9E'];

    // Création du nouveau graphique
    budgetChartInstance = new Chart(ctx, {
        type: 'doughnut', // Type "Beignet"
        data: {
            labels: ['Logement', 'Nourriture', 'Transport', 'Autres', 'Scolarité (mensuel)'],
            datasets: [{
                data: [housing, food, transport, other, monthlyTuition],
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--color-bg-card').trim()
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-main').trim()
                    }
                },
                tooltip: {
                    callbacks: {
                        // Formatage personnalisé des tooltips (Ajout de "$CAD")
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed.toLocaleString('fr-DZ') + ' $CAD';
                            }
                            return label;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}
