import React, { useState, useEffect, useContext } from "react"; 
import axios from "axios";
import { Link } from 'react-router-dom';
import { AuthContext } from "../AuthContext/AuthContext"; 
import MessageForm from '../MessageForm/MessageForm';

function MessageSent() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext); 
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [messageToEdit, setMessageToEdit] = useState(null);
  const [newText, setNewText] = useState("");
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  const handleNewMessage = () => {
    setShowNewMessageModal(true); 
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/messagesent", { withCredentials: true })
      .then((response) => {
        const data = response.data;
        setMessages(data.messages.reverse());
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des messages:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/deletemessage/${id}`, { withCredentials: true })
      .then(() => {
        setMessages(messages.filter((message) => message._id !== id));
        setMessageToDelete(null);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du message:", error);
        setMessageToDelete(null);
      });
  };

  const handleEdit = (id, text) => {
    setMessageToEdit(id);
    setNewText(text);
  };

  const handleSaveEdit = (id) => {
    const updatedMessageData = { texte: newText };
    axios
      .put(`http://localhost:5000/editmessage/${id}`, updatedMessageData)
      .then(response => {
        const updatedMessages = messages.map(message => {
          if (message._id === id) {
            return { ...message, texte: newText };
          }
          return message;
        });
        setMessages(updatedMessages);
        setMessageToEdit(null);
        setNewText("");
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour du message:", error);
      });
  };

  const isUserAdmin = user && user.data.role === 'admin';

  return (
    <div className="container text-center">
      {!isUserAdmin && (
        <button className="bouton" onClick={handleNewMessage}>
          <i className="bi bi-chat-left icon-aligned"></i> Ecrire !
        </button>
      )}
      <h1 className="mt-2 fst-italic c1 pacifico mt-2 ">
        Envoyé par:{" "}
        <span className="c3">
          {isUserAdmin ? "admin@admin" : user.data.prenom}
        </span>
      </h1>
      <div className="d-flex justify-content-center gap-2 mt-20">
        <div className="fst-italic fw-bold mt-10">
          <Link to="/messagereceived" className="hover fw-bold tdn"> 
            <i className="bi bi-envelope-fill"> Messages reçus</i> 
          </Link>
        </div>
        <div className="fst-italic fw-bold">
          <Link to="/messagesent"  className="bouton-1 text-white"> 
            <i className="bi bi-send"> Messages envoyés </i>
          </Link>
        </div>
        <p>
          <button 
            className="bouton-1" 
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
            <div className="card-body bg-7">
              
              <div className="d-flex justify-content-center gap-2">
              <h5 className="c1 pacifico fst-italic">
                  Le:{" "}
                  <span className="roboto fst-italic c1">{message.date}</span>
                </h5>
                <h5 className="c1 pacifico fst-italic">
                  Destinataire:{" "}
                  <span className="roboto fst-italic c1">
                    {message.destinataire}
                  </span>
                </h5>
              </div>
              
              <p className="card-text fs-4">{message.texte}</p>
              <div className="d-flex justify-content-center align-items-center gap-2">
                <div className="collapse " id="collapseWidthExample">
                <button 
                  onClick={() => handleEdit(message._id, message.texte)} 
                  className="bouton mx-2">
                  <i className="bi bi-pencil-square"> Modifier</i>
                </button>
                  <button
                    onClick={() => setMessageToDelete(message._id)}
                    className="bouton-2"
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
                <button onClick={() => handleSaveEdit(messageToEdit)} type="button" className="bouton-1">Enregistrer</button>
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
      {showNewMessageModal && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Nouveau message</h5>
                  <button
                    onClick={() => setShowNewMessageModal(false)}
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <MessageForm
                    expediteur={user.data.email} 
                    closeDialog={() => setShowNewMessageModal(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default MessageSent;
