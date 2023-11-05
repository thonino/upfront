import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext.js";
import { CartContext } from "../CartContext/CartContext.js";

function Products() {
  const { checkCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { user } = useContext(AuthContext);
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://uppercase-app-back-efd9a0ca1970.herokuapp.com/products", { withCredentials: true })
      .then((response) => {
        const filteredProducts = category
          ? response.data.filter((product) => product.categorie === category)
          : response.data;
        setProducts(filteredProducts);
        setError("");
        setLoading(false);

        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.categorie)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        setError("Erreur lors du chargement des produits.");
        setLoading(false);
        setProducts([]);
      });
  }, [category]);

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    navigate(`/category/${selectedCategory}`);
  };

  const addToCart = (productId) => {
    axios
      .post(`https://uppercase-app-back-efd9a0ca1970.herokuapp.com/add-to-cart/${productId}`, {}, { withCredentials: true })
      .then((response) => {
        checkCart();
        setMessage("Bravo, le produit a été ajouté au panier !");
        setTimeout(() => {
          setMessage(null);
        }, 2500);
      })
      .catch((error) => {
        setMessage("Erreur lors de l'ajout au panier.");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
      
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://uppercase-app-back-efd9a0ca1970.herokuapp.com/product/delete/${id}`, { withCredentials: true })
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
        setProductToDelete(null);
      })
      .catch((error) => {
        console.error(error);
        setProductToDelete(null);
      });
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-2">Nos Produits</h1>
      <div className="mb-4 col-6  mx-auto">
        <select
          className="form-select text-center"
          aria-label="Default select example"
          onChange={handleChange}
          value={category}
        >
          <option value="Choisir une catégorie">Choisir une catégorie</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {message && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button onClick={() => setMessage(null)} type="button" className="btn-close"></button>
              </div>
              <div className="modal-body">
                <p>{message}</p>
              </div>
              <div className="modal-footer">
                <button onClick={() => setMessage(null)} type="button" className="btn btn-secondary">OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div className="col d-flex justify-content-center" key={product._id}>
              <div className="card h-100 category-card" style={{ width: "300px" }}>
              <Link onClick={() => openProductDetails(product)}>
                <img
                  src={`https://uppercase-app-back-efd9a0ca1970.herokuapp.com/uploads/${product.photo}`}
                  className="card-img-top"
                  alt={product.photo}
                />
                </Link>
                <div className="card-body">
                  <p className="text-center text-dark fw-bold fs-4 m-0 ">{product.prix}€</p>
                  <h3 className="card-title text-capitalize fw-light text-center">{product.nom}</h3>
                </div>
                <div className="card-footer">
                  <div className="d-flex row justify-content-center px-1">
                    <button
                      className="btn btn-warning text-center"
                      onClick={() => addToCart(product._id)}
                    >
                      Ajouter au Panier
                    </button>
                    
                  </div>
                  {user && user.data && user.data.role === 'admin' && (
                    <div className="mt-2 d-flex justify-content-around">
                      <Link
                        to={`/product/edit/${product._id}`}
                        className="btn btn-warning"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => setProductToDelete(product._id)}
                        className="btn btn-danger"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {productToDelete && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button onClick={() => setProductToDelete(null)} type="button" className="btn-close"></button>
              </div>
              <div className="modal-body">
                <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
              </div>
              <div className="modal-footer">
                <button onClick={() => setProductToDelete(null)} type="button" className="btn btn-secondary">Annuler</button>
                <button onClick={() => handleDelete(productToDelete)} type="button" className="btn btn-danger">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedProduct && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.nom}</h5>
                <button onClick={closeProductDetails} type="button" className="btn-close"></button>
              </div>
              <div className="modal-body">
                <img
                  src={`https://uppercase-app-back-efd9a0ca1970.herokuapp.com/uploads/${selectedProduct.photo}`}
                  className="img-fluid mb-3"
                  alt={selectedProduct.photo}
                />
                <p><strong>Catégorie:</strong> {selectedProduct.categorie}</p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
              </div>
              <div className="modal-footer">
                <button onClick={closeProductDetails} type="button" className="btn btn-secondary">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;