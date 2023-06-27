import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then(response => {
        setProducts(response.data);
        setError('');
        setLoading(false);
      })
      .catch(error => {
        setError('Erreur lors du chargement des produits.');
        setLoading(false);
        setProducts([]);
      });
  }, []);

  return (
    <div>
    <h1>Nos Produits</h1>
    {loading ? (
      'Chargement...'
    ) : (
      <div>
        {products.map(product => (
          <div key={product._id}>
            {/* <p>{product._id}</p> */}
            <img src={`http://localhost:5000/uploads/${product.photo}`}  width="300px"/>
            <p>{product.prix}</p>
            <h2>{product.nom}</h2>
            <p>{product.categorie}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
}

export default AllProducts;
