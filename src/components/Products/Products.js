import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [categories, setCategories] = useState([]);

  const { user } = useContext(AuthContext);
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
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
      <h1 className="text-center mt-2">Nos Produits</h1>
      <div className="mb-4 col-4 mx-auto">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={handleChange}
          value={category || "Choisir une catégorie"}
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
        <div className="modal show d-block">
          <div className="">
            <div className="modal-content" style={{ backgroundColor: "rgba(0, 0, 0, 0.80)" }}>
              <div className="fw-lighter  fst-italic  text-warning text-center fs-1">
                {message}
              </div>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        "Chargement..."
      ) : (
        <div className="d-flex flex-wrap justify-content-center gap-2 rounded text-center">
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
  
              <Link
                to={`/product/${product._id}`}
                className="btn btn-info mb-2 mx-2"
              >
                Voir
              </Link>

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
                  className="btn btn-warning mx-2 mb-2"
                  onClick={() => addToCart(product._id)}
                >
                  Ajouter au Panier
                </button>
              )}
            </div>
          ))}
        </div>
      )}
  
      {productToDelete && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
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
    </div>
  );
}

export default Products;
