import React from 'react';
import { Link} from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-dark text-white-50 text-center py-1 mt-3 fixed-bottom">
      <span className="d-block d-sm-inline">&copy; 2023 contact@maboulangerie.fr </span>
      
        <Link className="tdn fst-italic text-orange me-1" to="/legalMentions">
          Mentions légales
        </Link>
        <Link className="tdn fst-italic text-warning" to="/Confidentiality">
          Politique de confidentialité
        </Link>
        <Link className="tdn me-1 fst-italic text-orange" to="/cgv">
          {' '}CGV
        </Link>
      
    </footer>
  );
};

export default Footer;
