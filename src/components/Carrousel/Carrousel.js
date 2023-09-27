import React from 'react';
import { Link } from "react-router-dom";

function Carrousel(){
    return (
      <div id="monCarrousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <Link to="/products">
                    <img
                      src="http://localhost:5000/img/hero1.png"
                      className="d-block w-100"
                      alt="..."
                    />
                  </Link>
                </div>
                <div className="carousel-item">
                  <Link to="/products">
                    <img
                      src="http://localhost:5000/img/hero2.png"
                      className="d-block w-100"
                      alt="..."
                    />
                  </Link>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#monCarrousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Précédent</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#monCarrousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Suivant</span>
              </button>
            </div>
    );
}

export default Carrousel;