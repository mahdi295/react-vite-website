import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Add this import

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart(); // Get cart item count
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="text-white shadow-lg bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold">
            Storify
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="transition hover:text-blue-200">
              Home
            </Link>
            <Link to="/products" className="transition hover:text-blue-200">
              Products
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="transition hover:text-blue-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/cart"
                  className="relative transition hover:text-blue-200"
                >
                  Cart
                  {itemCount > 0 && (
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 transition bg-red-500 rounded hover:bg-red-600"
                >
                  Logout
                </button>
                <span className="hidden text-sm md:inline">
                  Hi, {user.displayName || user.email?.split("@")[0] || "User"}
                </span>
              </>
            ) : (
              <>
                <Link to="/login" className="transition hover:text-blue-200">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-blue-600 transition bg-white rounded hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
