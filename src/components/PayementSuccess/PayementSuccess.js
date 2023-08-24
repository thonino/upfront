import React from 'react';
import { Link, useParams, useLocation } from "react-router-dom";

const PayementSuccess = () => {
  const { invoiceid } = useParams();  
  const location = useLocation();  
  const basketId = location.state?.basketId;  
  

  return (
    <div className="container text-center">
      <h1 className="mb-3 text-center fw-bold">Paiement validé ✅</h1>
      <div className="alert alert-success fs-4" role="alert">
        <p>✅ Nous avons confirmé votre achat à cette adresse :</p>
        <p> Nous vous remercions pour votre confiance </p>
        <p> Commande numéro : {basketId} </p>
        <p> invoice numéro : {invoiceid} </p>
      </div>
      <Link to="/" className="btn btn-primary">Retourner à la boutique</Link>
    </div>
  );
}

export default PayementSuccess;
