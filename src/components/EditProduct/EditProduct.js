import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [categorie, setCategorie] = useState("");
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/product/edit/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCategorie(data.categorie);
        setNom(data.nom);
        setPrix(data.prix);
        setDescription(data.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

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

    fetch(`http://localhost:5000/product/edit/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/products");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDelete = () => {
    console.log("Produit supprimé !");
    navigate("/products");
  };

  return (
    <div className="container">
      <h1 className="mb-4">Modifier un produit</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="categorie" className="form-label">
            Catégorie
          </label>
          <input
            type="text"
            className="form-control"
            id="categorie"
            name="categorie"
            value={categorie}
            onChange={handleCategorieChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            id="nom"
            name="nom"
            value={nom}
            onChange={handleNomChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prix" className="form-label">
            Prix
          </label>
          <input
            type="number"
            className="form-control"
            id="prix"
            name="prix"
            value={prix}
            onChange={handlePrixChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Photo
          </label>
          <input
            type="file"
            className="form-control"
            id="photo"
            name="photo"
            onChange={handlePhotoChange}
          />
        </div>
        <button type="submit" className="btn btn-success me-2">
          Enregistrer
        </button>
        <button onClick={handleDeleteConfirmation} className="btn btn-danger">
          Supprimer
        </button>
      </form>
      {showDeleteConfirmation && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button onClick={handleDeleteCancel} type="button" className="btn-close"></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
              </div>
              <div className="modal-footer">
                <button onClick={handleDeleteCancel} type="button" className="btn btn-secondary">Annuler</button>
                <button onClick={handleDelete} type="button" className="btn btn-danger">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
