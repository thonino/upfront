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
        const response = await axios.get(`http://localhost:5000/order/${basketId}`, {
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
      const response = await axios.post(`http://localhost:5000/createInvoice`, { basketId: basketId , basketEmail: orderDetails.email}, { withCredentials: true });
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
      <h1 className="mb-3 text-center fw-bold">Finalisez votre commande</h1>
      {orderDetails && (
        <div className="alert alert-success fs-4" role="alert">
          <p className="fs-4 text-dark fst-italic"><strong>Commande numéro : </strong>{basketId}</p>
          <p> Votre panier a été enregistré avec succès ✅ !</p>
          <p> Vous utilisez l'adresse mail <strong>{orderDetails.email}</strong>.</p>
          <p className="text-success fst-italic">Passez au paiement afin de finaliser votre commande !</p>
        </div>
      )}
      
      <button onClick={handlePaymentAccepted} className="btn btn-success btn-lg mx-2">Paiement accepté</button>
      <Link to="#" className="btn btn-danger btn-lg">Paiement annulé</Link>
    </div>
  );
}

export default Order;
