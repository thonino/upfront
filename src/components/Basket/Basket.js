import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext.js";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext.js";

const Basket = () => {
  const { checkCart } = useContext(CartContext); // Check nb article
  const { isLoggedIn,  user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});
  const [inputErrors, setInputErrors] = useState({});

  // Récupérer éléments du panier au chargement 
  useEffect(() => {fetchBasket();}, []);

  // Récupérer les éléments du panier depuis l'API
  const fetchBasket = async () => {
    try {
      const response = await axios.get("https://uppercase-app-back-efd9a0ca1970.herokuapp.com/basket", {
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
      "https://uppercase-app-back-efd9a0ca1970.herokuapp.com/update-quantities",
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
        `https://uppercase-app-back-efd9a0ca1970.herokuapp.com/removeProduct/${productId}`,
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
      const response = await axios.get("https://uppercase-app-back-efd9a0ca1970.herokuapp.com/clearBasket", {
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
        "https://uppercase-app-back-efd9a0ca1970.herokuapp.com/validateBasket",
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

  checkCart();
  
  return (
    <div className="container mt-4">
      <h1 className="mb-3 c1 pacifico text-center">Votre panier</h1>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <table className="table ">
        <thead>
            <tr className="dancing fs-5">
                <th scope="col" className="align-middle">Produit</th>
                <th scope="col" className="align-middle">Prix</th>
                <th scope="col" className="col-1 text-center align-middle">Quantité</th>
                <th scope="col" className="text-center align-middle">Total</th>
                <th scope="col" className="fw-bold fst-italic align-middle">
                    <span className="c2">Retirer</span>
                </th>
                {cartItems.some(item => modifiedFields[item.product.id]) && (
                    <th scope="col" className="text-warning fw-bold fst-italic align-middle">
                        Action
                    </th>
                )}
            </tr>
        </thead>
        <tbody className="roboto">
            {cartItems.map((item) => (
                <tr key={item.product.id}>
                    <td className="text-capitalize align-middle fst-italic">{item.product.nom}</td>
                    <td className="align-middle">{item.product.prix} €</td>
                    <td className="align-middle">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleApply(item.product.id);
                            }}
                        >
                            <div className="d-flex justify-content-center">
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
                        </form>
                    </td>
                    <td className="align-middle text-center">
                        {item.total ? item.total : item.product.prix * item.quantite} €
                    </td>
                    <td className="align-middle">
                        <button
                            type="button"
                            className="bouton-1 bg-3 btn-sm"
                            onClick={(e) => removeItem(e, item.product.id)}
                        >
                            <i className="bi bi-dash-circle "></i>
                        </button>
                    </td>
                    {cartItems.some(item => modifiedFields[item.product.id]) && (
                        <td className="align-middle">
                            <button 
                                type="button" 
                                className={`btn btn-warning fst-italic  ${modifiedFields[item.product.id] ? "" : "d-none"}`}
                                onClick={() => handleApply(item.product.id)}
                                disabled={ !inputValues[item.product.id] || parseInt(inputValues[item.product.id], 10) < 1}
                            >
                                <span className="margin-left">Appliquer</span>
                            </button>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    </table>


      
      <div className="text-end mt-3 roboto">
        {cartItems.length > 0 ? (
          <>
            <p className="text-end fs-4 fw-bold ">
              Prix total:{" "}
              <span className="fw-bold c2">{totalPrice} €</span>
            </p>
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="mb-3">
                {isLoggedIn && user && user.data ? (
                  <>
                    <p className="fs-4">
                      <strong>Votre email : </strong>
                      <span className="c2">{user.data.email}</span>
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
              <Link className="bouton-1" to="/products">
                <i className="bi bi-plus-lg"> Ajouter</i>
              </Link>
              <button className="bouton-2 mx-2" onClick={clearBasket}>
                <i className="bi bi-trash"> Vider panier</i>
              </button>
              <input type="hidden" name="prix_total" value={totalPrice} />
              <button type="submit" className="bouton-1">
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
