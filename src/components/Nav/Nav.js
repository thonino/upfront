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
    <div>
      <nav className="d-flex flex-column justify-content-center text-center navbar navbar-expand-md navbar-light bg-body-tertiary fixed-top">
        <div className="d-flex">
          <Link className="" to="/">
            <img src={`http://localhost:5000/img/logo1.png`} className="w-75" style={{ marginLeft: "-50px"}}/>
          </Link>
          <Link className="nav-link" to="/basket"><i className="bi  bi-cart-fill fs-2 panier-hover"> Panier</i></Link>
        </div>
        <div className="d-flex flex-column">
          <button
            className="navbar-toggler mx-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-2 " id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link txt-hover" to="/products">Nos Produits</Link>
              </li>
              {user && user.data && user.data.role === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link txt-hover" to="/product/new">Ajouter Produit</Link>
                </li>
              )}
              {isLoggedIn ? (
                <div className="d-md-flex d-flex-column d-md-row">
                  {user.data.role !== "admin" && (
                    <li className="nav-item">
                      <Link className="nav-link txt-hover" to="/messageform">Nous contacter</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link txt-hover" to="/messagereceived">Liste Messages</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-danger txt-hover" to="#" onClick={handleLogout}>Déconnexion</Link>
                  </li>
                </div>
              ) : (
                <li className="nav-item d-flex">
                  <Link className="nav-link text-success txt-hover" to="/register">Inscription</Link>
                  <Link className="nav-link text-success txt-hover" to="/login">Connexion</Link>
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
