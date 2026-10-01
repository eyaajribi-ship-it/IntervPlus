import React, { useState, useEffect } from 'react';
import './demandes.css'; 
import logoEntreprise from "../../assets/entre.png";

function Liste({ onBack, onSelectRequest }) {
  const annee = new Date().getFullYear();
  
  // État pour stocker les demandes venant de la base de données
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  // CHARGEMENT DES DONNÉES DEPUIS MYSQL
  useEffect(() => {
    fetch("http://localhost:5000/api/interventions") // On récupère toutes les demandes
      .then((res) => res.json())
      .then((data) => {
        setDemandes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement demandes:", err);
        setLoading(false);
      });
  }, []);

  // Fonction pour transformer le statut en code couleur CSS
  const getStatusCode = (statut) => {
    if (!statut) return "en-cours";
    const s = statut.toLowerCase();
    if (s.includes("urgente")) return "urgente";
    if (s.includes("traite") || s.includes("termine")) return "traitee";
    return "en-cours";
  };

  return (
    <div className="liste-page">
      <header className="top-bar">
        <h1 className="app-name">IntervPlus</h1>
        <button className="admin-btn" onClick={onBack}>Retour</button>
      </header>

      <main className="main-content">
        <div className="table-container">
          <div className="table-header">
            <h2>Liste des demandes</h2>
          </div>
          
          {loading ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Chargement des données...</p>
          ) : (
            <table className="demandes-table">
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th>Type d'intervention</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {demandes.length > 0 ? (
                  demandes.map((d) => (
                    <tr key={d.id}>
                      <td><strong>{d.id}</strong></td>
                      <td>{d.titre}</td> {/* 'titre' correspond à ta table SQL */}
                      <td>
                        <div className="status-container">
                          {/* On utilise la logique de validation pour la couleur */}
                          <span className={`status-dot ${d.valide ? "traitee" : getStatusCode(d.statut)}`}></span>
                          <span className={`status-text ${d.valide ? "traitee" : getStatusCode(d.statut)}`}>
                            {d.valide ? "Validée" : d.statut}
                          </span>
                        </div>
                      </td>
                      <td>
                        <button className="details-btn" onClick={() => onSelectRequest(d)}>
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center' }}>Aucune demande trouvée.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <footer className="footer-bar">
        <div className="footer-content">
          <img src={logoEntreprise} alt="Logo" className="footer-logo" />
          <p>IntervPlus &copy; {annee}- Système de notification Professionnel</p>
        </div>
      </footer>
    </div>
  );
}

export default Liste;