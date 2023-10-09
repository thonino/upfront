import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categoriesWithImages, setCategoriesWithImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://uppercase-back-1eec3e8a2cf1.herokuapp.com/products", { withCredentials: true })
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

  if (loading) {
    return "Chargement...";
  }

  return (
    <div className="d-flex flex-wrap justify-content-center gap-4 mt-3 px-2 ">
      {Object.keys(categoriesWithImages).map((category) => (
        <Link
          to={`/category/${category}`}
          key={category}
          className="card text-decoration-none category-card "
          style={{ width: "300px" }}
        >
          <img
            src={`https://uppercase-back-1eec3e8a2cf1.herokuapp.com/uploads/${categoriesWithImages[category]}`}
            className="card-img-top"
            alt={category}
          />
          <div className="card-body text-center ">
            <p className="card-title text-capitalize fw-light fs-4">
              {category}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
