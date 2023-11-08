import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Order() {
  // Récupération de l'ID du panier à partir des paramètres de l'URL
  const { basketId } = useParams();
  const navigate = useNavigate();
  
  // Initialisation des états
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Récupération des détails de la commande lors du montage du composant
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`https://uppercase-app-back-efd9a0ca1970.herokuapp.com/order/${basketId}`, {
          withCredentials: true
        });
        setOrderDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des détails de la commande.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [basketId]);

  // Gestion du paiement accepté
  const handlePaymentAccepted = async () => {
    try {
      const response = await axios.post(`https://uppercase-app-back-efd9a0ca1970.herokuapp.com/createInvoice`, { basketId: basketId , basketEmail: orderDetails.email}, { withCredentials: true });
      if (response.data.success) {
        // Si le paiement est réussi, redirection vers la page de succès
        navigate(`/payementsuccess/${response.data.invoiceId}`, { state: { basketId: basketId, basketEmail: orderDetails.email } });
      } else {
        setError('Erreur lors de la finalisation du paiement.');
      }
    } catch (err) {
      setError('Erreur lors du paiement. Veuillez réessayer.');
    }
  };

  // Affichage des états de chargement ou d'erreur
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;



  return (
    <div className="container text-center">
      <h1 className="mb-3 c1 pacifico text-center ">Finalisez votre commande</h1>
      {orderDetails && (
        <div className="alert alert-secondary fs-4" role="alert">
          <span >
            <p className="fs-4 text-dark  fst-italic"><strong>Commande numéro : </strong>{basketId}</p>
            <p className="fs-4"> Votre panier a été enregistré avec succès ✅ !</p>
            <p className="fs-4"> Vous utilisez l'adresse mail <strong>{orderDetails.email}</strong>.</p>
            <p  className="fs-4 c2 fst-italic fw-bold">Passez au paiement afin de finaliser votre commande !</p>
          </span>
        </div>
      )}
      
      <button onClick={handlePaymentAccepted} className="bouton-1 btn-lg mx-2">Paiement accepté</button>
      <Link to="#" className="bouton-2 btn-lg">Paiement annulé</Link>
    </div>
  );
}

export default Order;
