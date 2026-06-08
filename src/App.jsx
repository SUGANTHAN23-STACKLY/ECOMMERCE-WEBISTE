import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { lazy, Suspense } from "react";

/* Lazy Loaded Pages */
const Home = lazy(() =>
  import("./pages/Home/Home")
);

const Login = lazy(() =>
  import("./pages/Login/Login")
);

const Signup = lazy(() =>
  import("./pages/Signup/Signup")
);

const Products = lazy(() =>
  import("./pages/Products/Products")
);

const ProductDetails = lazy(() =>
  import(
    "./pages/ProductDetails/ProductDetails"
  )
);

const CartPage = lazy(() =>
  import("./pages/Cart/CartPage")
);

const Wishlist = lazy(() =>
  import("./pages/Wishlist/Wishlist")
);

const Checkout = lazy(() =>
  import("./pages/Checkout/Checkout")
);

/* Loading Screen */
function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <p className="mt-4 text-lg font-semibold text-gray-600">
          Loading...
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>

          {/* Default Route */}
          <Route
            path="/"
            element={
              <Navigate
                to="/home"
                replace
              />
            }
          />

          {/* Home */}
          <Route
            path="/home"
            element={<Home />}
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* Products */}
          <Route
            path="/products"
            element={<Products />}
          />

          {/* Product Details */}
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={<CartPage />}
          />

          {/* Wishlist */}
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <h1 className="text-4xl font-bold">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;