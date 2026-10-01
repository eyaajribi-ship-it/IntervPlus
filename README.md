# IntervPlus

Prototype d'application web de suivi des demandes d'intervention, avec une
interface adaptée à un usage mobile pour les techniciens sur le terrain.
Réalisé pendant mon stage de perfectionnement au Bureau de Management
Industriel (BMI), en janvier 2026.

## Technologies
- **Frontend** : React.js, JavaScript, CSS3
- **Backend** : Node.js, Express.js (API REST, CORS)
- **Base de données** : MySQL (XAMPP, phpMyAdmin)
- **Authentification** : connexion des techniciens (nom et mot de passe) et vérification administrateur par code
  
## Fonctionnalités
- Suivi des demandes d'intervention
- Authentification des techniciens
- Espace administrateur

## Structure du projet
```
Backend/    API REST Node.js / Express (server.js, port 5000)
Database/   Script SQL (intervplus_db.sql) avec des données de test
Frontend/   Interface React (port 3000)
```

## Lancer le projet

### Prérequis
Node.js et npm, MySQL (par exemple via XAMPP)

### Étapes
1. Démarrer MySQL (XAMPP), créer une base nommée `intervplus_db` dans phpMyAdmin, puis y importer le fichier `Database/intervplus_db.sql`.
2. Backend : dans `Backend`, lancer `npm install` puis `node server.js`
3. Frontend : dans `Frontend`, lancer `npm install` puis `npm start`
4. Ouvrir http://localhost:3000

## Comptes de test
Données fictives incluses dans le script SQL, à usage de démonstration uniquement :
- Technicien : `Ahmed` / `123456`
- Code administrateur : `1234`

## Auteure
Eya Jeribi, étudiante en Licence Technologie de l'Informatique, ISET Zaghouan