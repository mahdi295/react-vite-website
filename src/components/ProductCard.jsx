import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart, showNotification } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const rating =
    typeof product.rating === "object"
      ? product.rating?.rate || 4.5
      : product.rating || 4.5;

  const handleAddToCart = () => {
    if (!user) {
      showNotification("Please login to add items to cart", "warning");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    // Pass product with image property
    addToCart(
      {
        ...product,
        image: product.image || product.thumbnail, // Make sure image is included
        source: product.source || "dummyjson", // Add source for identification
      },
      1
    );
  };

  return (
    <div className="overflow-hidden transition duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
      <div className="h-48 overflow-hidden">
        <img
          src={
            product.image ||
            product.thumbnail ||
            "https://via.placeholder.com/300"
          }
          alt={product.title}
          className="object-cover w-full h-full transition duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold truncate">
          {product.title || "Product Title"}
        </h3>
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {product.description || "No description available"}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ${product.price || "0.00"}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-gray-600">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex mt-4 space-x-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 py-2 text-center text-white transition bg-blue-500 rounded hover:bg-blue-600"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 text-white transition bg-green-500 rounded hover:bg-green-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
