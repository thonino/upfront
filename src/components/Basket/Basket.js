import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext.js";
import { Link } from "react-router-dom";

const Basket = () => {
  // Initialiser les états locaux
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});
  const [inputErrors, setInputErrors] = useState({});

  // Récupérer les éléments du panier au chargement du composant
  useEffect(() => {
    fetchBasket();
  }, []);

  // Récupérer les éléments du panier depuis l'API
  const fetchBasket = async () => {
    try {
      const response = await axios.get("http://localhost:5000/basket", {
        withCredentials: true,
      });
      setCartItems(response.data.cartItems);
      setTotalPrice(response.data.prix_total);
      const initialValues = {};
      response.data.cartItems.forEach((item) => {
        initialValues[item.product.id] = item.quantite;
      });
      setInputValues(initialValues);
    } catch (err) {
      setError("Erreur lors de la récupération du panier.");
    }
  };

  // Gérer les changements d'input des quantités de produits
  const handleInputChange = (e, productId) => {
    const value = e.target.value;
    setInputValues((prevValues) => ({ ...prevValues, [productId]: value }));
    const isValid = /^[1-9][0-9]*$/.test(value) || value === "";
    if (isValid) {
      setInputErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[productId];
        return updatedErrors;
      });
    } else {
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        [productId]: "Minimum = 1",
      }));
    }
    setModifiedFields((prev) => ({ ...prev, [productId]: true }));
  };

  // Mettre à jour les quantités modifiées dans le panier
  const handleApply = () => {
    const quantities = {};
    for (let productId in modifiedFields) {
      if (modifiedFields[productId]) {
        quantities[productId] = inputValues[productId];
      }
    }
    updateQuantities(quantities);
    setModifiedFields({});
  };

  // Mettre à jour les quantités de produits dans l'API
  const updateQuantities = async (quantities) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/update-quantities",
        quantities,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        fetchBasket();
      } else {
        setError(
          response.data.message || "Erreur inattendue lors de la mise à jour."
        );
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour.");
    }
    document.activeElement.blur();
  };

  // Retirer un produit du panier
  const removeItem = async (e, productId) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/removeProduct/${productId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        fetchBasket();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Erreur lors de la suppression.");
    }
  };
  // Vider le panier
  const clearBasket = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/clearBasket", {
        withCredentials: true,
      });
      if (response.data.success) {
        fetchBasket();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Erreur lors du vidage du panier.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: isLoggedIn ? user.data.email : e.target.email.value,
      prix_total: totalPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/validateBasket",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        window.location.href = `/order/${response.data.basketId}`;
      } else {
        setError(
          response.data.message || "Erreur lors de la validation du panier."
        );
      }
    } catch (err) {
      setError("Erreur lors de la validation du panier.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3 text-center">Votre panier</h1>
      {error && <div className="alert alert-danger mb-3">{error}</div>}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Produit</th>
            <th scope="col">Prix</th>
            <th scope="col" className="d-flex justify-content-end">
              Quantité
            </th>
            <th scope="col"></th>
            <th scope="col" className="text-warning fw-bold fst-italic">
              Action
            </th>
            <th scope="col">Total</th>
            <th scope="col" className="text-danger fw-bold fst-italic">
              Retirer
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product.id}>
              <td className="text-capitalize">{item.product.nom}</td>
              <td>{item.product.prix} €</td>
              <td>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleApply(item.product.id);
                  }}
                >
                  <div className="d-flex">
                    <div className="ms-auto col-5 ">
                      <input
                        type="text"
                        name={`product-${item.product.id}`}
                        pattern="^[1-9][0-9]*$"
                        defaultValue={
                          inputValues[item.product.id] ||
                          (item.quantite ? item.quantite.toString() : "1")
                        }
                        onChange={(e) => handleInputChange(e, item.product.id)}
                        className="form-control text-end"
                      />
                    </div>
                  </div>
                </form>
              </td>
              <td className="">
                <span className="text-danger fst-italic fw-bold">
                  {inputErrors[item.product.id]}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className={`btn fst-italic btn-warning ${
                    modifiedFields[item.product.id] ? "" : "d-none"
                  }`}
                  onClick={() => handleApply(item.product.id)}
                  disabled={
                    !inputValues[item.product.id] ||
                    parseInt(inputValues[item.product.id], 10) < 1
                  }
                >
                  Appliquer
                </button>
              </td>
              <td>
                {item.total ? item.total : item.product.prix * item.quantite} €
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
          ))}
        </tbody>
      </table>
      <div className="text-end mt-3">
        {cartItems.length > 0 ? (
          <>
            <p className="text-end fs-4 fw-bold">
              Prix total:{" "}
              <span className="fw-bold text-success">{totalPrice} €</span>
            </p>
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="mb-3">
                {isLoggedIn && user && user.data ? (
                  <>
                    <p className="fs-4">
                      <strong>Votre email : </strong>
                      <span className="text-success">{user.data.email}</span>
                    </p>
                    <input type="hidden" name="email" value={user.data.email} />
                  </>
                ) : (
                  <>
                    <label htmlFor="email" className="form-label">
                      Votre email :
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Renseignez votre email où connectez vous"
                      className="form-control"
                      required
                      onInvalid={(e) => {
                          e.target.setCustomValidity("Renseignez votre email où connectez vous !");
                      }}
                      onChange={(e) => e.target.setCustomValidity('')} 
                  />
                  </>
                )}
              </div>
              <Link className="btn btn-warning" to="/products">
                <i className="bi bi-plus-lg"> Ajouter</i>
              </Link>
              <button className="btn btn-danger mx-2" onClick={clearBasket}>
                <i className="bi bi-trash"> Vider panier</i>
              </button>
              <input type="hidden" name="prix_total" value={totalPrice} />
              <button type="submit" className="btn btn-success">
                Valider le panier
              </button>
            </form>
          </>
        ) : (
          <p>Votre panier est vide.</p>
        )}
      </div>
    </div>
  );
};

export default Basket;
