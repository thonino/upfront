import React, { useEffect, useState } from "react";
import axios from "axios";
import "./products.css";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <div >
      <h1>Nos Produits</h1>
      {loading ? ( "Chargement..." ) : (
        <div className="d-flex flex-wrap justify-content-center gap-2 rounded">
          {products.map((product) => (
            <div className="card" key={product._id}>
              {/* <p>{product._id}</p> */}
              <img
                src={`http://localhost:5000/uploads/${product.photo}`}
                width="300px"
              />
              <p className="fw-bold fs-4">{product.prix}</p>
              <h3 className="text-capitalize fw-bold">{product.nom}</h3>
              <p>{product.categorie}</p>
              <p>{product.description}</p>
              <a className="btn btn-warning " src="#"> Ajouter Panier</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
