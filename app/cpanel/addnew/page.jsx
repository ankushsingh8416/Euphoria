"use client"
import React, { useState } from 'react';

const AddNewProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    defaultImage: '',
    hoverImage: '',
    readyToShip: false,
    isNewArrival: false,
    color: '',
    brand: '',
    size: [],
    category: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      size: value.split(',').map((size) => size.trim()),
    }));
  };

  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setProduct({
          ...product,
          [name]: reader.result,
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    // Add product submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      {/* Other form fields here */}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Default Image</label>
        <input
          type="file"
          name="defaultImage"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {product.defaultImage && (
          <img src={product.defaultImage} alt="Default" className="mt-2 h-32 w-32 object-cover" />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Hover Image</label>
        <input
          type="file"
          name="hoverImage"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {product.hoverImage && (
          <img src={product.hoverImage} alt="Hover" className="mt-2 h-32 w-32 object-cover" />
        )}
      </div>

      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700">
          Update
        </button>
        <button type="button" className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700">
          Delete
        </button>
        <button type="button" className="bg-gray-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-700">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddNewProduct;
