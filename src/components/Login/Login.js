import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.js";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Erreur lors de la connexion");
      });
  };

  return (
    <div className="container col-6">
      <h1 className="text-center">Se connecter !</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="fst-italic">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="fst-italic">
            Mot de passe
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Connexion
        </button>
      </form>
      { error && <h3 className="text-danger fw-bold">{error}</h3>}
    </div>
  );
};

export default Login;
