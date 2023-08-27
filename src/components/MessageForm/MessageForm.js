import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import axios from 'axios';

const MessageForm = ({ expediteur, destinataire, closeDialog }) => {
  const [messageContent, setMessageContent] = useState('');
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
          closeDialog();
        }
      })
      .catch((error) => {
        console.error("Il y a eu une erreur lors de l'envoi du message!", error);
      });
  };

  return (
    <div className="p-3">
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
    </div>
  );
};

export default MessageForm;
