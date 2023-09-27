import React from "react";

function Accordion() {
  return (
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
            <span className="fs-5">Qu'est-ce que le Click and Collect ?</span>
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          data-bs-parent="#clickAndCollectAccordion"
        >
          <div className="accordion-body">
            <p>
              Le Click and Collect n'est pas seulement une tendance, c'est une
              réponse moderne aux besoins actuels des consommateurs. Plus de
              flexibilité, moins d'attente et une garantie de satisfaction.
              Essayez, et adoptez cette nouvelle manière de faire vos achats.
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
              <strong>Choisissez</strong> vos articles en ligne, à votre rythme.
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
              <strong>Praticité</strong> : Faites vos choix confortablement
              depuis chez vous et passez en magasin uniquement pour la
              récupération.
            </p>
            <p>
              <strong>Adaptabilité</strong> : Adaptez votre moment de retrait
              selon votre emploi du temps. Pas de stress !
            </p>
            <p>
              <strong>Fiabilité</strong> : Pas de surprise, vous savez
              exactement ce que vous récupérez.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
