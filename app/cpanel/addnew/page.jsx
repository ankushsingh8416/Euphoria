
"use client";
import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import ImageUploading from 'react-images-uploading';
import { FaTrash, FaEdit, FaPlusCircle } from 'react-icons/fa';
import Loader from "@/app/Components/Loader";
import toast from 'react-hot-toast';
import axios from "axios";
import Image from "next/image";

const AddNew = () => {
  const categoriesMapping = {
    Women: [
      "Kurta Sets",
      "Sarees & Blouses",
      "Lehenga Sets",
      "Dresses & Jumpsuits",
      "Co-Ord Sets",
      "Gowns",
      "Kaftans",
    ],
    Men: [
      "Kurtas & Shirts",
      "Bandhgalas",
      "Nehru Jackets",
      "Sherwanis",
      "Bottoms",
    ],
    Wedding: [
      "Lehenga Sets",
      "Sarees & Blouses",
      "Gowns",
      "Co-ord Sets",
      "Kurta Sets",
      "For Groom",
      "Sherwanis",
      "Bandhgalas",
      "Kurtas & Shirts",
      "Nehru Jackets",
    ],
    Jewelry: [
      "Earrings",
      "Necklaces",
      "Bangles & Bracelets",
      "Rings & Haathphools",
      "Maangtikkas & Mathapattis",
      "Nose Rings",
      "Waist Belts",
    ],
    Accessories: ["Scarves & Dupattas", "Bags", "Shoes", "Belts"],
    Gifting: ["Gifts for Her", "Gifts for Him"],
    Sale: [
      "Dresses & Jumpsuits",
      "Co-Ord Sets",
      "Kurta Sets",
      "Sarees & Blouses",
      "Lehenga Sets",
      "Gowns",
      "Kaftans",
      "Tops & Jackets",
    ],
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    color: "",
    brand: "",
    size: [],
    category: "",
    page: "",
    readyToShip: false,
    newArrivals: false,
  });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genrating, setGenrating] = useState(false)
  const maxNumber = 2;
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCvdEBSjT8wGlP9KV-gqD393D7qC4yRlTo"

  const onChange = async (imageList) => {
    console.log("Received imageList:", imageList); // Debugging

    // Process new and existing images
    const uploadedImages = await Promise.all(
      imageList.map(async (image) => {
        if (!image.file) {
          return {
            defaultImage: image.data_url,
            hoverImage: image.data_url,
          };
        }

        // For new uploads
        const formData = new FormData();
        formData.append("file", image.file);
        formData.append("upload_preset", "Euphoria");

        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dxhwn8am2/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            const data = await response.json();
            console.error("Cloudinary upload error:", data);
            alert(`Error: ${data.error?.message || "Failed to upload image"}`);
            return null;
          }

          const data = await response.json();
          return {
            defaultImage: data.secure_url,
            hoverImage: data.secure_url,
          };
        } catch (error) {
          console.error("Fetch error:", error);
          alert("An error occurred during the upload.");
          return null;
        }
      })
    );

    // Filter out any failed uploads
    const validImages = uploadedImages.filter((img) => img !== null);
    setImages(validImages);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "page" && { category: "" }),
    }));
  };

  const availableCategories = categoriesMapping[formData.page] || [];


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
    setFormData((prevData) => ({
      ...prevData,
      readyToShip: status === "readyToShip",
      newArrivals: status === "newArrivals",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const finalData = { ...formData, images };

    try {
      const response = await axios.post("/api/products", finalData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Product added successfully!");

      setFormData({
        title: "",
        description: "",
        price: "",
        color: "",
        brand: "",
        size: [],
        category: "",
        page: "",
        readyToShip: false,
        newArrivals: false,
      });

      setImages([]);
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.error || error.response.statusText}`
        );
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error(`Error: ${error.message || "Something went wrong"}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateDescription = async () => {
    if (!formData.title || !formData.category || !formData.page) {
      return toast.error("Please fill out the Title, Category, and Page fields first.");
    }

    try {
      setGenrating(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Write a short 30-40 word expencive description of ${formData.title}, a ${formData.category} clothing product ${formData.category} from clothing, a stylish and trendy product.`
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const productDesc = data.candidates[0].content.parts[0].text;
      console.log(productDesc);
      animateDescriptionLetterByLetter(productDesc);
    } catch (error) {
      toast.error('Error generating description: ' + error.message);
      console.log(error)
    }
  };

  const animateDescriptionLetterByLetter = (fullDescription) => {
    let currentText = '';
    let letterIndex = 0;

    const interval = setInterval(() => {
      currentText += fullDescription[letterIndex];
      setFormData((prevFormData) => ({
        ...prevFormData,
        description: currentText,
      }));
      letterIndex++;

      if (letterIndex === fullDescription.length) {
        clearInterval(interval);
      }

    }, 50);
    setGenrating(false);

  };



  return (
    <div className="w-full flex items-center  md:my-8 mx-auto justify-center">
      <form onSubmit={handleSubmit} className=" w-full md:w-[90%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4 bg-white shadow-md">
        {/* Title and Price */}
        <div className="flex gap-4 w-full mb-4 flex-col md:flex-row">
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
              className="w-full text-lg bg-white outline-none border border-gray-400 p-3 placeholder:text-gray-500 text-gray-800 rounded-lg shadow focus:ring-2 focus:ring-blue-500"
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
              className="w-full text-lg bg-white outline-none border border-gray-400 p-3 placeholder:text-gray-500 text-gray-800 rounded-lg shadow focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="w-full">
          <label className="w-full mb-2 text-gray-700 block" htmlFor="description">
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              placeholder="Description..."
              value={formData.description}
              onChange={handleChange}
              className="w-full h-52 md:h-44 text-lg bg-white outline-none border border-gray-400 p-3 placeholder:text-gray-500 text-gray-800 rounded-lg shadow focus:ring-2 focus:ring-blue-500"
            />

            <div
              onClick={generateDescription}
              className={`w-[40px] h-[40px] cursor-pointer 
                } rounded-full absolute bottom-4 right-2 text-white font-medium flex items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 justify-center shadow-lg transition-all hover:scale-110 hover:shadow-xl ${genrating ? "" : "hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500"
                }`}
            >

              {genrating ? <Loader /> : (
                <>
                  <Image
                    src="/images/icon.png"
                    alt="icon"
                    width={20}
                    height={20}
                  />
                </>
              )}

            </div>
          </div>
        </div>

        {/* category and Page */}
        <div className="flex gap-4 w-full mb-4 flex-col md:flex-row">

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
              className="w-full text-lg bg-white outline-none border border-gray-400 p-3 placeholder:text-gray-500 text-gray-800 rounded-lg shadow focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Page</option>
              {Object.keys(categoriesMapping).map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}

            </select>
          </div>
          <div className="w-full">
            <label className="w-full mb-2 text-gray-700 block" htmlFor="category">
              Category
            </label>
            <select
              required
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={availableCategories.length === 0}
              className="w-full text-lg bg-white outline-none border border-gray-400 p-3 placeholder:text-gray-500 text-gray-800 rounded-lg shadow focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>


        </div>

        {/* Image Upload */}
        <ImageUploading
          multiple
          value={images.map((img) => ({ data_url: img.defaultImage }))}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageRemove,
            onImageUpdate,
            dragProps,
          }) => (
            <div className="w-full my-8 upload-wrapper">
              <div onClick={onImageUpload} {...dragProps} className="w-[95%] md:w-[60%] m-auto h-[300px] flex justify-center items-center flex-col border-2 border-dotted border-gray-300 cursor-pointer rounded-lg">
                <label className="w-full image-drag h-full flex flex-col items-center justify-center cursor-pointer">
                  <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                  <p className="text-gray-500 hover:text-gray-700">
                    Click here to upload Image
                  </p>
                </label>
              </div>
              {images.length > 0 ? (
                <div className="my-4">
                  <button
                    onClick={onImageRemoveAll}
                    className="bg-red-700 mb-8 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Remove All
                  </button>
                  <div className="image-preview flex gap-6 bg-[#fefefe] border-2 border-gray-100 p-6 rounded-lg justify-center items-center shadow-lg">
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item relative group">
                        <img
                          src={image['data_url']}
                          alt={`Upload ${index}`}
                          className="w-36 h-36 object-cover object-top rounded-lg border-2 border-gray-300 transition transform hover:scale-105 hover:border-gray-500"
                        />
                        <div className="image-item__btn-wrapper absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
                          <button
                            onClick={() => onImageUpdate(index)}
                            className="text-white text-xl mx-2 hover:text-yellow-400"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => onImageRemove(index)}
                            className="text-white text-xl mx-2 hover:text-red-400"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </ImageUploading>

        {/* Category and Brand */}
        <div className="flex gap-4 w-full mb-4 flex-col md:flex-row">

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
              className="w-full text-lg bg-white outline-none border border-gray-400 p-3 placeholder:text-gray-500 text-gray-800 rounded-lg shadow focus:ring-2 focus:ring-blue-500"
            />
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
              className="w-full text-lg bg-white outline-none border border-gray-400 p-3 placeholder:text-gray-500 text-gray-800 rounded-lg shadow focus:ring-2 focus:ring-blue-500"
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
          <label className="w-full mb-4 text-gray-900 font-semibold text-xl leading-tight tracking-wider">
            Size
          </label>
          <div className="flex gap-6 mt-4">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`size-${size}`}
                  value={size}
                  checked={formData.size.includes(size)}
                  onChange={handleSizeChange}
                  className="cursor-pointer w-7 h-7 border-2 border-gray-400 rounded-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 shadow-sm checked:bg-gradient-to-r from-gold to-goldenrod checked:border-transparent focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 transition duration-300 ease-in-out"
                />
                <label
                  htmlFor={`size-${size}`}
                  className="cursor-pointer text-gray-900 font-medium text-lg tracking-wide"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Status */}
        <div className="w-full mt-10">
          <label className="w-full  text-gray-900 font-semibold text-xl leading-tight tracking-wider">
            Product Status
          </label>
          <div className="flex flex-col mt-4 gap-8">
            <div className="flex items-center gap-5">
              <input
                type="radio"
                id="readyToShip"
                name="productStatus"
                value="readyToShip"
                checked={formData.readyToShip}
                onChange={() => handleStatusChange("readyToShip")}
                className="cursor-pointer w-7 h-7 border-2 border-gray-400 rounded-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 shadow-sm checked:bg-gradient-to-r from-gold to-goldenrod checked:border-transparent focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
              <label
                htmlFor="readyToShip"
                className="text-gray-900 cursor-pointer font-medium text-lg tracking-wide"
              >
                READY TO SHIP
              </label>
            </div>
            <div className="flex items-center gap-5">
              <input
                type="radio"
                id="newArrivals"
                name="productStatus"
                value="newArrivals"
                checked={formData.newArrivals}
                onChange={() => handleStatusChange("newArrivals")}
                className="cursor-pointer w-7 h-7 border-2 border-gray-400 rounded-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 shadow-sm checked:bg-gradient-to-r from-gold to-goldenrod checked:border-transparent focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 transition duration-300 ease-in-out"
              />
              <label
                htmlFor="newArrivals"
                className="text-gray-900 cursor-pointer font-medium text-lg tracking-wide"
              >
                NEW ARRIVALS
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="submit"
            className={` text-white flex gap-4 justify-center w-full md:w-auto m-8  md:ml-auto px-6 py-3 rounded-lg shadow-xl hover:opacity-80 transition duration-300 ${isLoading ? 'bg-gray-700' : 'bg-gray-800'
              } text-white`}
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : (
              <>
                Add Product  <FaPlusCircle className="text-2xl" />

              </>
            )}

          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNew;
