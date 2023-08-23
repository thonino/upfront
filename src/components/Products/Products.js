import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./products.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext"; 

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);

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
    console.log("Tentative d'ajout au panier pour le produit:", productId);

    axios.post(`http://localhost:5000/add-to-cart/${productId}`, {}, { withCredentials: true })
      .then(response => {
        console.log('Produit ajouté au panier avec succès:', response.data);
        // Gérer la réponse, par exemple: notifier l'utilisateur
      })
      .catch(error => {
        console.error('Erreur lors de l’ajout du produit au panier:', error.response ? error.response.data : error.message);
        // Gérer l'erreur, par exemple: afficher une notification
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
              <p className="fw-bold fs-4">{product.prix}</p>
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
    </div>
  );
}

export default Products;
