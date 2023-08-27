import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./products.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext"; 

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur lors du chargement des produits.");
        setLoading(false);
        setProducts([]);
      });
  }, []);

  const addToCart = (productId) => {
    axios.post(`http://localhost:5000/add-to-cart/${productId}`, {}, { withCredentials: true })
      .then(response => {
        setMessage("Bravo, le produit a été ajouté au panier !");
        setTimeout(() => {
          setMessage(null);  
        }, 2500);
      })
      .catch(error => {
        setMessage("Erreur lors de l'ajout au panier.");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/product/delete/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
        setProductToDelete(null);
      })
      .catch((error) => {
        console.error(error);
        setProductToDelete(null);
      });
  };

  return (
    <div>
      <h1>Nos Produits</h1>
      {loading ? (
        "Chargement..."
      ) : (
        <div className="d-flex flex-wrap justify-content-center gap-2 rounded">
          {products.map((product) => (
            <div className="card" key={product._id}>
              <img
                src={`http://localhost:5000/uploads/${product.photo}`}
                width="300px"
                alt={product.photo}
              />
              <p className="fw-bold fs-4">{product.prix}€</p>
              <h3 className="text-capitalize fw-bold">{product.nom}</h3>
              <p>{product.categorie}</p>
              <p>{product.description}</p>
  
              {user && user.data && user.data.role === 'admin' ? (
                <div>
                  <Link
                    to={`/product/edit/${product._id}`}
                    className="btn btn-warning mb-2 me-2"
                  >
                    Modifier
                  </Link>
                  <button onClick={() => setProductToDelete(product._id)} className="btn btn-danger mb-2">
                    Supprimer
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-warning"
                  onClick={() => addToCart(product._id)}
                >
                  Ajouter au Panier
                </button>
              )}
            </div>
          ))}
        </div>
      )}
  
      {message && (
        <div className="modal show d-block">
          <div className="modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: "rgba(0, 0, 0, 0.80)" }}>
              <div className="fw-lighter  fst-italic  text-warning text-center fs-1">
                {message}
              </div>
            </div>
          </div>
        </div>
      )}

      {productToDelete && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button onClick={() => setProductToDelete(null)} type="button" className="btn-close" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Voulez-vous vraiment supprimer ce produit ?</p>
              </div>
              <div className="modal-footer">
                <button onClick={() => setProductToDelete(null)} type="button" className="btn btn-secondary">Annuler</button>
                <button onClick={() => handleDelete(productToDelete)} type="button" className="btn btn-danger">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  

}

export default Products;
