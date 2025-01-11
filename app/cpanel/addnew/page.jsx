
"use client";
import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import ImageUploading from 'react-images-uploading';
import { FaTrash, FaEdit, FaPlusCircle } from 'react-icons/fa';
import Loader from "@/app/Components/Loader";
import toast from 'react-hot-toast';

const AddNew = () => {
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
  const maxNumber = 2;
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCvdEBSjT8wGlP9KV-gqD393D7qC4yRlTo"

  const onChange = async (imageList) => {
    const uploadedImages = await Promise.all(imageList.map(async (image) => {
      const formData = new FormData();
      formData.append('file', image.file);
      formData.append('upload_preset', 'Euphoria');

      const response = await fetch('https://api.cloudinary.com/v1_1/dxhwn8am2/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        return {
          defaultImage: data.secure_url,
          hoverImage: data.secure_url,
        };
      } else {
        console.error('Cloudinary upload error:', data);
        alert(`Error: ${data.error?.message || 'Failed to upload image'}`);
        return null;
      }
    }));

    const validImages = uploadedImages.filter(img => img !== null);
    setImages(validImages);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        // const result = await response.json();
        // console.log("Form submitted successfully:", result);

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

        setImages([]); // Clear the images state

      } else {
        toast.error(`Failed to add product: ${response.statusText}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message || 'Something went wrong'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDescription = async () => {
    if (!formData.title && !formData.category && !formData.page) {
      return toast.error("Please fill out the Title, Category and page fields first.");
    }
    try {
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
              className="w-full h-52 md:h-44 text-lg bg-transparent outline-none border border-gray-600 p-2 placeholder:text-gray-500 text-textColor rounded-md"
            />
            <img
              src="/images/genrate.png"
              onClick={generateDescription}
              alt="Generate"
              className="w-[90px] md:w-[120px] absolute bottom-4 right-2 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>

        {/* category and Page */}
        <div className="flex gap-4 w-full mb-4 flex-col md:flex-row">
         
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
        <ImageUploading
          multiple
          value={images.map(img => ({ data_url: img.defaultImage }))}
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
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                  <p className="text-gray-500 hover:text-gray-700">
                    Click here to upload Image
                  </p>
                </label>
              </div>
              {images.length > 0 ? (
                <>
                  <button
                    onClick={onImageRemoveAll}
                    className="bg-red-700 mb-8 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Remove All
                  </button>
                  <div className="image-preview flex gap-6 bg-gray-200 p-6 rounded-lg justify-center items-center shadow-lg">
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
                </>
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
              className="w-full text-lg bg-transparent outline-none border border-gray-600 p-2 placeholder:text-gray-500 text-textColor rounded-md"
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
          <label className="w-full mb-2 text-gray-800 block font-semibold text-lg">Product Status</label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="readyToShip"
                name="productStatus"
                value="readyToShip"
                checked={formData.readyToShip}
                onChange={() => handleStatusChange("readyToShip")}
                className="cursor-pointer"
              />
              <label htmlFor="readyToShip" className="text-gray-800 cursor-pointer font-medium">
                READY TO SHIP
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="newArrivals"
                name="productStatus"
                value="newArrivals"
                checked={formData.newArrivals}
                onChange={() => handleStatusChange("newArrivals")}
                className="cursor-pointer"
              />
              <label htmlFor="newArrivals" className="text-gray-800 cursor-pointer font-medium">
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
