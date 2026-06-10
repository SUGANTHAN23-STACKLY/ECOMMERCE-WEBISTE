import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] =
    useState(0);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const updateCounts = () => {
    try {
      const cart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const wishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );

      const totalCartItems = cart.reduce(
        (sum, item) =>
          sum + (item.quantity || 1),
        0
      );

      setCartCount(totalCartItems);
      setWishlistCount(wishlist.length);
    } catch (error) {
      console.error(
        "Navbar error:",
        error
      );

      setCartCount(0);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener(
      "storage",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCounts
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(
      "isLoggedIn"
    );

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4">

        {/* Top Navbar */}
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link
            to="/home"
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600"
          >
            Ecommerce Platform
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/home"
              className="hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="hover:text-blue-600 font-medium"
            >
              Products
            </Link>

            <Link
              to="/wishlist"
              className="relative hover:text-pink-600 font-medium"
            >
              ❤️ Wishlist

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative hover:text-blue-600 font-medium"
            >
              🛒 Cart

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 border-t pt-4">

            <Link
              to="/home"
              onClick={() =>
                setMenuOpen(false)
              }
              className="font-medium"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() =>
                setMenuOpen(false)
              }
              className="font-medium"
            >
              Products
            </Link>

            <Link
              to="/wishlist"
              onClick={() =>
                setMenuOpen(false)
              }
              className="font-medium"
            >
              ❤️ Wishlist ({wishlistCount})
            </Link>

            <Link
              to="/cart"
              onClick={() =>
                setMenuOpen(false)
              }
              className="font-medium"
            >
              🛒 Cart ({cartCount})
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 rounded-lg"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
