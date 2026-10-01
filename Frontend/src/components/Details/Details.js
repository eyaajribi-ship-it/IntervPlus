import React from 'react';
import './Details.css';
import logoEntreprise from "../../assets/entre.png";

function Details({ demande, onBack }) {
  const annee = new Date().getFullYear();

  // Fonction pour déterminer la classe CSS de couleur
  const getStatusCode = (statut, valide) => {
    if (valide === 1 || valide === true) return "traitee"; // Vert si validé
    if (!statut) return "en-cours";
    
    const s = statut.toLowerCase();
    if (s.includes("urgente")) return "urgente"; // Rouge
    if (s.includes("traite") || s.includes("termine")) return "traitee"; // Vert
    return "en-cours"; // Orange/Jaune
  };

  if (!demande) return (
    <div className="details-page">
      <header className="top-bar">
         <h1 className="app-name">IntervPlus</h1>
      </header>
      <main className="main-content">
        <div className="details-container">
          <h2>Aucune demande sélectionnée</h2>
          <button className="admin-btn" onClick={onBack}>Retour aux demandes</button>
        </div>
      </main>
    </div>
  );

  // On calcule le code couleur ici
  const couleurClasse = getStatusCode(demande.statut, demande.valide);

  return (
    <div className="details-page">
      <header className="top-bar">
        <h1 className="app-name">IntervPlus</h1>
        <button className="admin-btn" onClick={onBack}>Retour à la liste</button>
      </header>

      <main className="main-content">
        <div className="details-container">
          <div className="details-card">
            <div className="details-header">
              {/* Application de la couleur dynamique ici */}
              <span className={`status-badge ${couleurClasse}`}>
                {demande.valide ? "Validée" : demande.statut}
              </span>
              <h2>{demande.titre || demande.type}</h2>
              <p className="request-id">Demande n° {demande.id}</p>
            </div>

            <hr />

            <div className="details-body">
              <section className="detail-section">
                <h3>Description</h3>
                <p>{demande.description || "Aucune description fournie pour cette intervention."}</p>
              </section>

              <div className="info-grid">
                <div className="info-item">
                  <strong>Date d'intervention :</strong>
                  {/* Formatage de la date SQL */}
                  <span>{demande.date_intervention ? new Date(demande.date_intervention).toLocaleDateString() : demande.date}</span>
                </div>
                <div className="info-item">
                  <strong>Technicien affecté :</strong>
                  <span className="tech-name">
                    {demande.technicien || "Eya (Technicien en charge)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="details-actions">
              <button className="action-btn-blue">Contacter le support</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer-bar">
        <div className="footer-content">
          <img src={logoEntreprise} alt="Logo BMI" className="footer-logo" />
          <p>IntervPlus &copy; {annee} - Système de notification Professionnel</p>
        </div>
      </footer>
    </div>
  );
}

export default Details;