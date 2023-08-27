import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const MessageForm = () => {
    const [messageContent, setMessageContent] = useState(''); 
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const getQueryParams = () => {
        const searchParams = new URLSearchParams(location.search);
        return {
            expediteur: searchParams.get('expediteur') || (user && user.data && user.data.email),
            destinataire: searchParams.get('destinataire') || "admin@admin"
        };
    };
    const { expediteur, destinataire } = getQueryParams();
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
                  setMessage('Message envoyé avec succès !');
                  setTimeout(() => {
                      setMessage(null);
                  }, 2500);
              } else {
                  setError(response.data.message || "Erreur lors de l'envoi du message.");
              }
          })
          .catch((err) => {
              setError("Erreur lors de l'envoi du message. Veuillez réessayer.");
          });
  };

  if (!user) return null;
  
    return (
      <div className="d-flex flex-column align-items-center">
        <div className="container col-6">
          <div className="align-items-center mb-2">
              <h1 className="fw-bold text-center">
                  Contacter
                  <span className="fw-light fs-3 fst-italic text-success">
                      <br />
                      De: {expediteurEmail ? expediteurEmail : (user && user.data && user.data.email)}<br />
                      A: {destinataireEmail ? destinataireEmail : "admin@admin"}
                  </span>
              </h1>
          </div>
          <form onSubmit={handleSubmit}>
            {user && user.data && user.data.role === 'admin' ? (
              <>
                <input type="hidden" value={expediteurEmail} />
                <input type="hidden" value={destinataireEmail} />
            </>
            ) : (
              <>
                <input type="hidden" value={expediteurEmail} />
                <input type="hidden" value="admin@admin" />
              </>
            )}
            <div className="form-group">
              <label htmlFor="texte" className="fst-italic">Votre Texte</label>
              <textarea
                  id="texte"
                  className="form-control"
                  name="texte"
                  rows="4"
                  required
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
              ></textarea>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary fst-italic mt-2 mx-2">Envoyer</button>
            <a href="/messagebox/received" className="btn btn-info fw-bold mt-2">Boite de messagerie</a>
          </form>
        </div>
        {message && (
          <div className="modal show d-block">
              <div className="">
                  <div className="modal-content" style={{ backgroundColor: "rgba(0, 0, 0, 0.80)" }}>
                      <div className="fw-lighter fst-italic text-warning text-center fs-1">
                          {message}
                      </div>
                  </div>
              </div>
          </div>
        )}
      </div>
    );
};

export default MessageForm;
