import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categoriesWithImages, setCategoriesWithImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://uppercase-back-1eec3e8a2cf1.herokuapp.com/products",
          { withCredentials: true }
        );

        const newCategoriesWithImages = response.data.reduce((acc, product) => {
          if (!acc[product.categorie]) {
            acc[product.categorie] = product.photo;
          }
          return acc;
        }, {});

        setCategoriesWithImages(newCategoriesWithImages);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return "Chargement...";
  }

  if (error) {
    return "Une erreur est survenue.";
  }

  return (
    <div className="d-flex flex-wrap justify-content-center gap-4 mt-3 px-2 ">
      {Object.keys(categoriesWithImages).map((category) => (
        <Link
          to={`/category/${category}`}
          key={category}
          className="card text-decoration-none category-card"
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
