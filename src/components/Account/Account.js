import React, { useContext } from 'react';
import { AuthContext } from "../AuthContext/AuthContext.js";
import { Link } from "react-router-dom";

const Account = () => {
  const { isLoggedIn, user } = useContext(AuthContext);  
  return (
    <div className="text-center">
      {isLoggedIn && user && user.data ? (
          <div className="">
              <h1 className="text-center mt-2">Mon Compte</h1>
              <div className="d-flex flex-column align-items-center gap-2">
                <Link to={`/account/edit/${user.data._id}`} className="btn btn-primary fxbtn">
                  Modifier Informations
                </Link>
                <Link className="btn btn-primary fxbtn">Mes factures</Link>
                <Link className="btn btn-primary fxbtn">Mes points de fidélité</Link>
                <Link className="btn btn-primary fxbtn">Mon code promo</Link>
              </div>
              
          </div>
      ) : (
          <div className="container">
              <h2>Page membre</h2>
              <p>Veuillez vous connecter pour accéder à votre compte !</p>
              <Link className="btn btn-success" to="/login">Connexion</Link>
          </div>
      )}
    </div>
  );
}

export default Account;