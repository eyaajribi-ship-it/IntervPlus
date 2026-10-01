import React, { useState } from "react";
import "./App.css";
import Connexion from "./components/Connexion/Connexion";
import Accueil from "./components/Accueil/Accueil";
import Demandes from "./components/demandes/demandes";
import Details from "./components/Details/Details";
import Admin from "./components/Admin/Admin";

function App() {
  // Gestion des pages : 'login', 'accueil', 'admin', 'demandes', 'details'
  const [page, setPage] = useState("login");
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [shouldResetLogin, setShouldResetLogin] = useState(false);

  return (
    <div className="App">
      <div className="phone-container">
        
        {/* Utilise une key dynamique pour recréer le composant et vider les champs */}
        {page === "login" && (
          <Connexion 
            key={`login-${shouldResetLogin}`}
            onLoginSuccess={() => setPage("accueil")} 
            onAdminClick={() => setPage("admin")}
            shouldReset={shouldResetLogin}
          />
        )}

        {page === "accueil" && (
          <Accueil 
            onLogout={() => {
              setPage("login");
              setShouldResetLogin(true);
            }} 
            onShowList={() => setPage("demandes")}
          />
        )}

        {page === "demandes" && (
          <Demandes 
            onBack={() => setPage("accueil")} 
            onSelectRequest={(d) => {
              setSelectedDemande(d);
              setPage("details");
            }}
          />
        )}

        {page === "details" && (
          <Details 
            demande={selectedDemande}
            onBack={() => setPage("demandes")}
          />
        )}

        {page === "admin" && (
          <Admin onBack={() => setPage("login")} />
        )}

      </div>
    </div>
  );
}

export default App;