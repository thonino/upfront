import React from 'react';
import { Link, useParams, useLocation } from "react-router-dom";


const PayementSuccess = () => {
  const { invoiceid } = useParams();  
  const location = useLocation();  
  const basketId = location.state?.basketId;  
  const basketEmail = location.state?.basketEmail;

  return (
    <div className="container c1 pacifico text-center">
      <h1 className="mb-3 text-center ">Paiement accepté, nous préparons votre panier ! </h1>
      <div className="alert alert-secondary fs-4" role="alert">
        <span >
          <p className="fs-4"> Nous avons confirmé votre achat à cette adresse : {basketEmail} </p>
          <p className="fs-4"> Nous vous remercions pour votre confiance </p>
          <p className="fs-4"> Commande numéro : {basketId} </p>
          <p className="fs-4"> invoice numéro : {invoiceid} </p>
        </span>
      </div>
      <Link to="/" className="bouton-1">Retourner à la boutique</Link>
    </div>
  );
}

export default PayementSuccess;
