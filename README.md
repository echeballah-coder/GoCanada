
## Prérequis
- Node.js (v18+ recommandé)
- npm

## Installation
Depuis la racine du dépôt :

```powershell
npm run install:all
```

Cette commande installe les dépendances racine (s'il y en a) et celles du `backend`.
Pour installer les dépendances frontend séparément :

```powershell
cd frontend
npm install
```

## Lancer en développement
1. Installer dépendances (voir ci‑dessus).
2. Lancer le backend (qui sert le frontend statique) :

```powershell
npm run dev --prefix backend
```

Le serveur écoute sur `http://localhost:3000` par défaut (configurable via `PORT` env).

## Tests frontend
Depuis `frontend/` :

```powershell
cd frontend
npm test
```

## Build frontend
Depuis `frontend/` :

```powershell
npm run build
```

## Script d'ajout d'`enhancements.css`
Un script Node portable se trouve dans `frontend/scripts/add-enhancements.js`. Pour l'exécuter :

```powershell
cd frontend
npm run add:enhancements
```

Ce script insère une ligne `<link rel="stylesheet" href="/src/css/enhancements.css">` après la ligne `components.css` dans les fichiers HTML de `frontend/public`, si elle n'existe pas.

## Remarques et améliorations recommandées
- Vérifier la présence de `offline.html` si vous souhaitez un fallback complet hors-ligne (le service worker en fait référence).
- Activer / durcir la `Content-Security-Policy` si vous passez en production.
- Ajouter des tests pour le backend (ex: route POST `/api/contact`).
- Remplacer les scripts dépendants de Windows par des équivalents Node (fait pour `add-enhancements`).

---

Si vous souhaitez, je peux :
- corriger `sw.js` pour ne plus dépendre de `offline.html` si absent,
- ajouter un test API minimal pour `backend` et un script `npm test` pour le backend,
- exécuter les tests frontend et vous montrer le rapport de couverture.
