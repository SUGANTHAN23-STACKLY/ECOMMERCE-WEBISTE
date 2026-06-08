import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(cart);
  }, []);

  const productTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryCharges =
    cartItems.length > 0 ? 10 : 0;

  const finalTotal =
    productTotal + deliveryCharges;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Full Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone Number is required";
    } else if (
      !/^[0-9]{10}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Enter valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode =
        "Postal Code is required";
    } else if (
      !/^[0-9]{6}$/.test(
        formData.postalCode
      )
    ) {
      newErrors.postalCode =
        "Enter valid Postal Code";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Order Placed Successfully!");

      localStorage.removeItem("cart");

      window.dispatchEvent(
        new Event("storage")
      );

      navigate("/products");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-3 sm:px-5">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Checkout
            </h1>

            <Link
              to="/cart"
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Back To Cart
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Shipping Address */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-6">
                Shipping Address
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address Line"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.state}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition duration-300"
                >
                  Place Order
                </button>

              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow">
              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              {cartItems.length === 0 ? (
                <p className="text-gray-500">
                  No products in cart
                </p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-4"
                    >
                      <div>
                        <p className="font-medium">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}

                  <hr className="my-4" />

                  <div className="flex justify-between mb-3">
                    <span>
                      Product Total
                    </span>

                    <span>
                      $
                      {productTotal.toFixed(
                        2
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between mb-3">
                    <span>
                      Delivery Charges
                    </span>

                    <span>
                      $
                      {deliveryCharges.toFixed(
                        2
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-xl font-bold border-t pt-4">
                    <span>
                      Final Total
                    </span>

                    <span className="text-green-600">
                      $
                      {finalTotal.toFixed(
                        2
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;