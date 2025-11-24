const express = require('express');
const router = express.Router();
const controller = require('../controllers');

// Route pour le formulaire de contact
router.post('/contact', controller.handleContactForm);

module.exports = router;
