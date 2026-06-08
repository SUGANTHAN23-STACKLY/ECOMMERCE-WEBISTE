import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import backpack from "../../assets/images/products/backpack.jpg";
import headphones from "../../assets/images/products/headphones.jpg";
import laptopBag from "../../assets/images/products/laptop-bag.jpg";
import shoes from "../../assets/images/products/shoe.jpg";
import watch from "../../assets/images/products/watch.jpg";
import watch2 from "../../assets/images/products/watch2.jpg";

function Products() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      oldPrice: 129.99,
      rating: 4.5,
      category: "Electronics",
      stock: true,
      image: headphones,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 149.99,
      oldPrice: 199.99,
      rating: 4.8,
      category: "Electronics",
      stock: true,
      image: watch,
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 79.99,
      oldPrice: 109.99,
      rating: 4.4,
      category: "Fashion",
      stock: true,
      image: shoes,
    },
    {
      id: 4,
      name: "Backpack",
      price: 49.99,
      oldPrice: 69.99,
      rating: 4.3,
      category: "Fashion",
      stock: true,
      image: backpack,
    },
    {
      id: 5,
      name: "Laptop Bag",
      price: 59.99,
      oldPrice: 89.99,
      rating: 4.6,
      category: "Fashion",
      stock: true,
      image: laptopBag,
    },
    {
      id: 6,
      name: "Premium Smart Watch",
      price: 189.99,
      oldPrice: 249.99,
      rating: 4.9,
      category: "Electronics",
      stock: true,
      image: watch2,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const addToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(new Event("storage"));

    alert("Product added to cart");
  };
  const buyNow = (product) => {
  localStorage.setItem(
    "buyNowProduct",
    JSON.stringify({
      ...product,
      quantity: 1,
    })
  );

  navigate("/checkout");
};
  const addToWishlist = (product) => {
    const wishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (!exists) {
      wishlist.push(product);

      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
      );

      alert("Added to Wishlist");
    } else {
      alert("Already in Wishlist");
    }
  };

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    }
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10 px-5">
        <div className="max-w-7xl mx-auto">

          {/* Page Title */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              Our Products
            </h1>

            <p className="text-gray-600 mt-3">
              Explore our latest collection of premium products
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none"
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </Link>

                <div className="p-5">

                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                  <h2 className="text-xl font-bold mt-3">
                    {product.name}
                  </h2>

                  <p className="text-yellow-500 mt-2">
                    ⭐ {product.rating}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price}
                    </span>

                    <span className="text-gray-400 line-through">
                      ${product.oldPrice}
                    </span>
                  </div>

                  <p className="text-green-600 font-medium mt-2">
                    ✓ In Stock
                  </p>

                  <div className="mt-5 flex flex-col gap-3">

                    <button
                      onClick={() =>
                        addToCart(product)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={() =>
                        buyNow(product)
                      }
                      className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={() =>
                        addToWishlist(product)
                      }
                      className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white py-3 rounded-xl transition"
                    >
                      ❤️ Add To Wishlist
                    </button>

                    <Link
                      to={`/product/${product.id}`}
                      className="text-center border border-gray-300 hover:bg-gray-100 py-3 rounded-xl transition"
                    >
                      View Details
                    </Link>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-500">
                No Products Found
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Products;