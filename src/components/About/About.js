import React from 'react';
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="container text-center">
      <img src="http://localhost:5000/img/qui.png" className="mt-4" alt="buy" />
      <h1>Qui sommes-nous ?</h1>
      <p>
        Nous sommes une petite entreprise familiale qui vend des articles de boulangeries et de patisseries 
        en offrant à nos clients la possibilité d'acheter en ligne.      
      </p>
      <h2>Notre Histoire</h2>
      <p>
        "Ma Boulangerie" est née en 2015 dans le premier arrondissement de Paris.
        Notre boulangerie familiale a su traverser les années en alliant tradition et modernité. 
        La passion du pain et des pâtisseries artisanales nous anime chaque jour, 
        et nous sommes fiers de vous proposer des produits faits maison de la plus haute qualité.
      </p>
      <h2>Pourquoi le click-and-collect ?</h2>
      <p>
        Face à la demande croissante et à l'évolution des modes de consommation, 
        nous avons décidé d'adopter le système de "Click-and-Collect".
        Apres la crise du COVID, ce choix s'est imposé comme une évidence pour nous permettre 
        de continuer à vous servir dans les meilleures conditions et vous offrir 
        un service rapide, flexible et sûr.
        Le "Click-and-Collect" vous permet de passer commande en ligne et de récupérer vos achats 
        à la boulangerie au moment qui vous convient le mieux.
      </p>
      <h2>Pourquoi <Link className="text-success text-decoration-none" to="/products">Uppercase.com</Link> ?</h2>
      <p>
        Pour mettre en place ce service, nous avons choisi de collaborer avec
        <Link className="fw-bold text-success text-decoration-none" to="/products"> Uppercase.com</Link>, 
        une entreprise reconnue pour son expertise dans l'installation de services "click-and-collect".
        Uppercase nous a accompagnés pas à pas dans ce projet, en fournissant une solution clé en main, 
        simple d'utilisation et parfaitement adaptée à nos besoins.
        Grâce à Uppercase, nous avons pu lancer notre service "Click-and-Collect" en toute sérénité 
        et nous concentrer sur ce que nous faisons de mieux : vous offrir de délicieux pains et pâtisseries !
      </p>
      <p>
        Nous vous invitons à découvrir <Link className="fs-5 text-orange" to="/products">nos produits</Link> et à profiter de la facilité de commande en ligne. 
        Nous espérons vous voir bientôt à la boulangerie !
      </p>
      
    </div>
  );
}

export default About;
