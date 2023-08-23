import React, { useState, useEffect } from "react";
import axios from "axios";

// État local du panier : articles, prix total, erreurs, et valeurs d'input
const Basket = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [inputValues, setInputValues] = useState({});
  // Charger les données du panier dès le chargement du composant
  useEffect(() => {
    fetchBasket();
  }, []);

  // Fonction pour récupérer les données du panier
  const fetchBasket = () => {
    axios
      .get("http://localhost:5000/basket", { withCredentials: true })
      .then((response) => {
        setCartItems(response.data.cartItems);
        setTotalPrice(response.data.prix_total);
        const initialValues = {};
        response.data.cartItems.forEach((item) => {
          initialValues[item.product.id] = item.quantite;
        });
        setInputValues(initialValues);
      })
      .catch(() => setError("Erreur lors de la récupération du panier."));
  };

  // Gérer le changement de quantité d'un produit
  const [modifiedFields, setModifiedFields] = useState({});
  const [inputErrors, setInputErrors] = useState({});

  const handleInputChange = (e, productId) => {
    const value = e.target.value;
    if (/^[1-9][0-9]*$/.test(value) || value === "") {
        setInputValues((prev) => ({ ...prev, [productId]: value }));
        if (value !== "") {
            delete inputErrors[productId];
        }
    } else {
        inputErrors[productId] = "Minimum = 1";
    }
    setInputErrors({...inputErrors});
    setModifiedFields((prev) => ({ ...prev, [productId]: true }));
};



  const handleApply = (productId) => {
    const quantities = { [productId]: inputValues[productId] };
    updateQuantities(quantities);
    setModifiedFields((prev) => ({ ...prev, [productId]: false }));
  };

  // Gérer la soumission du formulaire pour mettre à jour les quantités
  const updateQuantities = (quantities) => {
    axios
      .post("http://localhost:5000/update-quantities", quantities, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          fetchBasket();
        } else {
          setError(
            response.data.message || "Erreur inattendue lors de la mise à jour."
          );
        }
      })
      .catch(() => setError("Erreur lors de la mise à jour."));
    document.activeElement.blur();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedQuantities = {};
    for (let [key, value] of formData.entries()) {
      const productId = key.split("-")[1];
      updatedQuantities[productId] = value;
    }
    updateQuantities(updatedQuantities);
    setModifiedFields({});
  };

  // Supprimer un produit du panier
  const removeItem = (e, productId) => {
    e.preventDefault(); // <-- Empêche l'action par défaut
    axios
      .get(`http://localhost:5000/removeProduct/${productId}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          fetchBasket();
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => setError("Erreur lors de la suppression."));
  };

  // Vider tout le panier
  const clearBasket = (e) => {
    e.preventDefault(); // <-- Empêche l'action par défaut
    axios
      .get("http://localhost:5000/clearBasket", { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          fetchBasket();
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => setError("Erreur lors du vidage du panier."));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3 text-center">Votre panier</h1>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <form onSubmit={handleFormSubmit}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Produit</th>
              <th scope="col">Prix</th>
              <th scope="col"className="d-flex justify-content-end ">Quantité</th>
              <th scope="col"className="text-danger fw-bold fst-italic">Erreur</th>
              <th scope="col"className="text-warning fw-bold fst-italic">Action</th>
              <th scope="col">Total</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
                return (
                    <tr key={item.product.id}>
                        <td className="text-capitalize">{item.product.nom}</td>
                        <td>{item.product.prix} €</td>
                        <td>
                          <div className="d-flex">
                              <div className="ms-auto col-5 ">
                                  <input 
                                      type="string"
                                      name={`product-${item.product.id}`}
                                      pattern="^[1-9][0-9]*$"
                                      defaultValue={inputValues[item.product.id] || (item.quantite ? item.quantite.toString() : '1')}
                                      onChange={(e) => handleInputChange(e, item.product.id)}
                                      className="form-control text-end"
                                  />
                              </div>
                          </div>
                      </td>

                        <td className="">
                            <span className="text-danger fst-italic fw-bold f">{inputErrors[item.product.id]}</span>
                        </td>
                        <td>
                            <button 
                              type="button" 
                              className={`btn btn-warning  ${modifiedFields[item.product.id] ? "" : "d-none"}`}
                              onClick={() => handleApply(item.product.id)}
                            >
                              Appliquer
                            </button>
                        </td>
                        <td>
                            {item.total
                              ? item.total
                              : item.product.prix * item.quantite}{" "}
                            €
                        </td>
                        <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={(e) => removeItem(e, item.product.id)}
                            >
                              <i className="bi bi-dash-circle"></i>
                            </button>
                        </td>
                    </tr>
                );
            })}
        </tbody>

        </table>

        <div className="text-end mt-3">
          Prix total:{" "}
          <span className="fw-bold text-success">{totalPrice} €</span>
          <button
            type="button"
            className="btn btn-danger btn-sm mx-2"
            onClick={(e) => clearBasket(e)}
          >
            <i className="bi bi-trash"></i> Vider le panier
          </button>
          <button type="submit" className="btn btn-success btn-sm">
            Valider le panier
          </button>
        </div>
      </form>
    </div>
  );
};

export default Basket;
