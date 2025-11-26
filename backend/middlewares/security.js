/**
 * @file middlewares/security.js
 * @description Middlewares de sécurité (Helmet, CSP, etc.).
 */

const helmet = require('helmet');

/**
 * Middleware Helmet avec CSP configurée.
 * Sécurise les en-têtes HTTP et contrôle les sources de contenu.
 */
const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      manifestSrc: ["'self'"],
      workerSrc: ["'self'", 'blob:'],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
});

module.exports = { securityMiddleware };
