import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { getUser } from "../../utils/localStorage";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email =
        "Email Address is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password =
        "Password is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      const user = getUser();

      console.log(
        "Stored User:",
        user
      );

      if (!user) {
        alert(
          "No account found. Please create an account first."
        );

        setLoading(false);
        return;
      }

      const emailMatch =
        user.email
          .trim()
          .toLowerCase() ===
        formData.email
          .trim()
          .toLowerCase();

      const passwordMatch =
        user.password ===
        formData.password;

      if (
        emailMatch &&
        passwordMatch
      ) {
        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        if (rememberMe) {
          localStorage.setItem(
            "rememberUser",
            formData.email
          );
        }

        alert(
          `Welcome ${user.fullName}`
        );

        navigate("/home", {
          replace: true,
        });
      } else {
        alert(
          "Invalid Email or Password"
        );
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
            shopping
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={
                handleChange
              }
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter Password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-4 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={
                  rememberMe
                }
                onChange={() =>
                  setRememberMe(
                    !rememberMe
                  )
                }
              />
              Remember Me
            </label>

            <Link
              to="/signup"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-600 font-semibold ml-1 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          © 2025 Ecommerce Platform
        </div>
      </motion.div>
    </div>
  );
}

export default Login;