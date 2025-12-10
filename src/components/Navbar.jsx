import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    ...(user
      ? [
          { path: "/dashboard", label: "Dashboard" },
          { path: "/cart", label: "Cart", icon: <FaShoppingCart /> },
        ]
      : []),
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 text-white shadow-lg bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold md:text-2xl">
            Storify
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2 py-1 transition-all duration-200 hover:text-blue-200 ${
                  isActive(link.path)
                    ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                  {link.path === "/cart" && itemCount > 0 && (
                    <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                      {itemCount}
                    </span>
                  )}
                </div>
              </Link>
            ))}

            {user ? (
              <>
                <div className="flex items-center gap-4 pl-4 border-l border-white/30">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm transition bg-red-500 rounded hover:bg-red-600 active:scale-95"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                  <div className="flex items-center gap-2 text-sm">
                    <FaUser className="text-blue-200" />
                    <span className="max-w-[120px] truncate">
                      {user.displayName || user.email?.split("@")[0] || "User"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-2 py-1 transition-all duration-200 hover:text-blue-200 ${
                    isActive("/login")
                      ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:rounded"
                      : ""
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-blue-600 transition bg-white rounded hover:bg-gray-100 active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            {user && (
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-xl" />
                {itemCount > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="py-4 border-t border-white/20">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`py-2 px-4 rounded transition-all duration-200 ${
                      isActive(link.path)
                        ? "bg-white/10 border-l-4 border-white"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {link.icon}
                        {link.label}
                      </div>
                      {link.path === "/cart" && itemCount > 0 && (
                        <span className="px-2 py-1 text-xs bg-red-500 rounded-full">
                          {itemCount}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}

                {user ? (
                  <>
                    <div className="px-4 py-3 mt-4 rounded bg-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <FaUser />
                        <span className="truncate">
                          {user.displayName ||
                            user.email?.split("@")[0] ||
                            "User"}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full py-2 text-center text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className={`py-2 px-4 rounded transition-all duration-200 ${
                        isActive("/login")
                          ? "bg-white/10 border-l-4 border-white"
                          : "hover:bg-white/5"
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2 text-center text-blue-600 bg-white rounded hover:bg-gray-100"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
