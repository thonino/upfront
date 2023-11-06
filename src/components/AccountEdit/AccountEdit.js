import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AccountEdit = () => {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://uppercase-app-back-efd9a0ca1970.herokuapp.com/edit-user/${id}`)
      .then((response) => response.json())
      .then((user) => {
        setPrenom(user.prenom);
        setEmail(user.email);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, [id]);

  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const userData = {
      prenom: prenom,
      email: email,
      ...(password && { password: password }), 
    };
  
    fetch(`https://uppercase-app-back-efd9a0ca1970.herokuapp.com/edit-user/${id}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      navigate("/account");
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour', error);
    });
  };
  

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDelete = () => {
    console.log("Suppression du compte...");
    navigate("/login");
  };

  return (
    <div className="container">
      <h1 className="mb-4 text-center">Modifier mon compte</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">
            Prénom
          </label>
          <input
            type="text"
            className="form-control"
            id="prenom"
            name="prenom"
            value={prenom}
            onChange={handlePrenomChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="btn btn-success me-2">
          Enregistrer
        </button>
        <button onClick={handleDeleteConfirmation} className="btn btn-danger">
          Supprimer
        </button>
      </form>
      {showDeleteConfirmation && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button onClick={handleDeleteCancel} type="button" className="btn-close"></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
              </div>
              <div className="modal-footer">
                <button onClick={handleDeleteCancel} type="button" className="btn btn-secondary">Annuler</button>
                <button onClick={handleDelete} type="button" className="btn btn-danger">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountEdit;