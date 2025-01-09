"use client"
import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';

const AddNew = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    defaultImage: '',
    color: '',
    brand: '',
    size: [],
    category: '',
    page: '',
    readyToShip: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };



  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[90%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 bg-white shadow-md">

        {/* Title */}
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label className="w-full mb-2 text-gray-700 block" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Give me a title..."
              value={formData.title}
              onChange={handleChange}
              className="w-full text-lg bg-transparent outline-none border border-gray-600 p-2 placeholder:text-gray-500 text-textColor rounded-md"
            />
          </div>

          <div className="w-full">
            <label className="w-full mb-2 text-gray-700 block" htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full text-lg bg-transparent outline-none border border-gray-600 p-2 placeholder:text-gray-500 text-textColor rounded-md"
            />
          </div>
        </div>

        {/* Description */}
        <div className="w-full">
          <label className="w-full mb-2 text-gray-700 block" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full h-24 text-lg bg-transparent outline-none border border-gray-600 p-2 placeholder:text-gray-500 text-textColor rounded-md"
          />
        </div>

        {/* Color and page */}
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label className="w-full mb-2 text-gray-700 block" htmlFor="color">Color</label>
            <input
              type="text"
              id="color"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
              className="w-full text-lg bg-transparent outline-none border border-gray-600 p-2 placeholder:text-gray-500 text-textColor rounded-md"
            />
          </div>

          <div className="w-full">
            <label className="w-full mb-2 text-gray-700 block" htmlFor="page">Page</label>
            <select
              id="page"
              name="page"
              value={formData.page}
              onChange={handleChange}
              className="w-full text-lg bg-transparent outline-none border border-gray-600 p-2 placeholder:text-gray-500 text-textColor rounded-md"
            >
              <option value="">Select Page</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Wedding">Wedding</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Accessories">Accessories</option>
              <option value="Gifting">Gifting</option>
              <option value="Discover">Discover</option>
              <option value="Celebrity Closet">Celebrity Closet</option>
              <option value="Sale">Sale</option>
            </select>
          </div>


        </div>

        {/* Image Upload */}
        <div className="w-full my-8">
          <div className="w-[60%] m-auto h-[300px] flex justify-center items-center flex-col border-2 border-dotted border-gray-300 h-225 md:h-340 cursor-pointer rounded-lg">
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
              <p className="text-gray-500 hover:text-gray-700">Click here to upload Image</p>
              <input
                type="file"
                id="defaultImage"
                name="defaultImage"
                accept="image/*"
                onChange={handleChange}
                className="w-0 h-0"
              />
            </label>
          </div>
        </div>

        {/* Category */}
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label className="w-full mb-2 text-gray-700 block" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full text-base border border-gray-600 p-2 rounded-md cursor-pointer"
            >
              <option value="">Select Category</option>
              <option value="Kurti">Kurti</option>
              <option value="Saree">Saree</option>
              <option value="Lehenga">Lehenga</option>
              <option value="Kaftan">Kaftan</option>
              <option value="Suit">Suit</option>
            </select>
          </div>

          {/* Brand */}
          <div className="w-full">
            <label className="w-full mb-2 text-gray-700 block" htmlFor="brand">Brand</label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full text-base border border-gray-600 p-2 rounded-md cursor-pointer"
            >
              <option value="">Select Brand</option>
              <option value="FabIndia">FabIndia</option>
              <option value="Biba">Biba</option>
              <option value="W for Women">W for Women</option>
              <option value="Manish Malhotra">Manish Malhotra</option>
            </select>
          </div>

        </div>


        {/* Size */}
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label className="w-full mb-2 text-gray-800 block font-semibold text-lg">Size</label>
            <div className="flex flex-wrap gap-4">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <div key={size} className="checkbox-wrapper-50">
                  <input
                    type="checkbox"
                    id={size}
                    name="size"
                    className="plus-minus"
                  />
                  <label htmlFor={size} className="text-gray-800 cursor-pointer font-medium ml-2 text-xl font-bold">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <label className="w-full mb-2 text-gray-800 block font-semibold text-lg">Product Status</label>
            <div className="flex flex-col gap-2">
              {[
                { label: "READY TO SHIP" },
                { label: "NEW ARRIVALS" },
              ].map((status) => (
                <div key={status.label} className="flex items-center gap-2 radio-wrapper-9">
                  <input
                    type="radio"
                    id={status.label}
                    name="readyToShip"
                    className="cursor-pointer"
                  />
                  <label htmlFor={status.label} className="text-gray-800 cursor-pointer font-medium">
                    {status.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Save Button */}
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={() => console.log(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
