/**
 * ==========================================================================
 * Fichier : server.js
 * Description : Serveur Backend Node.js / Express.
 *               Gère la sécurité, la compression, les logs et le routage.
 * Auteur : GoCanada Team
 * ==========================================================================
 */

const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
const config = require('./config/config');
const { securityMiddleware } = require('./middlewares');

// Initialisation de l'application Express
const app = express();
const PORT = config.PORT;

// ==========================================
// 1. MIDDLEWARES (Sécurité & Performance)
// ==========================================

/**
 * Helmet : Sécurise les en-têtes HTTP avec CSP configurée.
 */
app.use(securityMiddleware);

/**
 * Compression : Compresse les réponses HTTP (Gzip).
 * Réduit considérablement la taille des fichiers transférés (HTML, CSS, JS).
 */
app.use(compression());

/**
 * Morgan : Logger de requêtes HTTP.
 * 'combined' pour la prod (détails complets), 'dev' pour le développement (concis).
 */
app.use(morgan(config.ENV === 'production' ? 'combined' : 'dev'));

// Middleware pour parser le corps des requêtes en JSON (pour les formulaires POST)
app.use(express.json());

// ==========================================
// 2. FICHIERS STATIQUES
// ==========================================

// Servir les fichiers publics (HTML, Images) depuis le dossier 'frontend/public'
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Servir les assets (CSS, JS) depuis le dossier 'frontend/src'
// Accessible via l'URL /src/...
app.use('/src', express.static(path.join(__dirname, '../frontend/src')));

// ==========================================
// 3. ROUTES API
// ==========================================

const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// ==========================================
// 4. GESTION DES ERREURS (404)
// ==========================================

/**
 * Middleware 404 (Catch-all)
 * Si aucune route précédente ne correspond, on renvoie la page 404 personnalisée.
 */
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../frontend/public/404.html'));
});

// ==========================================
// 5. DÉMARRAGE DU SERVEUR
// ==========================================

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 SERVEUR DÉMARRÉ`);
    console.log(`==================================================`);
    console.log(`👉 URL Locale  : http://localhost:${PORT}`);
    console.log(`🔒 Sécurité    : Helmet Activé`);
    console.log(`📦 Performance : Compression Gzip Activée`);
    console.log(`📝 Logs        : Morgan Activé`);
    console.log(`==================================================\n`);
  });
}

// Exporter l'application pour les tests (supertest) et l'importation par d'autres modules
module.exports = app;
