import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [categoriesWithImages, setCategoriesWithImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        const categoriesWithImages = {};
        response.data.forEach((product) => {
          if (!categoriesWithImages[product.categorie]) {
            categoriesWithImages[product.categorie] = product.photo;
          }
        });
        setCategoriesWithImages(categoriesWithImages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      
      <div id="monCarrousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link to="/products">
              <img src="http://localhost:5000/img/hero1.png" className="d-block w-100" alt="..." />
            </Link>
          </div>
          <div className="carousel-item">
            <Link to="/products">
              <img src="http://localhost:5000/img/hero2.png" className="d-block w-100" alt="..." />
            </Link>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#monCarrousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Précédent</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#monCarrousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Suivant</span>
        </button>
      </div>
      <div className="text-center px-4">
      <h1 className="mx-4">Essayez l'expérience !</h1>
        <h2 className="text-success">Achetez en ligne et récupérez en magasin !</h2>
        <p className="fs-4">Faites vos choix parmis nos catégories variées !</p>
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-4 mt-3 px-2 ">
          {Object.keys(categoriesWithImages).map((category) => (
            <Link
              to={`/category/${category}`}
              key={category}
              className="card text-decoration-none  category-card"
              style={{ width: "300px" }}
            >
              <img
                src={`http://localhost:5000/uploads/${categoriesWithImages[category]}`}
                className="card-img-top"
                alt={category}
              />
              <div className="card-body text-center">
                <p className="card-title text-capitalize fw-light fs-4">
                  {category}
                </p>
              </div>
            </Link>
          ))}
        </div>


      {loading ? (
        "Chargement..."
      ) : (
        <div className="text-center container">
          <div className="mt-4">
            <img src="http://localhost:5000/img/cac.png" width="300px" alt="buy" />
            <h1 className="text-success">Le Click and Collect !</h1>
            <h2>Un mode d'achat moderne pour une expérience optimisée !</h2>
            <p className="fs-5">
              Combine le meilleur de la boutique en ligne et du magasin
              physique.
            </p>
          </div>

          <div
            className="accordion d-flex flex-column col-8 col-sm-6  mx-auto "
            id="clickAndCollectAccordion"
          >
            <div className="accordion-item text-start">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <span className="fs-5">
                    Qu'est-ce que le Click and Collect ?
                  </span>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#clickAndCollectAccordion"
              >
                <div className="accordion-body">
                  <p>
                    Le Click and Collect n'est pas seulement une tendance, c'est
                    une réponse moderne aux besoins actuels des consommateurs.
                    Plus de flexibilité, moins d'attente et une garantie de
                    satisfaction. Essayez, et adoptez cette nouvelle manière de
                    faire vos achats.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item text-start">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <span className="fs-5">En trois étapes simples !</span>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#clickAndCollectAccordion"
              >
                <div className="accordion-body">
                  <p>
                    <strong>Choisissez</strong> vos articles en ligne, à votre
                    rythme.
                  </p>
                  <p>
                    <strong>Confirmez</strong> votre panier.
                  </p>
                  <p>
                    <strong>Récupérez</strong> vos achats en magasin, sans délai
                    d'attente.
                  </p>
                </div>
              </div>
            </div>

            <div className="accordion-item text-start">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <span className="fs-5">
                    Pourquoi opter pour le Click and Collect ?
                  </span>
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#clickAndCollectAccordion"
              >
                <div className="accordion-body">
                  <p>
                    <strong>Praticité</strong> : Faites vos choix
                    confortablement depuis chez vous et passez en magasin
                    uniquement pour la récupération.
                  </p>
                  <p>
                    <strong>Adaptabilité</strong> : Adaptez votre moment de
                    retrait selon votre emploi du temps. Pas de stress !
                  </p>
                  <p>
                    <strong>Fiabilité</strong> : Pas de surprise, vous savez
                    exactement ce que vous récupérez.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="about-page text-center mt-4 px-2">
        <h1 className="text-orange mb-4">Notre Enseigne :</h1>
        <div className="d-flex flex-wrap justify-content-around gap-3">
          <Link to="/about" className="square">
            <h2>Notre histoire</h2>
          </Link>
          <Link to="/"className="square">
            <h2>Nos valeurs</h2>
          </Link>
          <Link to="/"className="square">
            <h2>Nos partenaires</h2>
          </Link>
          <Link to="/"className="square">
            <h2>Démarche Qualité</h2>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Home;
