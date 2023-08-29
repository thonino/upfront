import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

const Nav = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        logout();
        navigate("/");
      })
      .catch(() => {
        console.error("Erreur lors de la déconnexion");
      });
  };

  return (
    <div className="tutu">
      <nav className="navbar navbar-expand-md navbar-light bg-body-tertiary fixed-top">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
            Accueil
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/products">Produits</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/basket">Panier</Link>
              </li>
              {user && user.data && user.data.role === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link" to="/product/new">Ajouter Produit</Link>
                </li>
              )}
              {isLoggedIn ? (
                <div className="d-md-flex d-flex-column d-md-row">
                  {user.data.role !== "admin" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/messageform">Nous-contacter</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link" to="/messagereceived">Liste-Messages</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-danger" to="#" onClick={handleLogout}>Déconnexion</Link>
                  </li>
                </div>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/login">Connexion</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
