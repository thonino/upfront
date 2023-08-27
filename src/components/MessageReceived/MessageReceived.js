import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

function MessageReceived() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5000/messagereceived", { withCredentials: true })
        .then((response) => {
          const data = response.data;
          setMessages(data.messages.reverse());
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des messages:", error);
        });
    }
  }, [user]);
  
  if (!user) return null;
  
  const isUserAdmin = user.role === "admin";

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/deletemessage/${id}`, {
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

  return (
    <div className="container text-center">
      <h1 className="fw-bold mt-2">
        Reçus par:{" "}
        <span className="fw-light  fst-italic text-success">
          {isUserAdmin ? "admin@admin" : user.prenom}
        </span>
      </h1>
      <div className="d-flex justify-content-center gap-2">
        <div className="fst-italic fw-bold">
            <Link to="/messagereceived" className="btn btn-success text-white"> Messages reçus </Link>
        </div>
        <div className="fst-italic fw-bold">
            <Link to="/messagesent" className=" btn btn-lihgt text-success fw-bold "> Messages envoyés </Link>
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
                {isUserAdmin ? (
                  <Link
                    to={`/messageform/?destinataire=${message.expediteur}&expediteur=admin@admin`}
                    className="btn btn-success"
                  >
                    Répondre
                  </Link>
                ) : (
                  <Link
                    to={`/messageform/?destinataire=${message.expediteur}`}
                    className="btn btn-success"
                  >
                    Répondre
                  </Link>
                )}
                <button
                  onClick={() => setMessageToDelete(message._id)}
                  className="btn btn-danger"
                >
                  Supprimer
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

      {messageToDelete && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button onClick={() => setMessageToDelete(null)} type="button" className="btn-close" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Voulez-vous vraiment supprimer ce message ?</p>
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

export default MessageReceived;
