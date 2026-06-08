import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(cart);
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity }
        : item
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("storage"));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("storage"));
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-3 sm:px-5">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center md:text-left">
              Shopping Cart
            </h1>

            <Link
              to="/products"
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 sm:p-10 text-center shadow">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Your Cart is Empty
              </h2>

              <Link
                to="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow p-4 sm:p-5 flex flex-col lg:flex-row gap-5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-48 lg:w-40 h-56 sm:h-48 lg:h-40 object-cover rounded-xl"
                    />

                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-semibold">
                        {item.name}
                      </h2>

                      <p className="text-green-600 font-bold text-lg sm:text-xl mt-2">
                        ${item.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 sm:gap-3 mt-4 flex-wrap">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                        >
                          -
                        </button>

                        <span className="font-semibold text-lg">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      <p className="mt-4 font-semibold text-base sm:text-lg">
                        Subtotal: $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </p>

                      <button
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="mt-4 w-full sm:w-auto bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-white rounded-2xl shadow p-4 sm:p-6 mt-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                  Cart Summary
                </h2>

                <div className="flex justify-between mb-3">
                  <span>Total Items</span>

                  <span className="font-semibold">
                    {totalItems}
                  </span>
                </div>

                <div className="flex justify-between mb-3">
                  <span>Total Price</span>

                  <span className="font-semibold text-green-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full text-center bg-green-600 text-white py-3 rounded-xl mt-5 hover:bg-green-700 transition duration-300"
                >
                  Proceed To Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;