import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

const Nav = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);  // Extract user from AuthContext
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
        throw new Error("Erreur lors de la déconnexion");
      });
  };

  return (
    
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link text-success fw-bold" to="/">
                UPPERCASE
              </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/basket">
                  Panier
                </Link>
              </li>
            {user && user.data && user.data.role === 'admin' ? (
                <li className="nav-item">
                <Link className="nav-link" to="/product/new">
                  Ajouter Produit
                </Link>
              </li>
              ) : null}
            

            {isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link text-danger" to="#" onClick={handleLogout}>
                  Logout 
                  <span className="ml-2 text-success ">   ({user.data.prenom} est connecté) </span> 
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
