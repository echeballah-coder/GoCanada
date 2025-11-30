# 🚀 Guide de Démarrage Rapide - GoCanada

## 📦 Installation

### 1. Installer toutes les dépendances (Frontend + Backend)

```bash
# Depuis la racine du projet
npm run install:all
```

Ou manuellement :

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## 🔧 Développement

### Lancer le serveur backend (mode développement)

```bash
cd backend
npm run dev
```

Le serveur sera accessible sur `http://localhost:3000`

### Lancer le serveur backend (mode production)

```bash
cd backend
npm start
```

---

## ✅ Tests

### Tests Frontend

```bash
cd frontend
npm test
```

Pour mode watch :
```bash
npm run test:watch
```

Pour coverage :
```bash
npm run test:coverage
```

### Tests Backend

```bash
cd backend
npm test
```

---

## 🎨 Linting & Formatage

### Frontend

```bash
cd frontend

# Vérifier le linting
npm run lint

# Corriger automatiquement
npm run lint:fix

# Vérifier le formatage
npm run format:check

# Formater le code
npm run format
```

### Backend

```bash
cd backend

# Vérifier le linting
npm run lint

# Corriger automatiquement
npm run lint:fix

# Formater le code
npm run format
```

### Depuis la racine (tout le projet)

```bash
npm run lint:all
```

---

## 🏗️ Build (Production)

### Build Frontend

```bash
cd frontend
npm run build
```

Cela va :
- Minifier le JavaScript (`build:js`)
- Optimiser le CSS (`build:css`)
- Créer le dossier `dist/`

---

## 📂 Structure du Projet

```
GoCanada/
├── frontend/           # Application cliente
│   ├── src/
│   │   ├── js/        # Code JavaScript
│   │   │   ├── modules/
│   │   │   │   ├── ui/      # Composants UI réutilisables
│   │   │   │   └── page/    # Modules spécifiques aux pages
│   │   │   └── utils/       # Fonctions utilitaires
│   │   └── css/       # Styles CSS
│   ├── public/        # Fichiers statiques (HTML, assets)
│   └── __tests__/     # Tests unitaires
│
└── backend/           # Serveur API Express
    ├── config/        # Configuration
    ├── routes/        # Définition des routes
    ├── controllers/   # Logique métier
    ├── middlewares/   # Middlewares (sécurité, etc.)
    ├── utils/         # Utilitaires backend
    └── __tests__/     # Tests API
```

---

## 🔍 Scripts Utiles

### Frontend

| Script | Description |
|--------|-------------|
| `npm test` | Lance les tests Jest |
| `npm run lint` | Vérifie la qualité du code |
| `npm run lint:fix` | Corrige les problèmes ESLint |
| `npm run format` | Formate le code avec Prettier |
| `npm run build` | Build de production |
| `npm run add:enhancements` | Ajoute enhancements.css aux HTML |
| `npm run generate:icons` | Génère les icônes PNG depuis SVG |

### Backend

| Script | Description |
|--------|-------------|
| `npm start` | Lance le serveur (production) |
| `npm run dev` | Lance le serveur (développement avec nodemon) |
| `npm test` | Lance les tests Jest |
| `npm run lint` | Vérifie la qualité du code |
| `npm run lint:fix` | Corrige les problèmes ESLint |
| `npm run format` | Formate le code avec Prettier |

### Racine

| Script | Description |
|--------|-------------|
| `npm run install:all` | Installe toutes les dépendances |
| `npm run lint:all` | Lint frontend + backend |
| `npm start` | Lance le backend |
| `npm run dev` | Lance le backend en mode dev |

---

## 🌐 URLs Importantes

| Page | URL |
|------|-----|
| Accueil | `http://localhost:3000/` |
| Parcours | `http://localhost:3000/parcours.html` |
| Budget | `http://localhost:3000/budget.html` |
| Checklists | `http://localhost:3000/checklists.html` |
| Contact | `http://localhost:3000/contact.html` |
| Ressources | `http://localhost:3000/ressources.html` |
| API Contact | `http://localhost:3000/api/contact` |

---

## 🐛 Debug

### Activer les logs de debug

Dans `frontend/src/js/utils/common.js`, la fonction `debug()` affiche des logs uniquement en développement.

Pour voir les logs :
1. Définir `NODE_ENV=development`
2. Les console.log de debug s'afficheront

### Erreurs communes

#### PowerShell : Exécution de scripts désactivée

Si vous obtenez l'erreur `UnauthorizedAccess` avec npm :

```bash
# Utiliser cmd au lieu de PowerShell
cmd /c "npm test"

# Ou activer les scripts PowerShell (en admin)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Port 3000 déjà utilisé

```bash
# Changer le port dans backend/.env
PORT=3001
```

---

## 📚 Documentation

- **README.md** : Documentation principale
- **README_REORG.md** : Guide de réorganisation
- **STRUCTURE.md** : Arborescence détaillée
- **ARCHITECTURE.md** : Schémas et architecture
- **VALIDATION.md** : Rapport de validation

---

## 🎯 Checklist Avant Commit

- [ ] `npm run lint:all` → Aucune erreur
- [ ] `npm test` (frontend) → Tous les tests passent
- [ ] `npm test` (backend) → Tous les tests passent
- [ ] Code formaté avec Prettier
- [ ] Commentaires à jour
- [ ] Documentation mise à jour

---

## 🤝 Contribution

1. Créer une branche : `git checkout -b feature/ma-fonctionnalite`
2. Faire les modifications
3. Tester : `npm test`
4. Committer : `git commit -m "feat: ma nouvelle fonctionnalité"`
5. Push : `git push origin feature/ma-fonctionnalite`
6. Créer une Pull Request

---

## 📞 Support

Pour toute question ou problème :
- Consulter la documentation dans les fichiers `.md`
- Vérifier les tests pour des exemples d'utilisation
- Consulter les commentaires dans le code

---

**Dernière mise à jour :** 30 novembre 2025  
**Version :** 1.0.0  
**Statut :** ✅ Production Ready
