/**
 * @file server.js
 * @description Point d'entrée du serveur Express pour l'application GoCanada.
 * Configure les middlewares, les routes et le serveur statique.
 */

const express = require('express');
const path = require('path');
const config = require('./config/config');
const routes = require('./routes');

const app = express();

// ==========================================
// 1. Middlewares Globaux
// ==========================================

// Parse les requêtes JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log des requêtes pour le débogage (Méthode + URL)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ==========================================
// 2. Gestion des Fichiers Statiques
// ==========================================

// Servir les sources frontend (CSS, JS) via /src
// Permet d'importer les modules JS et CSS directement depuis le HTML
app.use('/src', express.static(path.join(__dirname, '../frontend/src')));

// Servir les fichiers publics (HTML, Images, Assets) à la racine
app.use(express.static(path.join(__dirname, '../frontend/public')));

// ==========================================
// 3. Routes API
// ==========================================

app.use('/api', routes);

// ==========================================
// 4. Gestion des Erreurs (404 & 500)
// ==========================================

// Gestion des routes non trouvées (404)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../frontend/public/404.html'), (err) => {
        if (err) {
            res.status(404).send("<h1>404 - Page non trouvée</h1>");
        }
    });
});

// Gestion globale des erreurs serveur (500)
app.use((err, req, res, next) => {
    console.error("Erreur Serveur:", err.stack);
    res.status(500).json({
        success: false,
        message: "Une erreur interne est survenue.",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ==========================================
// 5. Démarrage du Serveur
// ==========================================

app.listen(config.PORT, () => {
    console.log(`\n🚀 Serveur démarré avec succès !`);
    console.log(`🌍 URL locale : http://localhost:${config.PORT}`);
    console.log(`📂 Dossier Public : ${path.join(__dirname, '../frontend/public')}\n`);
});
