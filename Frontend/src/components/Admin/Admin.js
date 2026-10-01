import React, { useState, useEffect, useRef } from 'react';
import './Admin.css';

function Admin({ onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour l'erreur
  const adminCodeRef = useRef(null);
  
  const SECRET_CODE = "1234";

  useEffect(() => {
    setAdminCode("");
    setErrorMessage(""); // On vide l'erreur au chargement
  }, []);

  // LOGIQUE DE VÉRIFICATION
  const handleVerify = () => {
    if (adminCode === SECRET_CODE) {
      setIsAuthenticated(true);
      setErrorMessage(""); // Efface l'erreur en cas de succès
    } else {
      setIsAuthenticated(false);
      setErrorMessage("Code incorrect ! Accès refusé."); // Message d'erreur
      setAdminCode(""); // On vide le champ pour réessayer
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-lock-screen">
        <div className="lock-card">
          <h2>🔒 Accès Admin</h2>
          <p>Entrez le code pour gérer le système</p>

          {/* AFFICHAGE DE L'ERREUR */}
          {errorMessage && (
            <p style={{ color: "red", backgroundColor: "#ffdada", padding: "5px", borderRadius: "5px", fontWeight: "bold" }}>
              {errorMessage}
            </p>
          )}

          <input 
            type="password" 
            placeholder="C o d e s e c r e t" 
            value={adminCode}
            onChange={(e) => {
                setAdminCode(e.target.value);
                if(errorMessage) setErrorMessage(""); // Efface l'erreur quand on recommence à taper
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
          />
          <button className="verify-btn" onClick={handleVerify}>Vérifier</button>
          <button className="back-btn" onClick={onBack}>Retour</button>
        </div>
      </div>
    );
  }

  // INTERFACE DE GESTION (S'affiche si le code est 1234)
  return (
    <div className="admin-dashboard">
      <header className="top-bar">
        <h1 className="app-name">Supervision Admin</h1>
        <button className="admin-btn" onClick={() => {
            setIsAuthenticated(false);
            setAdminCode("");
        }}>Déconnexion</button>
      </header>

      <main className="main-content">
        <div className="admin-sections">
          <div className="admin-card">
            <h3>👥 Comptes Utilisateurs</h3>
            <p>Gérer les accès des techniciens et les rôles.</p>
            <button className="action-btn">Voir les comptes</button>
          </div>

          <div className="admin-card">
            <h3>📝 Contrôle des Demandes</h3>
            <p>Vérifier la validité et la cohérence des données.</p>
            <button className="action-btn">Valider les interventions</button>
          </div>

          <div className="admin-card">
            <h3>📊 Vue d'ensemble</h3>
            <p>Suivi global de l'état du système.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;