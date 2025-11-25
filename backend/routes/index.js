/**
 * @file routes/index.js
 * @description Définition des routes de l'API.
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers');

// ==========================================
// Routes Publiques
// ==========================================

/**
 * @route POST /api/contact
 * @description Reçoit les données du formulaire de contact.
 * @access Public
 */
router.post('/contact', controller.handleContactForm);

module.exports = router;
