import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    if (localStorage.getItem('cookieConsent') === null) {
      setShowCookieConsent(true); // Afficher le modal si ce n'est pas le cas
    }
  }, []);

  // Gérer l'acceptation des cookies par l'utilisateur
  const handleAcceptCookieConsent = () => {
    localStorage.setItem('cookieConsent', 'accepted'); // Enregistrez le consentement dans localStorage
    setShowCookieConsent(false); // Cacher le modal
  };

  // Gérer le refus des cookies par l'utilisateur
  const handleDeclineCookieConsent = () => {
    localStorage.setItem('cookieConsent', 'declined'); // Enregistrez le refus dans localStorage
    setShowCookieConsent(false); // Cacher le modal
  };

  return (
    <>
      {showCookieConsent && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body roboto fs-5">
                <p>
                  Nous utilisons des cookies pour améliorer votre expérience. 
                  En cliquant sur "j'accepte", vous consentez notre politique en matière de cookies.
                  </p>
              </div>
              <div className="modal-footer">
                <button onClick={handleAcceptCookieConsent} type="button" className="bouton-1">
                  J'accepte
                </button>
                <button onClick={handleDeclineCookieConsent} type="button" className="bouton-2">
                  Je n'accepte pas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
