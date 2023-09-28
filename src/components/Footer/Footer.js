import React from 'react';
import { Link} from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-dark text-white-50 text-center py-1 mt-3 fixed-bottom">
      <span className="d-block d-sm-inline">&copy; 2023 contact@maboulangerie.fr </span>
      
        <Link className="text-light text-decoration-none me-1" to="/legalMentions">
          Mentions légales
        </Link>
        <Link className="text-light text-decoration-none" to="/Confidentiality">
          Politique de confidentialité
        </Link>
        <Link className="text-light me-1 text-decoration-none" to="/cgv">
          {' '}CGV
        </Link>
      
    </footer>
  );
};

export default Footer;
