import React, { useState, useEffect, useRef } from "react";
import "./Connexion.css";
import logo from "../../assets/mister maint.png"; 
import logoEntreprise from "../../assets/entre.png";

function Connexion({ onLoginSuccess, onAdminClick, shouldReset }) {
  const [nom, setNom] = useState(""); 
  const [password, setPassword] = useState("");
  const [messageErreur, setMessageErreur] = useState("");
  const nomInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  
  const annee = new Date().getFullYear();

  // Vider les champs et le message d'erreur au montage du composant
  useEffect(() => {
    setNom("");
    setPassword("");
    setMessageErreur("");
    // Vider aussi les inputs directement
    if (nomInputRef.current) {
      nomInputRef.current.value = "";
    }
    if (passwordInputRef.current) {
      passwordInputRef.current.value = "";
    }
    
    // Ajouter un délai pour vider après que le navigateur finisse l'autofill
    const timeout = setTimeout(() => {
      if (nomInputRef.current) {
        nomInputRef.current.value = "";
      }
      if (passwordInputRef.current) {
        passwordInputRef.current.value = "";
      }
      setNom("");
      setPassword("");
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  // Également vider quand shouldReset change pour plus de sécurité
  useEffect(() => {
    if (shouldReset) {
      setNom("");
      setPassword("");
      setMessageErreur("");
      if (nomInputRef.current) {
        nomInputRef.current.value = "";
      }
      if (passwordInputRef.current) {
        passwordInputRef.current.value = "";
      }
      
      // Ajouter un délai pour vider après que le navigateur finisse l'autofill
      const timeout = setTimeout(() => {
        if (nomInputRef.current) {
          nomInputRef.current.value = "";
        }
        if (passwordInputRef.current) {
          passwordInputRef.current.value = "";
        }
        setNom("");
        setPassword("");
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [shouldReset]);

  
  const handleLogin = async () => {
    
    if (nom === "" || password === "") {
        setMessageErreur("Veuillez remplir tous les champs !");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom: nom, password: password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            setMessageErreur(""); 
            setNom(""); 
            setPassword("");
            onLoginSuccess(); 
        } else {
            
            setMessageErreur(data.message || "Nom ou mot de passe incorrect");
        }
    } catch (error) {
        setMessageErreur("Erreur : Le serveur ne répond pas.");
    }
  };

  return (
    <div className="login-page">
      <header className="top-bar">
        <h1 className="app-name">IntervPlus</h1>
        <button className="admin-btn" onClick={onAdminClick}>
          Espace Admin
        </button>
      </header>

      <main className="main-content">
        <div className="login-card">
          <div className="card-header">
             <img src={logo} alt="Logo" className="logo-small" />
          </div>
          
          {/* AFFICHAGE DU MESSAGE D'ERREUR */}
          {messageErreur && (
            <div style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "5px", marginBottom: "15px", textAlign: "center", fontWeight: "bold" }}>
              {messageErreur}
            </div>
          )}

          <div className="form-group">
            <div className="input-row">
              <label>Nom d'utilisateur :</label>
              <input 
                ref={nomInputRef}
                type="text" 
                placeholder="Identifiant"
                autoComplete="new-password"
                spellCheck="false"
                value={nom} 
                onChange={(e) => setNom(e.target.value)} 
              />
            </div>
            
            <div className="input-row">
              <label>Mot de passe :</label>
              <input 
                ref={passwordInputRef}
                type="password" 
                placeholder="Mot de passe"
                autoComplete="new-password"
                spellCheck="false"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>

          <div className="button-container">
            {/* On appelle handleLogin ici au lieu de directement onLoginSuccess */}
            <button className="login-btn" onClick={handleLogin}>
              Se connecter
            </button>
          </div>
        </div>
      </main>

      <footer className="footer-bar">
        <div className="footer-content">
          <img src={logoEntreprise} alt="Logo Entreprise" className="footer-logo" />
          <p>IntervPlus &copy; {annee}- Système de notification Professionnel</p>
        </div>
      </footer>
    </div>
  );
}

export default Connexion;