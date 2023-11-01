import React from "react";
import { Link } from "react-router-dom";
import Accordion from "../Accordion/Accordion.js";
import Carrousel from "../Carrousel/Carrousel.js";
import Category from "../Category/Category.js";

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <Carrousel />
      <div className="text-center px-4">
        <h1 className="mx-4">
          My-Backery
          <span className="fs-4 fw-bold text-success d-none d-lg-inline">
            {" "}(Desktop)
          </span>
          <span className="fs-4 fw-bold text-success d-none d-md-inline d-lg-none">
            {" "}(Tablette)
          </span>
          <span className="fs-4 fw-bold text-success d-inline d-md-none">
            {" "}(Mobile)
          </span>
        </h1>
        <h2 className="text-success">
          Achetez en ligne et récupérez en magasin !
        </h2>
        <p className="fs-4">Faites vos choix parmis nos catégories variées !</p>
      </div>
      <Category />
      <div className="text-center container">
        <div className="mt-4">
          <img
            src="https://uppercase-app-back-efd9a0ca1970.herokuapp.com/img/cac.png"
            width="300px"
            alt="buy"
          />
          <h1 className="text-success">Le Click and Collect !</h1>
          <h2>Un mode d'achat moderne pour une expérience optimisée !</h2>
          <p className="fs-5">
            Combine le meilleur de la boutique en ligne et du magasin physique.
          </p>
        </div>
        <Accordion />
      </div>

      <div className="about-page text-center mt-4 px-2">
        <h1 className="text-orange mb-4">Notre Enseigne :</h1>
        <div className="d-flex flex-wrap justify-content-around gap-3">
          <Link to="/about" className="square">
            <h2>Notre histoire</h2>
          </Link>
          <Link to="/" className="square">
            <h2>Nos valeurs</h2>
          </Link>
          <Link to="/" className="square">
            <h2>Nos partenaires</h2>
          </Link>
          <Link to="/" className="square">
            <h2>Démarche Qualité</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;