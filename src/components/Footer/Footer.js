import React from 'react';
import { Link} from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-dark text-white-50 text-center py-1 mt-3 fixed-bottom">
      <span className="d-block d-sm-inline ">&copy; 2023 contact@maboulangerie-cac.fr </span>
      
        <Link className="text-light me-1" to="/">Mentions légales</Link>
        <Link className="text-light me-1" to="/">CGV</Link>
        <Link className="text-light " to="/">Protection données</Link>
      
    </footer>
  );
};

export default Footer;
