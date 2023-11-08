import React, { useContext } from 'react';
import { AuthContext } from "../AuthContext/AuthContext.js";
import { Link } from "react-router-dom";

const Account = () => {
  const { isLoggedIn, user } = useContext(AuthContext);  
  return (
    <div className="text-center">
      {isLoggedIn && user && user.data ? (
          <div className="">
              <h1 className="text-center c1 pacifico mt-2">Mon Compte</h1>
              <div className="d-flex flex-column align-items-center gap-2">
                <Link to={`/account/edit/${user.data._id}`} className="bouton-1 w200">
                  Modifier Informations
                </Link>
                <Link className="bouton-1 w200">Mes factures</Link>
                <Link className="bouton-1 w200">Mes points de fidélité</Link>
                <Link className="bouton-1 w200">Mon code promo</Link>

              </div>
              
          </div>
      ) : (
          <div className="container">
              <h2>Page membre</h2>
              <p>Veuillez vous connecter pour accéder à votre compte !</p>

              <Link className="bouton-1 btn-success" to="/login">Connexion</Link>

          </div>
      )}
    </div>
  );
}

export default Account;