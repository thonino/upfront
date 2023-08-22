import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
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
    const formData = new FormData();
    formData.append("email", email);
    formData.append("prenom", prenom);
    formData.append("password", password);

    fetch("http://localhost:5000/register", {
      method: "POST", body: formData,
    })
      .then(() => {navigate("/login")})
      .catch(() => {throw new Error("Erreur de l'envoie"); });
  };

  return (
    <div className="container">
      <h1 className="mb-4">Inscription</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-3">
          <label htmlFor="Prenom" className="form-label">
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
          <label htmlFor="Email" className="form-label">
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
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="string"
            className="form-control"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default Register;


