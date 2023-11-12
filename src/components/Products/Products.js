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
      .get("http://localhost:5000/products", { withCredentials: true })
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
      .post(`http://localhost:5000/add-to-cart/${productId}`, {}, { withCredentials: true })
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
      .delete(`http://localhost:5000/product/delete/${id}`, { withCredentials: true })
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
      <h1 className="text-center c1 pacifico mt-2">Nos Produits</h1>
      <div className="mb-4 col-6  mx-auto">
        <select
          className="form-select text-center"
          onChange={handleChange}
          value={category}
        >
          <option value="Choisir une catégorie">
            Choisir une catégorie
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              <p className="pacifico">{cat}</p>
            </option>
          ))}
        </select>
      </div>
      {message && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
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
              <div className="card-custom" style={{ width: "300px" }}>
              <Link onClick={() => openProductDetails(product)}>
                <img
                  src={`http://localhost:5000/uploads/${product.photo}`}
                  className="card-img-top rounded-top"
                  alt={product.photo}
                />
                </Link>
                <div className="card-body">
                  <p className="text-center text-dark fw-bold fs-2 m-0 dancing ">{product.prix}€</p>
                  <h3 className="card-title text-capitalize fw-light text-center roboto">{product.nom}</h3>
                </div>
                <div className="card-footer">
                  <div className="d-flex row justify-content-center ">
                    <Link
                      className="tdn pacifico text-center fs-4 mb-2 hover"
                      onClick={() => addToCart(product._id)}
                      
                    >
                      Ajouter au Panier
                    </Link>
                    
                  </div>
                  {user && user.data && user.data.role === 'admin' && (
                    <div className="mt-2 d-flex justify-content-around mb-2">
                      <Link
                        to={`/product/edit/${product._id}`}
                        className="bouton-1 w120 roboto fs-5"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => setProductToDelete(product._id)}
                        className="bouton-2 w120 "
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
                  src={`http://localhost:5000/uploads/${selectedProduct.photo}`}
                  className="img-fluid mb-3"
                  alt={selectedProduct.photo}
                />
                <p><strong>Catégorie:</strong> {selectedProduct.categorie}</p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
              </div>
              <div className="modal-footer">
                <button onClick={closeProductDetails} type="button" className="bouton-1">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
