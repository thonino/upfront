import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    fetch(`http://localhost:5000/product/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => { navigate("/") })
      .catch((error) => { console.error(error) });
  };

  const handleCancel = () => { navigate("/");};

  return (
    <div>
      <h1 className="">Confirmation</h1>
      <p className="text-danger fs-4">
        Voulez-vous vraiment supprimer ce produit ?
      </p>
      <button 
        className="btn btn-lg btn-danger me-2" 
        onClick={handleDelete}
      >
        Supprimer
      </button>
      <button 
        className="btn btn-lg btn-secondary" 
        onClick={handleCancel}
      >
        Annuler
      </button>
    </div>
  );
};

export default DeleteProduct;

