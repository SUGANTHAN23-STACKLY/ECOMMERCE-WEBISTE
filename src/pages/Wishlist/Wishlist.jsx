import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(items);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10 px-5">
        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">
              My Wishlist
            </h1>

            <Link
              to="/products"
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>

          {wishlist.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl text-center shadow">
              <h2 className="text-2xl font-semibold">
                Wishlist is Empty
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-60 object-cover"
                  />

                  <div className="p-5">
                    <h2 className="text-xl font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-green-600 font-bold mt-2">
                      ${item.price}
                    </p>

                    <button
                      onClick={() =>
                        removeFromWishlist(item.id)
                      }
                      className="w-full mt-4 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Wishlist;