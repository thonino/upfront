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
          "http://localhost:5000/products",
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
    <div className="justify-content-center gap-4 mt-3 px-2
      row row-cols-1 
        row-cols-sm-2 
          row-cols-md-3 
            row-cols-lg-4 
              row-cols-xl-5 
                ">
      {Object.keys(categoriesWithImages).map((category) => (
        <div className="col d-flex justify-content-center" key={category}>
          <Link
            to={`/category/${category}`}
            className="card text-decoration-none category-card"
            style={{ width: "270px" }}
          >
            <img
              src={`http://localhost:5000/uploads/${categoriesWithImages[category]}`}
              className="card-img-top"
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
