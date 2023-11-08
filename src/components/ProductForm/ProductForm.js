import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [categorie, setCategorie] = useState("");
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  const handleCategorieChange = (e) => {
    setCategorie(e.target.value);
  };

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handlePrixChange = (e) => {
    setPrix(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categorie", categorie);
    formData.append("nom", nom);
    formData.append("prix", prix);
    formData.append("description", description);
    formData.append("photo", photo);

    fetch("https://uppercase-app-back-efd9a0ca1970.herokuapp.com/product/new", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          navigate("/products");
        } else {
          throw new Error("Erreur lors de l'envoi du formulaire");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container col-6">
      <h1 className="mb-4 c1 pacifico text-center">Ajouter un produit</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="categorie" className="form-label roboto fst-italic">
            Catégorie
          </label>
          <input
            type="text"
            className="form-control"
            name="categorie"
            value={categorie}
            onChange={handleCategorieChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label roboto fst-italic">
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            name="nom"
            value={nom}
            onChange={handleNomChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prix" className="form-label roboto fst-italic">
            Prix
          </label>
          <input
            type="string"
            className="form-control"
            name="prix"
            value={prix}
            onChange={handlePrixChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label roboto fst-italic">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label roboto fst-italic">
            Photo
          </label>
          <input
            type="file"
            className="form-control"
            name="photo"
            onChange={handlePhotoChange}
          />
        </div>
        <button type="submit" className="bouton-1">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
