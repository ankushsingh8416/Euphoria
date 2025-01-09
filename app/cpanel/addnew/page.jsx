"use client";
import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";

const AddNew = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    defaultImage: "",
    color: "",
    brand: "",
    size: [],
    category: "",
    page: "",
    readyToShip: false,
    newArrivals: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(formData)
    alert(submitted)
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedSizes = checked
        ? [...prevData.size, value]
        : prevData.size.filter((size) => size !== value);
      return { ...prevData, size: updatedSizes };
    });
  };

  const handleStatusChange = (status) => {
    setFormData({
      ...formData,
      readyToShip: status === "readyToShip",
      newArrivals: status === "newArrivals",
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={handleChange} className="w-[90%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 bg-white shadow-md">
        {/* Title and Price */}
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label className="w-full mb-2 text-gray-700 block" htmlFor="title">
              Title
            </label>
            <input
              required
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
            <label className="w-full mb-2 text-gray-700 block" htmlFor="price">
              Price
            </label>
            <input
              required
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
          <label
            className="w-full mb-2 text-gray-700 block"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full h-24 text-lg bg-transparent outline-none border border-gray-600 p-2 placeholder:text-gray-500 text-textColor rounded-md"
          />
        </div>

        {/* Color and Page */}
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label className="w-full mb-2 text-gray-700 block" htmlFor="color">
              Color
            </label>
            <input
              required
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
            <label className="w-full mb-2 text-gray-700 block" htmlFor="page">
              Page
            </label>
            <select
            required
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
          <div className="w-[60%] m-auto h-[300px] flex justify-center items-center flex-col border-2 border-dotted border-gray-300 cursor-pointer rounded-lg">
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
              <p className="text-gray-500 hover:text-gray-700">
                Click here to upload Image
              </p>
              <input
                required
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

        {/* Category and Brand */}
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label
              className="w-full mb-2 text-gray-700 block"
              htmlFor="category"
            >
              Category
            </label>
            <select
            required
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

          <div className="w-full">
            <label className="w-full mb-2 text-gray-700 block" htmlFor="brand">
              Brand
            </label>
            <select
            required
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
        <div className="w-full">
          <label className="w-full mb-2 text-gray-700 block">Size</label>
          <div className="flex gap-4">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <div key={size} className="flex items-center gap-2">
                <input
                  required
                  type="checkbox"
                  id={`size-${size}`}
                  value={size}
                  checked={formData.size.includes(size)}
                  onChange={handleSizeChange}
                  className="cursor-pointer"
                />
                <label htmlFor={`size-${size}`} className="cursor-pointer">
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Status */}
        <div className="w-full">
          <label className="w-full mb-2 text-gray-700 block">
            Product Status
          </label>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="readyToShip"
                name="status"
                checked={formData.readyToShip}
                onChange={() => handleStatusChange("readyToShip")}
                className="cursor-pointer"
              />
              <label htmlFor="readyToShip" className="cursor-pointer">
                Ready to Ship
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="newArrivals"
                name="status"
                checked={formData.newArrivals}
                onChange={() => handleStatusChange("newArrivals")}
                className="cursor-pointer"
              />
              <label htmlFor="newArrivals" className="cursor-pointer">
                New Arrivals
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center w-full">
          <button
            type="submit"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNew;
