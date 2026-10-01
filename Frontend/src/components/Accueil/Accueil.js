import React, { useState } from "react";
import './Accueil.css';
import logoEntreprise from "../../assets/entre.png";

// On ajoute "onShowList" dans les paramètres (props)
function Accueil({ onLogout, onShowList }) {
  const annee = new Date().getFullYear();
  const [showNotif, setShowNotif] = useState(false);

  return (
    <div className="accueil-page">
      <header className="top-bar">
        <h1 className="app-name">IntervPlus</h1>
        <div className="header-right">
          <div className="notification-container" onClick={() => setShowNotif(!showNotif)}>
            <span className="bell-icon">🔔</span>
            <span className="notification-badge">3</span>
            
            {showNotif && (
              <div className="notification-dropdown">
                <button className="dropdown-item" onClick={(e) => { e.stopPropagation(); alert("Notifications activées"); }}>
                  🔔 Activer les notifications
                </button>
                <button className="dropdown-item" onClick={(e) => { e.stopPropagation(); alert("Mode sourdine activé"); }}>
                  🔕 Mettre en sourdine
                </button>
                <div className="dropdown-divider"></div>
                <p className="dropdown-info">3 nouvelles demandes</p>
              </div>
            )}
          </div>
          <button className="admin-btn" onClick={onLogout}>Déconnexion</button>
        </div>
      </header>

      <main className="main-content" onClick={() => setShowNotif(false)}>
        <div className="dashboard-container">
          <section className="welcome-banner">
            <div className="welcome-text">
              <h2>Bienvenue, Eya!</h2>
              <p>Système de gestion des demandes d'intervention</p>
            </div>
            {/* ICI : On appelle onShowList au lieu de navigate */}
            <button className="view-requests-btn" onClick={onShowList}>
              Voir les demandes
            </button>
          </section>

          <div className="summary-grid">
            <div className="summary-card">
              <h3>Demandes en cours</h3>
              <p className="stat-number">12</p>
            </div>
            <div className="summary-card">
              <h3>Demandes terminées ce mois</h3>
              <p className="stat-number">28</p>
            </div>
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

export default Accueil;