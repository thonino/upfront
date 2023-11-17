import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Validation du mot de passe
    if (e.target.value.length < 10) {
      setPasswordError("Le mot de passe doit contenir au moins 10 caractères");
    } else {
      setPasswordError("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérifier si le mot de passe est valide
    if (password.length < 10) {
      setPasswordError("Le mot de passe doit contenir au moins 10 caractères");
      return;
    }

    const data = {
      email: email,
      prenom: prenom,
      password: password,
      role: "client",
    };

    fetch("https://uppercase-app-back-efd9a0ca1970.herokuapp.com/register/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi :", error);
      });
  };

  return (
    <div className="container col-6">
      <h1 className="text-center c1 pacifico">S'inscrire</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="Prenom" className="fst-italic form-label roboto">
            Prenom
          </label>
          <input
            type="text"
            className="form-control"
            name="prenom"
            value={prenom}
            onChange={handlePrenomChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="fst-italic form-label roboto">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="Password"
            className="fst-italic form-label roboto"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <p className="text-danger">{passwordError}</p>
          )}
        </div>
        <button type="submit" className="bouton-1">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default Register;
