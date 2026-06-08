import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import headphones from "../../assets/images/products/headphones.jpg";
import watch from "../../assets/images/products/watch.jpg";
import shoes from "../../assets/images/products/shoe.jpg";

function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      image: headphones,
      price: "$99.99",
    },
    {
      id: 2,
      name: "Smart Watch",
      image: watch,
      price: "$149.99",
    },
    {
      id: 3,
      name: "Running Shoes",
      image: shoes,
      price: "$79.99",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-28">
          <div className="max-w-7xl mx-auto px-5 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Welcome to Ecommerce platform
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-8">
              Discover premium products at unbeatable prices.
            </p>

            <Link
              to="/products"
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto py-16 px-5">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-2xl font-bold">
                    {product.name}
                  </h3>

                  <p className="text-green-600 text-xl font-bold mt-2">
                    {product.price}
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="block text-center mt-5 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-4xl font-bold text-center mb-12">
              Shop By Category
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-100 rounded-3xl p-10 text-center hover:scale-105 transition">
                <h3 className="text-2xl font-bold">
                  Electronics
                </h3>

                <p className="mt-3 text-gray-600">
                  Smart gadgets and accessories
                </p>
              </div>

              <div className="bg-green-100 rounded-3xl p-10 text-center hover:scale-105 transition">
                <h3 className="text-2xl font-bold">
                  Fashion
                </h3>

                <p className="mt-3 text-gray-600">
                  Trending styles and essentials
                </p>
              </div>

              <div className="bg-purple-100 rounded-3xl p-10 text-center hover:scale-105 transition">
                <h3 className="text-2xl font-bold">
                  Accessories
                </h3>

                <p className="mt-3 text-gray-600">
                  Bags, watches and more
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h2 className="text-5xl font-bold">
                  10K+
                </h2>
                <p className="mt-2">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">
                  500+
                </h2>
                <p className="mt-2">
                  Products
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">
                  50+
                </h2>
                <p className="mt-2">
                  Brands
                </p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">
                  24/7
                </h2>
                <p className="mt-2">
                  Support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-4xl font-bold text-center mb-12">
              Why Choose Us?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="shadow-lg rounded-2xl p-6 text-center">
                <h3 className="text-2xl font-semibold mb-3">
                  Fast Delivery
                </h3>

                <p className="text-gray-600">
                  Quick delivery right to your doorstep.
                </p>
              </div>

              <div className="shadow-lg rounded-2xl p-6 text-center">
                <h3 className="text-2xl font-semibold mb-3">
                  Best Prices
                </h3>

                <p className="text-gray-600">
                  Premium quality products at affordable prices.
                </p>
              </div>

              <div className="shadow-lg rounded-2xl p-6 text-center">
                <h3 className="text-2xl font-semibold mb-3">
                  Secure Payments
                </h3>

                <p className="text-gray-600">
                  Safe and trusted payment methods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Special Offer */}
        <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
          <div className="max-w-5xl mx-auto px-5 text-center">
            <h2 className="text-5xl font-bold mb-5">
              Summer Sale 50% OFF
            </h2>

            <p className="text-xl mb-8">
              Limited time offer on selected products.
            </p>

            <Link
              to="/products"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Shop Deals
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-4xl font-bold text-center mb-12">
              What Customers Say
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="shadow-lg rounded-2xl p-6">
                <p className="text-gray-700">
                  "Amazing products and super fast delivery."
                </p>

                <h4 className="font-bold mt-4">
                  - John
                </h4>
              </div>

              <div className="shadow-lg rounded-2xl p-6">
                <p className="text-gray-700">
                  "Best online shopping experience I've had."
                </p>

                <h4 className="font-bold mt-4">
                  - Sarah
                </h4>
              </div>

              <div className="shadow-lg rounded-2xl p-6">
                <p className="text-gray-700">
                  "Excellent customer service and product quality."
                </p>

                <h4 className="font-bold mt-4">
                  - Michael
                </h4>
              </div>
            </div>
          </div>
        </section>
        {/* Newsletter Section */}
<section className="bg-blue-600 text-white py-16">
  <div className="max-w-4xl mx-auto px-5 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Subscribe To Our Newsletter
    </h2>

    <p className="mb-8 text-lg">
      Get the latest offers and updates directly in your inbox.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-5 py-3 rounded-xl text-black w-full sm:w-96"
      />

      <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
        Subscribe
      </button>
    </div>
  </div>
</section>
<footer className="bg-slate-900 text-white py-10">
  <div className="max-w-7xl mx-auto px-5">

    <div className="grid md:grid-cols-3 gap-8">

      <div>
        <h2 className="text-2xl font-bold mb-3">
          Ecommerce Platform
        </h2>

        <p className="text-gray-400">
          Your one-stop destination for quality
          products and amazing deals.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">
          Quick Links
        </h3>

        <ul className="space-y-2">
          <li>
            <Link
              to="/home"
              className="hover:text-blue-400"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              className="hover:text-blue-400"
            >
              Products
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className="hover:text-blue-400"
            >
              Cart
            </Link>
          </li>

          <li>
            <Link
              to="/wishlist"
              className="hover:text-blue-400"
            >
              Wishlist
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">
          Contact
        </h3>

        <p className="text-gray-400">
          support@ecommerce.com
        </p>

        <p className="text-gray-400">
          +91 9876543210
        </p>
      </div>

    </div>

    <hr className="my-6 border-gray-700" />

    <p className="text-center text-gray-400">
      © 2025 Ecommerce Platform.
      All Rights Reserved.
    </p>

  </div>
</footer>

      </div>
    </>
  );
}

export default Home;