import React from 'react';
import { Link} from "react-router-dom";


const LegalMentions = () => {
  return (
    <div className="container">
      <div className="text-center">
        <h1>Mentions Légales</h1>
        <p className="text-info"><strong>En vigueur au 01/10/2023</strong></p>

        <p>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 
        pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance 
        des utilisateurs et visiteurs du site "maboulangerie.fr" les présentes mentions légales.</p>

      <p>La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale 
        et sans réserve des présentes mentions légales. Ces dernières sont accessibles sur le Site 
        à la rubrique « Mentions légales ».</p>
      </div>
      
      

      <h2>ARTICLE 1 - L'EDITEUR</h2>
      <p>L’édition et la direction de la publication du Site est assurée par WAFORMATION, domiciliée au
        1 rue de la joie Paris 75001, dont l'adresse e-mail est contact@maboulangerie.fr.</p>

      <h2>ARTICLE 2 - L'HEBERGEUR</h2>
      <p>L'hébergeur du Site est la société ionos, dont le siège social est situé au 
        7 PL DE LA GARE 57200 SARREGUEMINES, avec le numéro de téléphone : 08 90 10 93 62.</p>

      <h2>ARTICLE 3 - ACCES AU SITE</h2>
      <p>Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, 
        interruption programmée ou non et pouvant découlant d’une nécessité de maintenance. 
        En cas de modification, interruption ou suspension du Site, l'Editeur ne saurait être 
        tenu responsable.</p>

        <h2>ARTICLE 4 - COLLECTE DES DONNEES</h2>
        <p>Le Site assure à l'Utilisateur une collecte et un traitement d'informations personnelles 
        dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative 
        à l'informatique, aux fichiers et aux libertés. Pour plus d'informations, veuillez consulter 
        notre <Link className="text-success" to="/dataprotection">Politique de Confidentialité</Link>.</p>


      <p>En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur 
        dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données 
        personnelles. L'Utilisateur exerce ce droit :</p>

      <ul>
        <li>par mail à l'adresse email contact@maboulangerie.fr</li>
        <li>par voie postale au 1 rue de la joie, 75001, Paris</li>
        <li>via un formulaire de Contact</li>
      </ul>

      <p>Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou 
        partie du Site, sans autorisation de l’Editeur est prohibée et pourra entraînée des actions 
        et poursuites judiciaires telles que notamment prévues par le Code de la propriété 
        intellectuelle et le Code civil.</p>
    </div>
  );
};

export default LegalMentions;
