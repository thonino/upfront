import React from 'react';

const Home = () => {
  return (
<div className="d-flex flex-column ">
      <header className="bg-dark text-white text-center p-5 mb-3">
        <h1>Bienvenue sur Notre Boutique 
          <span className="text-success"> Clic-&-Collect</span>
        </h1>
        <p className="fs-4 fst-italic text-white-50">Les meilleurs produits aux meilleurs prix</p>
      </header>
      <div className="container flex-grow-1">
        {/* Le contenu */}
      </div>
      <footer className="bg-dark text-white text-center p-3 mt-auto fixed-bottom">
        <p>&copy; 2023 Votre entreprise. Tous les droits sont réservés.</p>
      </footer>
    </div>
  );
};

export default Home;
