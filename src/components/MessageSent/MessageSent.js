import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function MessageSent() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [messageToEdit, setMessageToEdit] = useState(null);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/messagesent", { withCredentials: true })
      .then((response) => {
        const data = response.data;
        setMessages(data.messages.reverse());
        setUser(data.user);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des messages:", error);
      });
  }, []);

  if (!user) return null;

  const isUserAdmin = user.role === "admin";

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/delete-message/sent/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMessages(messages.filter((message) => message._id !== id));
        setMessageToDelete(null);
      })
      .catch((error) => {
        console.error(error);
        setMessageToDelete(null);
      });
  };

  const handleEdit = (id, text) => {
    setMessageToEdit(id);
    setNewText(text);
  };

  const handleSaveEdit = (id) => {
    const newMessages = messages.map(message => {
      if (message._id === id) {
        message.texte = newText;
      }
      return message;
    });
    setMessages(newMessages);
    setMessageToEdit(null);
    setNewText("");
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold mt-2">
        Envoyé par:{" "}
        <span className="fw-light  fst-italic text-success">
          {isUserAdmin ? "admin@admin" : user.prenom}
        </span>
      </h1>
      <div className="d-flex justify-content-center gap-2">
        <div className="fst-italic fw-bold">
          <Link to="/messagereceived" className="btn btn-lihgt text-success fw-bold"> 
            <i className="bi bi-envelope-fill"> Messages reçus</i> 
          </Link>
        </div>
        <div className="fst-italic fw-bold">
          <Link to="/messagesent" className="btn btn-success text-white"> 
            <i className="bi bi-send"> Messages envoyés </i>
          </Link>
        </div>
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
                <p className="card-text text-success">
                  Objet: <span className="text-muted fw-light">unnamed</span>
                </p>
              </div>
              <p className="card-text fs-4">{message.texte}</p>
              <div className="d-flex justify-content-center align-items-center gap-2">
                <button onClick={() => handleEdit(message._id, message.texte)} className="btn btn-success">
                  <i className="bi bi-pencil-square"> Modifier</i>
                </button>
                <button onClick={() => setMessageToDelete(message._id)} className="btn btn-danger">
                  <i className="bi bi-trash"> Supprimer</i>
                </button>
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

      {messageToEdit && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier le message</h5>
                <button onClick={() => setMessageToEdit(null)} type="button" className="btn-close" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <textarea className="form-control" value={newText} onChange={(e) => setNewText(e.target.value)}></textarea>
              </div>
              <div className="modal-footer">
                <button onClick={() => setMessageToEdit(null)} type="button" className="btn btn-secondary">Annuler</button>
                <button onClick={() => handleSaveEdit(messageToEdit)} type="button" className="btn btn-success">Sauvegarder</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {messageToDelete && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation de suppression</h5>
                <button onClick={() => setMessageToDelete(null)} type="button" className="btn-close" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer ce message?</p>
              </div>
              <div className="modal-footer">
                <button onClick={() => setMessageToDelete(null)} type="button" className="btn btn-secondary">Annuler</button>
                <button onClick={() => handleDelete(messageToDelete)} type="button" className="btn btn-danger">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageSent;