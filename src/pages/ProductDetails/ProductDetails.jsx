import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SuggestedProducts from "../../components/SuggestedProducts/SuggestedProducts";

import backpack from "../../assets/images/products/backpack.jpg";
import headphones from "../../assets/images/products/headphones.jpg";
import laptopBag from "../../assets/images/products/laptop-bag.jpg";
import shoes from "../../assets/images/products/shoe.jpg";
import watch from "../../assets/images/products/watch.jpg";
import watch2 from "../../assets/images/products/watch2.jpg";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 99.99,
      oldPrice: 129.99,
      rating: 4.5,
      stock: true,
      image: headphones,
      description:
        "Premium wireless headphones with crystal-clear audio and long battery life.",
      specifications: [
        "Bluetooth 5.0",
        "30 Hours Battery",
        "Noise Cancellation",
        "Fast Charging",
      ],
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Wearables",
      price: 149.99,
      oldPrice: 199.99,
      rating: 4.8,
      stock: true,
      image: watch,
      description:
        "Advanced smartwatch with fitness tracking and health monitoring.",
      specifications: [
        "Heart Rate Monitor",
        "GPS Tracking",
        "Water Resistant",
        "Sleep Tracking",
      ],
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Footwear",
      price: 79.99,
      oldPrice: 99.99,
      rating: 4.4,
      stock: true,
      image: shoes,
      description:
        "Comfortable running shoes designed for daily workouts.",
      specifications: [
        "Breathable Material",
        "Lightweight",
        "Shock Absorption",
        "Flexible Sole",
      ],
    },
    {
      id: 4,
      name: "Backpack",
      category: "Accessories",
      price: 49.99,
      oldPrice: 69.99,
      rating: 4.3,
      stock: true,
      image: backpack,
      description:
        "Stylish backpack perfect for travel and everyday use.",
      specifications: [
        "Water Resistant",
        "Laptop Compartment",
        "20L Capacity",
        "Durable Material",
      ],
    },
    {
      id: 5,
      name: "Laptop Bag",
      category: "Accessories",
      price: 59.99,
      oldPrice: 79.99,
      rating: 4.6,
      stock: true,
      image: laptopBag,
      description:
        "Premium laptop bag with excellent protection and storage.",
      specifications: [
        "15.6 Inch Laptop Support",
        "Shock Protection",
        "Multiple Pockets",
        "Water Resistant",
      ],
    },
    {
      id: 6,
      name: "Premium Smart Watch",
      category: "Wearables",
      price: 189.99,
      oldPrice: 249.99,
      rating: 4.9,
      stock: true,
      image: watch2,
      description:
        "Luxury smartwatch with advanced health features.",
      specifications: [
        "AMOLED Display",
        "Fast Charging",
        "Fitness Tracking",
        "Premium Build",
      ],
    },
  ];

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            Product Not Found
          </h1>
        </div>
      </>
    );
  }

  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(new Event("storage"));

    alert("Product added to cart");
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  const addToWishlist = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) ||
      [];

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

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10 px-5">
        <div className="max-w-7xl mx-auto">

          {/* Back Button Only */}
          <div className="mb-6">
            <Link
              to="/products"
              className="text-blue-600 font-semibold hover:underline"
            >
              ← Back to Products
            </Link>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-10">

              {/* Product Images */}
              <div>
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-[500px] object-cover rounded-2xl"
                />

                <div className="flex gap-3 mt-4">
                  {[product.image, product.image, product.image].map(
                    (img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt="thumbnail"
                        onClick={() =>
                          setSelectedImage(img)
                        }
                        className="w-24 h-24 object-cover rounded-xl cursor-pointer border-2 hover:border-blue-500"
                      />
                    )
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>

                <h1 className="text-4xl font-bold mt-4 mb-3">
                  {product.name}
                </h1>

                <p className="text-yellow-500 text-xl mb-3">
                  ⭐ {product.rating}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-green-600">
                    ${product.price}
                  </span>

                  <span className="text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                </div>

                <p className="mb-4">
                  {product.stock ? (
                    <span className="text-green-600 font-semibold">
                      ✓ In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      ✗ Out of Stock
                    </span>
                  )}
                </p>

                <p className="text-gray-600 leading-7 mb-6">
                  {product.description}
                </p>

                <h2 className="text-2xl font-semibold mb-3">
                  Specifications
                </h2>

                <ul className="space-y-2 mb-8">
                  {product.specifications.map(
                    (spec, index) => (
                      <li
                        key={index}
                        className="text-gray-700"
                      >
                        ✓ {spec}
                      </li>
                    )
                  )}
                </ul>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-semibold">
                    Quantity:
                  </span>

                  <button
                    onClick={() =>
                      quantity > 1 &&
                      setQuantity(quantity - 1)
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={addToCart}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={buyNow}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={addToWishlist}
                    className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-3 rounded-xl transition"
                  >
                    ❤️ Add To Wishlist
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Suggested Products */}
          <div className="mt-12">
            <SuggestedProducts
              products={products}
              currentId={Number(id)}
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default ProductDetails;