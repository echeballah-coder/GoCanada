/**
 * Calcule le budget étudiant basé sur les entrées utilisateur.
 * @param {Object} data - Les données du formulaire (tuition, housing, food, transport, other)
 * @returns {Object} - Résultats calculés (totalMensuel, totalAnnuel, commentaire)
 */
export function calculateBudget(data) {
    // Conversion sécurisée en nombres (0 si vide ou invalide)
    const tuition = Number(data.tuition) || 0;
    const housing = Number(data.housing) || 0;
    const food = Number(data.food) || 0;
    const transport = Number(data.transport) || 0;
    const other = Number(data.other) || 0;

    // Calculs
    const totalMensuel = housing + food + transport + other;
    const totalAnnuel = (totalMensuel * 12) + tuition;

    // Détermination du commentaire
    let commentaire = "";

    // Seuils arbitraires basés sur le coût de la vie moyen au Canada (2024-2025)
    if (totalMensuel < 1000) {
        commentaire = "⚠️ Budget très serré. Assurez-vous qu'il est réaliste pour votre ville de destination.";
    } else if (totalMensuel >= 1000 && totalMensuel < 1500) {
        commentaire = "✅ Budget raisonnable pour un étudiant en colocation.";
    } else if (totalMensuel >= 1500 && totalMensuel < 2500) {
        commentaire = "👍 Budget confortable. Vous devriez être à l'aise.";
    } else {
        commentaire = "💰 Budget élevé. Vérifiez si vous pouvez économiser sur certains postes.";
    }

    // Mise à jour du graphique si Chart.js est chargé
    updateChart(housing, food, transport, other, tuition / 12); // On lisse les frais de scolarité sur 12 mois pour le visuel mensuel

    return {
        totalMensuel,
        totalAnnuel,
        commentaire
    };
}

let budgetChartInstance = null;

function updateChart(housing, food, transport, other, monthlyTuition) {
    const ctx = document.getElementById('budgetChart');
    if (!ctx) return;

    // Si le graphique existe déjà, on le détruit pour le recréer (ou on met à jour les données)
    if (budgetChartInstance) {
        budgetChartInstance.destroy();
    }

    // Couleurs du thème
    const colors = [
        '#D80621', // Rouge (Logement - souvent le plus gros)
        '#FFC107', // Jaune (Nourriture)
        '#2962FF', // Bleu (Transport)
        '#00C853', // Vert (Autres)
        '#9E9E9E'  // Gris (Scolarité mensuelle lissée)
    ];

    budgetChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Logement', 'Nourriture', 'Transport', 'Autres', 'Scolarité (mensuel)'],
            datasets: [{
                data: [housing, food, transport, other, monthlyTuition],
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1E293B' : '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#F1F5F9' : '#212529',
                        font: {
                            family: "'Segoe UI', sans-serif",
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(context.parsed);
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
