import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MessageForm from '../MessageForm/MessageForm';
import { MessageContext } from '../MessageContext/MessageContext'; 
import { AuthContext } from "../AuthContext/AuthContext.js";

function MessageReceived() {
  const { messages, setMessages, markMessageAsRead } = useContext(MessageContext);
  const { user } = useContext(AuthContext); 
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [messageToReply, setMessageToReply] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/messagereceived', { withCredentials: true })
      .then((response) => {
        const data = response.data;
        setMessages(data.messages.reverse());
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des messages:', error);
      });
  }, [setMessages]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deletemessage/${id}`, { withCredentials: true })
      .then(() => {
        setMessages(messages.filter((message) => message._id !== id));
        setMessageToDelete(null);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du message:', error);
        setMessageToDelete(null);
      });
  };

  const handleReply = (message) => {
    setMessageToReply(message);
    setShowReplyModal(true);
  };

  const markAsRead = (id) => {
    markMessageAsRead(id)
      .then(() => {
        console.log('Message marqué comme lu dans la base de données');
        const updatedMessages = messages.map((message) => {
          if (message._id === id) {
            return { ...message, lu: true };
          }
          return message;
        });
        setMessages(updatedMessages);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du statut de lecture:', error);
      });
  };

  const isUserAdmin = user.role === 'admin';

  return (
    <div className="container text-center">
      {isUserAdmin ? " " : <Link className="btn btn-primary" to="/messageform">Nous-contacter</Link>}
      <h1 className="fw-bold mt-2">
        Reçus par:{" "}
        <span className="fw-light fst-italic text-success">
          {isUserAdmin ? "admin@admin" : user.prenom}
        </span>
      </h1>
      <div className="d-flex justify-content-center gap-2">
        <div className="fst-italic fw-bold">
          <Link to="/messagereceived" className="btn btn-success text-white">
            <i className="bi bi-envelope-fill"> Messages reçus</i>
          </Link>
        </div>
        <div className="fst-italic fw-bold">
          <Link
            to="/messagesent"
            className="btn btn-light text-success fw-bold"
          >
            <i className="bi bi-send"> Messages envoyés </i>
          </Link>
        </div>
        <p>
          <button 
            className="btn btn-secondary" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#collapseWidthExample" 
            aria-expanded="false" aria-controls="collapseWidthExample"
          >
            <i className="bi bi-gear"></i>
          </button>
        </p>
      </div>
      <div className="d-flex justify-content-center text-center gap-2"></div>
      <div className="mt-3">
        {messages.map((message) => (
          <div key={message._id} className="card mb-2">
            <div className="card-body">
              <div className="d-flex justify-content-center gap-2">
                <h5 className="card-title text-success">
                  Expediteur:{" "}
                  <span className="text-muted fw-light">
                    {message.expediteur}
                  </span>
                </h5>
                <h5 className="card-title text-success">
                  Destinataire:{" "}
                  <span className="text-muted fw-light">
                    {message.destinataire}
                  </span>
                </h5>
              </div>
              <div className="d-flex justify-content-center gap-2">
                <h5 className="card-title text-success">
                  Le:{" "}
                  <span className="text-muted fw-light">{message.date}</span>
                </h5>
              </div>
              <p className="card-text fs-4">{message.texte}</p>
              <div className="d-flex justify-content-center align-items-center gap-2">
                <button
                  onClick={() => handleReply(message)}
                  className="btn btn-success"
                >
                  <i className="bi bi-chat-dots"> Répondre</i>
                </button>
                {!message.lu && (
                  <button
                    onClick={() => markAsRead(message._id)}
                    className="btn btn-info"
                  >
                    <i className="bi bi-envelope-open"> Marquer comme lu</i>
                  </button>
                )}
                <div className="collapse" id="collapseWidthExample">
                <button
                  onClick={() => setMessageToDelete(message._id)}
                  className="btn btn-danger"
                >
                  <i className="bi bi-trash"> Supprimer</i>
                </button>
                              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed-bottom mb-3 me-2 text-end">
        <a href="#" className="d-inline btn btn-secondary ">
          <i className="bi bi-arrow-up"></i>
        </a>
      </div>

      {messageToDelete && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation de la suppression</h5>
                <button
                  onClick={() => setMessageToDelete(null)}
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer ce message ?</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setMessageToDelete(null)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(messageToDelete)}
                  type="button"
                  className="btn btn-danger"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


        {showReplyModal && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Répondre à {messageToReply.expediteur}</h5>
                  <button
                    onClick={() => setShowReplyModal(false)}
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <MessageForm
                    expediteur={messageToReply.destinataire}
                    destinataire={messageToReply.expediteur}
                    closeDialog={() => setShowReplyModal(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default MessageReceived;