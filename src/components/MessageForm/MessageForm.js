import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext.js';
import axios from 'axios';

const MessageForm = ({ expediteur, destinataire }) => {
  const [messageContent, setMessageContent] = useState('');
  const [messageSent, setMessageSent] = useState(null);
  const { user } = useContext(AuthContext);

  const expediteurEmail = expediteur || (user && user.data && user.data.email);
  const destinataireEmail = destinataire || "admin@admin";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      expediteur: expediteurEmail,
      destinataire: destinataireEmail,
      texte: messageContent,
    };

    axios.post("http://localhost:5000/message", formData, { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setMessageContent('');
          setMessageSent('Le message a été envoyé !');
          setTimeout(() => {
            setMessageSent(null);
          }, 2500);
        }
      })
      .catch((error) => {
        console.error("Il y a eu une erreur lors de l'envoi du message!", error);
        setMessageSent("Erreur lors de l'envoi du message.");
        setTimeout(() => {
          setMessageSent(null);
        }, 3000);
      });
  };

  return (
    <div className="p-3 container">
      <h1>Nous-contacter ! </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="expediteur" className="form-label">Expéditeur</label>
          <input type="email" className="form-control text-center fs-3" id="expediteur" value={expediteurEmail} disabled />
        </div>
        <div className="mb-3">
          <label htmlFor="destinataire" className="form-label">Destinataire</label>
          <input 
            type="email" 
            className="form-control text-center text-success fs-3" 
            id="destinataire" 
            value={destinataireEmail} disabled 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label fs-2"> Votre message :</label>
          <textarea className="form-control" id="message" rows="5" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Envoyer</button>
      </form>

      {messageSent && (
      <div className="modal show d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title">Confirmation</h5>
                      <button onClick={() => setMessageSent(null)} type="button" className="btn-close"></button>
                  </div>
                  <div className="modal-body">
                      <p>{messageSent}</p>
                  </div>
                  <div className="modal-footer">
                      <button onClick={() => setMessageSent(null)} type="button" className="btn btn-secondary">OK</button>
                  </div>
              </div>
          </div>
      </div>
  )}

    </div>
  );
};

export default MessageForm;
