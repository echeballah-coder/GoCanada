Résumé de la réorganisation - GoCanada

But : documenter la réorganisation (structure, principes, ajout de modules)

1) Ancienne → Nouvelle (résumé)
- Ancienne structure (clé) :
  - `frontend/src/js/modules/*` contenait à la fois des modules UI et des modules spécifiques aux pages.
  - Pas de dossier `utils` centralisé pour fonctions DOM/validation/format.
  - Backend : `server.js`, `routes/`, `controllers/` mais pas de middlewares centralisés.

- Nouvelle structure (clé) :
  - `frontend/src/js/utils/` : utilitaires réutilisables (`dom.js`, `validation.js`, `format.js`, `common.js`, `index.js`).
  - `frontend/src/js/modules/ui/` : composants d'interface réutilisables (ex: `mobileMenu`, `tooltip`, `index.js`).
  - `frontend/src/js/modules/page/` : modules spécifiques à une page (ex: `parcours`, `contact`, `budgetCalculator`, `index.js`).
  - `frontend/src/css/index.css` : point d'entrée CSS centralisé.
  - `backend/middlewares/` et `backend/utils/` : middlewares et utilitaires (ex: `security.js`, `validation.js`).

2) Principes de la nouvelle organisation
- Séparation UI vs Page :
  - `ui/` contient les composants d'interface réutilisables sur plusieurs pages (menus, tooltips, toasts...).
  - `page/` contient la logique spécifique à une page (accordéons, simulateurs, formulaires page-centrés).
- Utilitaires centralisés :
  - Mettre les fonctions DOM/validation/formatage communes dans `utils/` pour éviter la duplication et faciliter les tests.
- Index files :
  - `utils/index.js`, `modules/ui/index.js`, `modules/page/index.js` exposent des API uniques pour des imports propres dans `app.js`.
- Backend :
  - Extraire middlewares et validations communes pour clarifier `server.js` et faciliter les tests/middlewares additionnels.
- Non-régression :
  - Les comportements n'ont pas été modifiés — seuls des regroupements et petites corrections locales ont été appliqués.

3) Comment ajouter un nouveau module frontend
- Si c'est un composant réutilisable (ex: modal, dropdown) :
  1. Créer `frontend/src/js/modules/ui/monComposant.js` et exporter `initMyComponent`.
  2. Ajouter l'export dans `frontend/src/js/modules/ui/index.js`.
  3. Importer depuis `frontend/src/js/app.js` via `import { initMyComponent } from './modules/ui/index.js';` et initialiser dans `DOMContentLoaded`.
- Si c'est spécifique à une page :
  1. Créer `frontend/src/js/modules/page/maPage.js` et exporter `initMaPage`.
  2. Ajouter l'export dans `frontend/src/js/modules/page/index.js`.
  3. Charger conditionnellement depuis `app.js` lorsque `window.location.pathname` correspond à la page.
- Pour utilitaires :
  - Ajouter la fonction dans `frontend/src/js/utils/` et l'exporter via `utils/index.js`.

4) Comment ajouter un nouveau module backend
- Middlewares : créer `backend/middlewares/monMiddleware.js` et l'exporter via `backend/middlewares/index.js`.
- Utilitaires : ajouter sous `backend/utils/` et l'exporter via `backend/utils/index.js`.
- Routes : ajouter une route sous `backend/routes/` ou enrichir `routes/index.js` pour requérir un nouveau contrôleur.

5) Fichiers supprimés dans cette étape (Étape 4 — Nettoyage final)
- `frontend/src/js/modules/mobileMenu.js` (duplication → remplacé par `modules/ui/mobileMenu.js`)
- `frontend/src/js/modules/tooltip.js` (duplication → remplacé par `modules/ui/tooltip.js`)
- `frontend/src/js/modules/parcours.js` (duplication → remplacé par `modules/page/parcours.js`)
- `frontend/src/js/modules/contact.js` (duplication → remplacé by `modules/page/contact.js`)
- `frontend/src/js/modules/budgetCalculator.js` (duplication → replaced by `modules/page/budgetCalculator.js`)

6) Commandes utiles (lancer & tester)
- Installer dépendances (si nécessaire) :

```powershell
cd frontend; npm install
cd ..\backend; npm install
```

- Lancer le backend :

```powershell
cd backend
npm start
# ou pour dev
npm run dev
```

- Lancer les tests frontend :

```powershell
cd frontend
npm test
```

- Lancer les tests backend :

```powershell
cd backend
npm test
```

- Formater le code (Prettier) :

```powershell
cd frontend; npm run format
cd ..\backend; npm run format
```

- Corriger automatiquement les problèmes ESLint :

```powershell
cd frontend; npm run lint:fix
cd ..\backend; npm run lint:fix
```

7) Confirmation actuelle
- Tests frontend : `3 suites, 12 tests` → PASS
- Tests backend : `1 suite, 2 tests` → PASS
- ESLint/Prettier : Prettier exécuté sur frontend+backend. ESLint exécuté (warnings remained on frontend, but no blocking errors; backend lint fixed). 

---

Si tu veux, je peux :
- supprimer définitivement les fichiers de backup ou créer un commit Git structuré avec ces changements ;
- générer un `CHANGELOG` ou un `PR description` prêt à être copié dans GitHub.

---

Fichier généré automatiquement le : 30 novembre 2025
