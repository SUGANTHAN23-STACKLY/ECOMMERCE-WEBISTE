import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] =
    useState(0);

  const [mobileMenuOpen, setMobileMenuOpen] =
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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div
        className="
          max-w-7xl
          mx-auto
          px-3 sm:px-4 md:px-6 lg:px-8
          py-3 md:py-4
        "
      >
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/home"
            className="
              text-lg
              sm:text-xl
              md:text-2xl
              lg:text-3xl
              font-bold
              text-blue-600
              hover:text-blue-700
              transition
            "
          >
            Ecommerce Platform
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            
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
                <span
                  className="
                    absolute
                    -top-2
                    -right-4
                    bg-pink-500
                    text-white
                    text-xs
                    px-2
                    py-0.5
                    rounded-full
                  "
                >
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
                <span
                  className="
                    absolute
                    -top-2
                    -right-4
                    bg-blue-600
                    text-white
                    text-xs
                    px-2
                    py-0.5
                    rounded-full
                  "
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="
                bg-red-500
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-red-600
                transition
              "
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
            className="
              md:hidden
              text-gray-700
              hover:text-blue-600
            "
          >
            {mobileMenuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="
              md:hidden
              mt-4
              border-t
              pt-4
              flex
              flex-col
              gap-4
            "
          >
            <Link
              to="/home"
              onClick={closeMobileMenu}
              className="font-medium"
            >
              🏠 Home
            </Link>

            <Link
              to="/products"
              onClick={closeMobileMenu}
              className="font-medium"
            >
              📦 Products
            </Link>

            <Link
              to="/wishlist"
              onClick={closeMobileMenu}
              className="
                flex
                items-center
                justify-between
                font-medium
              "
            >
              <span>
                ❤️ Wishlist
              </span>

              {wishlistCount > 0 && (
                <span
                  className="
                    bg-pink-500
                    text-white
                    text-xs
                    px-2
                    py-1
                    rounded-full
                  "
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="
                flex
                items-center
                justify-between
                font-medium
              "
            >
              <span>
                🛒 Cart
              </span>

              {cartCount > 0 && (
                <span
                  className="
                    bg-blue-600
                    text-white
                    text-xs
                    px-2
                    py-1
                    rounded-full
                  "
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="
                bg-red-500
                text-white
                py-2
                rounded-lg
                hover:bg-red-600
                transition
              "
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