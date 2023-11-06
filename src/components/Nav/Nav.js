import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.js";
import { CartContext } from "../CartContext/CartContext.js";

const Nav = () => {
  const { cartItemCount } = useContext(CartContext);
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
      <nav className="d-flex flex-column justify-content-center text-center navbar navbar-expand-sm navbar-light ">
        <div className="d-flex gap-2">
        <Link className="" to="/"><i className="bi bi-facebook fs-2"></i></Link>
        <Link className="" to="/"><i className="bi bi-instagram fs-2" style={{color: '#FF007F'}}></i></Link>
        <Link className="" to="/"><i className="bi bi-pinterest text-danger fs-2"></i></Link>
        <Link className="" to="/"><i className="bi bi-youtube text-danger fs-2"></i></Link>
        </div>
        <div className="d-flex p-1">
          <Link className="mb-1" to="/">
            <img src={`http://localhost:5000/img/logo1.png`} alt="" className="w-75" style={{ marginLeft: "-50px"}}/>
          </Link>
          <Link className="nav-link" to="/basket">
            <i className="bi bi-cart-fill fs-2 panier-hover "> 
            {cartItemCount > 0 ? `(${cartItemCount})` : "(0)"}
            </i>
          </Link>
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
                <Link className="nav-link txt-hover" to="/products">Produits</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link txt-hover" to="/about">A propos</Link>
              </li>
              
              {user && user.data && user.data.role === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link txt-hover" to="/product/new">Ajout Produit</Link>
                </li>
                
              )}
              {isLoggedIn ? (
                <div className="d-sm-flex d-flex-column">
                  <li className="nav-item">
                    <Link className="nav-link txt-hover" to="/messagereceived">Messages</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-danger txt-hover"onClick={handleLogout}>Déconnexion</Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  txt-hover " to="/account">Compte</Link>
                  </li>
                </div>
              ) : (
                <div className="text-center d-sm-flex">
                  <li className="nav-item">
                    <Link className="nav-link text-success txt-hover" to="/register">Inscription</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-success txt-hover" to="/login">Connexion</Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;