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
          "https://uppercase-app-back-efd9a0ca1970.herokuapp.com/products",
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
    <div className="row col-lg-10 justify-content-center mx-4 mt-3 ">
      {Object.keys(categoriesWithImages).map((category) => (
        <div className="col d-flex justify-content-center" key={category}>
          <Link
            to={`/category/${category}`}
            className="card-custom mb-2"
          >
            <img
              src={`https://uppercase-app-back-efd9a0ca1970.herokuapp.com/uploads/${categoriesWithImages[category]}`}
              className="card-img-top rounded-top"
              alt={category}
            />
            <div className="card-body text-center ">
              <p className="card-title text-capitalize fw-light fs-5">
                {category}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>

  );
};

export default Category;
