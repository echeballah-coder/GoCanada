/**
 * @file controllers/index.js
 * @description Contrôleurs principaux de l'API.
 */

module.exports = {
    /**
     * Gère la soumission du formulaire de contact.
     * @param {Object} req - La requête Express.
     * @param {Object} res - La réponse Express.
     */
    handleContactForm: (req, res) => {
        try {
            const { nom, email, typeDemande, message } = req.body;

            // 1. Validation des entrées
            const errors = [];
            if (!nom || nom.trim().length < 2) errors.push("Le nom est invalide.");
            if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push("L'email est invalide.");
            if (!message || message.trim().length < 10) errors.push("Le message doit contenir au moins 10 caractères.");

            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Validation échouée.",
                    errors: errors
                });
            }

            // 2. Logique métier (Simulation d'envoi d'email ou sauvegarde DB)
            console.log("\n--- 📩 NOUVEAU MESSAGE DE CONTACT ---");
            console.log(`De     : ${nom} <${email}>`);
            console.log(`Sujet  : ${typeDemande}`);
            console.log(`Message: ${message}`);
            console.log("--------------------------------------\n");

            // 3. Réponse succès
            return res.status(200).json({
                success: true,
                message: "Votre message a bien été reçu ! Notre équipe vous répondra sous 48h."
            });

        } catch (error) {
            console.error("Erreur dans handleContactForm:", error);
            return res.status(500).json({
                success: false,
                message: "Une erreur interne est survenue lors du traitement de votre demande."
            });
        }
    }
};
