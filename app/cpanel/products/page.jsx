import Link from 'next/link';
import { FiMoreHorizontal } from 'react-icons/fi';

const Products = () => {
  const products = [
    {
      id: 1,
      title: "Rann Handcrafted Bandhani Silk Lehenga",
      price: "155000",
      defaultImage: "/images/product1.webp",
      hoverImage: "/images/product1-hover.webp",
      meta: {
        readyToShip: true,
        isNewArrival: false,
      },
      color: "Red",
      brand: "Manish Malhotra",
      size: ["M", "L", "XL"],
      category: "Lehenga",
    },
    {
      id: 2,
      title: "Avis Printed Silk Kaftan - Blue",
      price: "27000",
      defaultImage: "/images/product2.webp",
      hoverImage: "/images/product2-hover.webp",
      meta: {
        readyToShip: true,
        isNewArrival: false,
      },
      color: "Blue",
      brand: "FabIndia",
      size: ["Free Size"],
      category: "Kaftan",
    },
    {
      id: 3,
      title: "Suramya Embroidered Zardozi Lehenga",
      price: "610000",
      defaultImage: "/images/product3.webp",
      hoverImage: "/images/product3-hover.webp",
      meta: {
        readyToShip: false,
        isNewArrival: true,
      },
      color: "Gold",
      brand: "Ritu Kumar",
      size: ["M", "L"],
      category: "Lehenga",
    },
    {
      id: 4,
      title: "Ranjika Handwoven Maheshwari Suit",
      price: "46000",
      defaultImage: "/images/product4.webp",
      hoverImage: "/images/product4-hover.webp",
      meta: {
        readyToShip: true,
        isNewArrival: false,
      },
      color: "Pink",
      brand: "Biba",
      size: ["S", "M", "L"],
      category: "Suit",
    },
    {
      id: 5,
      title: "Ananya Designer Saree",
      price: "80000",
      defaultImage: "/images/product1.webp",
      hoverImage: "/images/product1-hover.webp",
      meta: {
        readyToShip: false,
        isNewArrival: true,
      },
      color: "Beige",
      brand: "Global Desi",
      size: ["Free Size"],
      category: "Saree",
    },
    {
      id: 6,
      title: "Tarun Textured Linen Kurta",
      price: "34000",
      defaultImage: "/images/product2.webp",
      hoverImage: "/images/product2-hover.webp",
      meta: {
        readyToShip: true,
        isNewArrival: false,
      },
      color: "White",
      brand: "Local Artisans",
      size: ["M", "L", "XL"],
      category: "Kurta",
    },
    {
      id: 7,
      title: "Vrinda Zari Silk Lehenga",
      price: "525000",
      defaultImage: "/images/product3.webp",
      hoverImage: "/images/product3-hover.webp",
      meta: {
        readyToShip: false,
        isNewArrival: true,
      },
      color: "Purple",
      brand: "Anita Dongre",
      size: ["M", "L"],
      category: "Lehenga",
    },
    {
      id: 8,
      title: "Kamya Embroidered Chikankari Suit",
      price: "39000",
      defaultImage: "/images/product4.webp",
      hoverImage: "/images/product4-hover.webp",
      meta: {
        readyToShip: true,
        isNewArrival: false,
      },
      color: "Yellow",
      brand: "W for Women",
      size: ["S", "M", "L"],
      category: "Suit",
    },
  ];


  return (
    <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-gray-900">All Products</h1>
        <Link href="/cpanel/addnew" className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl hover:opacity-80 transition duration-300">
          + Add New Product
        </Link>
      </div>

      {/* Breadcrumb */}
      <p className="text-lg text-gray-700 mb-8">
        Home &gt; <span className="text-black">All Products</span>
      </p>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 text-left">
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Brand</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Size</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="px-6 py-4 flex items-center space-x-4">
                  <img
                    src={product.defaultImage}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                  />
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">{product.title}</h2>
                  </div>
                </td>
                <td className="px-6 py-4 text-lg font-bold text-gray-700">₹{parseFloat(product.price).toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-600">{product.brand}</td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4">
                  {product.size.map((size) => (
                    <span
                      key={size}
                      className="text-xs bg-gray-300 text-gray-600 px-2 py-1 rounded-full mr-2"
                    >
                      {size}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {product.meta.readyToShip ? (
                    <span className="text-green-700">Ready to Ship</span>
                  ) : (
                    <span className="text-red-700">Out of Stock</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiMoreHorizontal className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-600">
        © 2023 - pulistron Dashboard | About | Careers | Policy | Contact
      </footer>
    </div>
  );
};

export default Products;
