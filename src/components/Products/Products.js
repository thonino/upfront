import React, { useEffect, useState } from "react";
import axios from "axios";
import "./products.css";
import { Link } from "react-router-dom";
// import DeleteProduct from "../DeleteProduct/DeleteProduct.js";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
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

  return (
    <div>
      <h1>Nos Produits</h1>
      {loading ? (
        "Chargement..."
      ) : (
        <div className="d-flex flex-wrap justify-content-center gap-2 rounded">
          {products.map((product) => (
            <div className="card" key={product._id}>
              {/* <p>{product._id}</p> */}
              <img
                src={`http://localhost:5000/uploads/${product.photo}`}
                width="300px"
                alt={product.photo}
              />
              <p className="fw-bold fs-4">{product.prix}</p>
              <h3 className="text-capitalize fw-bold">{product.nom}</h3>
              <p>{product.categorie}</p>
              <p>{product.description}</p>
              <div>
                <a
                  href={"/product/edit/"+ product._id}
                  className="btn btn-warning mb-2 me-2"
                >
                  Modifier
                </a>
                <Link
                  to={`/product/delete/${product._id}`}
                  className="btn btn-danger mb-2"
                >
                  Supprimer
                </Link>
              </div>
              <button className="btn btn-warning "> Ajouter Panier</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
