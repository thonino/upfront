import React from "react";
import { Link } from "react-router-dom";
import Accordion from "../Accordion/Accordion.js";
import Carrousel from "../Carrousel/Carrousel.js";
import Category from "../Category/Category.js";

const Home = () => {
  const handleMouseEnter = (event) => {
    const element = event.currentTarget;
    if (!element.classList.contains('start-bounce')) {
      element.classList.add('start-bounce');
      element.addEventListener('animationend', () => {
        element.classList.remove('start-bounce');
      }, { once: true }); 
    }
  };


  return (
    <div className="d-flex flex-column align-items-center">
      <Carrousel />
      <div className="text-center px-4">
        <h1 className="mx-4 pacifico c3 mt-2">
          My-Backery
          <span className="fs-4 text-dark fst-italic d-none d-lg-inline roboto">
            {" "}(Desktop)
          </span>
          <span className="fs-4 text-dark fst-italic d-none d-md-inline d-lg-none roboto">
            {" "}(Tablette)
          </span>
          <span className="fs-4 text-dark fst-italic d-inline d-md-none roboto">
            {" "}(Mobile)
          </span>
        </h1>
        <h2 className="fs-4 c2 pacifico">
          Achetez en ligne et récupérez en magasin !
        </h2>
        <p className="fs-4 c1 dancing">Faites vos choix parmis nos catégories variées !</p>
      </div>
      <Category />
      <div className="text-center container">
        <div className="mt-4">
          <img
            src="https://uppercase-app-back-efd9a0ca1970.herokuapp.com/img/cac.png"
            width="300px"
            alt="buy"
          />
          <h1 className="text-success roboto mt-2">Le Click and Collect !</h1>
          <h2 className="c2 pacifico">Un mode d'achat moderne pour une expérience optimisée !</h2>
          <p className="fs-4 c1 dancing">
            Combine le meilleur de la boutique en ligne et du magasin physique.
          </p>
        </div>
        <Accordion />
      </div>

      <div className="about-page text-center mt-5 px-2">
        <div className="d-flex flex-wrap justify-content-around gap-4 px-1 ">
          <div className="div-parent"onMouseEnter={handleMouseEnter}>
            <Link to="/about" className="square bg-3 pacifico div-enfant ">
              <p>Notre histoire</p>
            </Link>
          </div>
          <div className="div-parent"onMouseEnter={handleMouseEnter}>
            <Link to="/" className="square bg-1 pacifico div-enfant ">
              <p>Nos valeurs</p>
            </Link>
          </div>
          <div className="div-parent"onMouseEnter={handleMouseEnter}>
            <Link to="/" className="square bg-2 pacifico div-enfant ">
              <p>Nos partenaires</p>
            </Link>
          </div>
          <div className="div-parent"onMouseEnter={handleMouseEnter}>
            <Link to="/" className="square bg-1 pacifico div-enfant ">
              <p>Démarche Qualité</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
