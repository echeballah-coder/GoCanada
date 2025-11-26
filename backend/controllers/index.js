/**
 * @file controllers/index.js
 * @description Contrôleurs principaux de l'API.
 * REFACTORISÉ : Utilise utilitaires de validation réutilisables.
 */

const { validateContactForm } = require('../utils');

module.exports = {
  /**
   * Gère la soumission du formulaire de contact.
   * @param {Object} req - La requête Express.
   * @param {Object} res - La réponse Express.
   */
  handleContactForm: (req, res) => {
    try {
      // 1. Validation des données
      const { isValid, errors } = validateContactForm(req.body);

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation échouée.',
          errors: errors,
        });
      }

      // 2. Extraire les données validées
      const { nom, email, typeDemande, message } = req.body;

      // 3. Logique métier (Simulation d'envoi d'email ou sauvegarde DB)
      console.log('\n--- 📩 NOUVEAU MESSAGE DE CONTACT ---');
      console.log(`De     : ${nom} <${email}>`);
      console.log(`Sujet  : ${typeDemande}`);
      console.log(`Message: ${message}`);
      console.log('--------------------------------------\n');

      // 4. Réponse succès
      return res.status(200).json({
        success: true,
        message: 'Votre message a bien été reçu ! Notre équipe vous répondra sous 48h.',
      });
    } catch (error) {
      console.error('Erreur dans handleContactForm:', error);
      return res.status(500).json({
        success: false,
        message: 'Une erreur interne est survenue lors du traitement de votre demande.',
      });
    }
  },
};
