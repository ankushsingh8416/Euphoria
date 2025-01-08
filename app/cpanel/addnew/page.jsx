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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    // Add product submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Brand Name</label>
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            value={product.sku || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Regular Price</label>
          <input
            type="text"
            name="regularPrice"
            value={product.regularPrice || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sale Price</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="text"
          name="color"
          value={product.color}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Size (comma separated)</label>
        <input
          type="text"
          name="size"
          value={product.size.join(', ')}
          onChange={handleSizeChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="readyToShip"
            checked={product.readyToShip}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Ready to Ship</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isNewArrival"
            checked={product.isNewArrival}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">New Arrival</label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Default Image URL</label>
        <input
          type="text"
          name="defaultImage"
          value={product.defaultImage}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Hover Image URL</label>
        <input
          type="text"
          name="hoverImage"
          value={product.hoverImage}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
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
