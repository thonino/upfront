import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [categoriesWithImages, setCategoriesWithImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        const categoriesWithImages = {};
        response.data.forEach((product) => {
          if (!categoriesWithImages[product.categorie]) {
            categoriesWithImages[product.categorie] = product.photo;
          }
        });
        setCategoriesWithImages(categoriesWithImages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
<div className="d-flex flex-column align-items-center">
  <div className="text-center mb-4">
    <img src="http://localhost:5000/img/hero3.png" className="w-100" alt="Hero 1" />
  </div>
  {loading ? (
    "Chargement..."
  ) : (
    <div className="text-center container">
      <h1>Les Catégories</h1>
      <div className="d-flex flex-wrap justify-content-center gap-4 mt-3">
        {Object.keys(categoriesWithImages).map((category) => (
          <Link
            to={`/category/${category}`}
            key={category}
            className="card text-decoration-none shadow-sm category-card"
            style={{ width: "300px" }}
          >
            <img
              src={`http://localhost:5000/uploads/${categoriesWithImages[category]}`}
              className="card-img-top"
              alt={category}
            />
            <div className="card-body text-center">
              <h3 className="card-title text-capitalize fw-bold">{category}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )}
</div>





  );

};

export default Home;
