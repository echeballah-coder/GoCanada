// Contrôleurs de l'application

module.exports = {
    handleContactForm: (req, res) => {
        const { nom, email, typeDemande, message } = req.body;

        // Validation simple
        if (!nom || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Veuillez remplir tous les champs obligatoires (Nom, Email, Message)."
            });
        }

        // Log de la demande (simulation d'enregistrement)
        console.log("--- Nouvelle demande de contact ---");
        console.log("Nom:", nom);
        console.log("Email:", email);
        console.log("Type:", typeDemande);
        console.log("Message:", message);
        console.log("-----------------------------------");

        // Réponse de succès
        res.json({
            success: true,
            message: "Votre message a bien été envoyé ! Nous vous répondrons sous 48h."
        });
    }
};
