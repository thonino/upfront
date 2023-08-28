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
    <div className="d-flex flex-column">
      <div className="text-center">
        <img src="http://localhost:5000/img/hero3.png" className="w-100" alt="Hero 1" />
      </div>
      {loading ? (
        "Chargement..."
      ) : (
        <div><h1 className="text-center"> Nos Catégories</h1>
        <h1 className="text-center"></h1>
        <div className="d-flex flex-wrap justify-content-center gap-2 rounded mt-3">
          {Object.keys(categoriesWithImages).map((category) => (
            <Link to={`/category/${category}`} key={category} className="card text-decoration-none">
              <img
                src={`http://localhost:5000/uploads/${categoriesWithImages[category]}`}
                width="600px"
                alt={category}
              />
              <h3 className="text-capitalize fw-bold text-center">{category}</h3>
            </Link>
          ))}
        </div>
    </div>
      )}
    </div>
  );

};

export default Home;
