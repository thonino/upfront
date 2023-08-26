import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function MessageReceived() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

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
            <Link to="/messagereceived" className="btn btn-lihgt text-success fw-bold"> Messages reçus </Link>
        </div>
        <div className="fst-italic fw-bold">
            <Link to="/messagesent" className="btn btn-success text-white"> Messages envoyés </Link>
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
                <Link to={`/edit-message/${message._id}`} className="btn btn-success">
                <i className="bi bi-pencil-square"></i>
                </Link>
                <form
                  action={`/delete-message/sent/${message._id}?_method=DELETE`}
                  method="POST"
                >
                  <input type="hidden" name="email" value={user.email} />
                  <button type="submit" className="btn btn-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </form>
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
    </div>
  );
}

export default MessageReceived;
