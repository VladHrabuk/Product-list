import { AddButton } from './buttons/AddButton';
import React from 'react';
import { useState, useEffect } from 'react';
import ProductService from '../api/productService';

export const Navbar = ({ setProducts }) => {
  const [sortByParameter, setSortByParameter] = useState('alphabetical');

  useEffect(() => {
    ProductService.getAllProducts(sortByParameter)
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data from server:', error);
      });
  }, [sortByParameter]);

  return (
    <nav className="px-16 pb-8 flex flex-row justify-between">
      <select
        value={sortByParameter}
        onChange={(e) => setSortByParameter(e.target.value)}
        className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
      >
        <option value="alphabetical">By alphabet</option>
        <option value="count">By count</option>
      </select>
      <AddButton />
    </nav>
  );
};
