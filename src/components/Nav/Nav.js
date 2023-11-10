import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.js";
import { CartContext } from "../CartContext/CartContext.js";
import { MessageContext } from '../MessageContext/MessageContext.js';

const Nav = () => {
  const { cartItemCount } = useContext(CartContext);
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const { unreadMessagesCount } = useContext(MessageContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("https://uppercase-app-back-efd9a0ca1970.herokuapp.com/logout", {
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
  const handleMouseEnter1 = () => {
    const parentElement1 = document.querySelector('.cible1');
    if (parentElement1 && !parentElement1.classList.contains('demarre1')) {
      parentElement1.classList.add('demarre1');
      parentElement1.addEventListener('animationend', () => {
        parentElement1.classList.remove('demarre1');
      }, { once: true });
    }
  };
  const handleMouseEnter2 = () => {
    const parentElement2 = document.querySelector('.cible2');
    if (parentElement2 && !parentElement2.classList.contains('demarre2')) {
      parentElement2.classList.add('demarre2');
      parentElement2.addEventListener('animationend', () => {
        parentElement2.classList.remove('demarre2');
      }, { once: true });
    }
  };

  return (
    <div>
      <nav className="d-flex flex-column justify-content-center text-center navbar navbar-expand-sm navbar-light ">
        <div className="d-flex gap-2 ">
        <Link className="" to="/"><i className="bi bi-facebook fs-2"></i></Link>
        <Link className="" to="/"><i className="bi bi-instagram fs-2" style={{color: '#FF007F'}}></i></Link>
        <Link className="" to="/"><i className="bi bi-pinterest text-danger fs-2"></i></Link>
        <Link className="" to="/"><i className="bi bi-youtube text-danger fs-2"></i></Link>
        </div>
        <div className="d-flex p-1">
          <Link className="mb-1" to="/">
            <img src={`https://uppercase-app-back-efd9a0ca1970.herokuapp.com/img/logo1.png`} alt="" className="w-75" style={{ marginLeft: "-50px"}}/>
          </Link>
          <Link className="nav-link mt-2r" to="/basket" onMouseEnter={handleMouseEnter1}>
            <i className="bi bi-cart-fill fs-2 hover "> 
              <span className="pacifico me-1">Panier</span> 
              <span className={cartItemCount > 0 ? "cible1 notif1" : "d-none"}>
                {cartItemCount > 0 ? `${cartItemCount}` : "0"}
              </span>
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
          <div className="collapse navbar-collapse mx-1 " id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link txt-hover fs-4 " to="/products">Produits</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link txt-hover fs-4" to="/about">A propos</Link>
              </li>
              
              {user && user.data && user.data.role === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link txt-hover fs-4" to="/product/new">
                  <i className="bi bi-plus hover"><i className="bi bi-box-seam-fill hover"></i></i>
                    
                  </Link>
                </li>
              )}
              {isLoggedIn ? (
                <div className="d-sm-flex d-flex-column">
                  <li className="nav-item">
                    <Link className="nav-link fs-4" to="/messagereceived">
                      <span className="txt-hover fs-4" onMouseEnter={handleMouseEnter2}>Messages</span>
                      <span className={unreadMessagesCount > 0 ? `notif2 cible2 ` : `d-none`}>
                        {unreadMessagesCount > 0 ? `${unreadMessagesCount}` : null}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  txt-hover ms-10r" to="/account">
                    <i className="bi bi-person-fill-gear hover fs-4"></i> 
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link txt-hover  fs-4"onClick={handleLogout}>
                    <i className="bi bi-box-arrow-up-right hover "></i>
                    </Link>
                  </li>
                </div>
              ) : (
                <div className="text-center d-sm-flex">
                  <li className="nav-item">
                    <Link className="nav-link  txt-hover fs-4" to="/register">
                      {/* <i className="bi bi-pencil-square  "></i>  */}
                      Inscription
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link txt-hover fs-4" to="/login">
                      Connexion <i className="bi bi-box-arrow-in-up-left hover icon-aligned"></i>
                    </Link>
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