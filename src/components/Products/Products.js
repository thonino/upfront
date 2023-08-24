import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./products.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext"; 

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products",{ withCredentials: true })
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
                  <Link
                    to={`/product/delete/${product._id}`}
                    className="btn btn-danger mb-2"
                  >
                    Supprimer
                  </Link>
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
    </div>
  );
  

}

export default Products;
