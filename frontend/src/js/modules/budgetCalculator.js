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
    // Ces seuils sont indicatifs pour l'étudiant
    if (totalMensuel < 1000) {
        commentaire = "⚠️ Budget très serré. Assurez-vous qu'il est réaliste pour votre ville de destination.";
    } else if (totalMensuel >= 1000 && totalMensuel < 1500) {
        commentaire = "✅ Budget raisonnable pour un étudiant en colocation.";
    } else if (totalMensuel >= 1500 && totalMensuel < 2500) {
        commentaire = "👍 Budget confortable. Vous devriez être à l'aise.";
    } else {
        commentaire = "💰 Budget élevé. Vérifiez si vous pouvez économiser sur certains postes.";
    }

    return {
        totalMensuel,
        totalAnnuel,
        commentaire
    };
}
