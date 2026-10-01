const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// --- CONFIGURATION MYSQL ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Vide par défaut sur XAMPP
    database: 'intervplus_db'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion MySQL:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL !');
});

// --- ROUTES ---

// 1. Route de Test
app.get('/', (req, res) => {
    res.send("Le serveur IntervPlus tourne parfaitement avec MySQL !");
});

// 2. Route de Connexion Utilisateur (Login par NOM et MDP)
app.post('/api/login', (req, res) => {
    const { nom, password } = req.body;
    const sql = "SELECT * FROM techniciens WHERE nom = ? AND mot_de_passe = ?";
    
    db.query(sql, [nom, password], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        
        if (result.length > 0) {
            // Succès : On renvoie les infos de l'utilisateur (Eya par exemple)
            res.json({ success: true, user: result[0] });
        } else {
            // Échec
            res.status(401).json({ success: false, message: "Nom ou mot de passe incorrect" });
        }
    });
});

// 3. Route de Vérification Admin 
app.post('/api/admin/verify', (req, res) => {
    const { code } = req.body;
    const sql = "SELECT * FROM admin_auth WHERE code_secret = ?";
    
    db.query(sql, [code], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length > 0) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false });
        }
    });
});
// Récupérer les interventions d'un technicien spécifique
app.get('/api/interventions/:techId', (req, res) => {
    const techId = req.params.techId;
    const sql = "SELECT * FROM interventions WHERE technicien_id = ?";
    
    db.query(sql, [techId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Route pour l'Admin : Valider une intervention
app.put('/api/admin/valider/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE interventions SET valide = TRUE, statut = 'Terminé' WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true, message: "Intervention validée !" });
    });
});
// Route pour récupérer toutes les interventions
app.get('/api/interventions', (req, res) => {
    const sql = "SELECT * FROM interventions";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur SQL:", err);
            return res.status(500).json({ error: "Erreur lors de la récupération des données" });
        }
        res.json(result); // Envoie les données (ton tableau avec 'Réparation Fuite') au frontend
    });
});

// --- LANCEMENT ---
app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`Prêt pour les tests avec Eya !`);
    console.log(`==========================================`);
});