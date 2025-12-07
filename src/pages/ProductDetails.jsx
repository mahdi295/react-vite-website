import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function ProductDetails() {
  const { addToCart, showNotification } = useCart(); // Add showNotification here
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    try {
      setLoading(true);
      // Try DummyJSON first
      const dummyRes = await fetch(`https://dummyjson.com/products/${id}`);
      if (dummyRes.ok) {
        const data = await dummyRes.json();
        setProduct({ ...data, source: "dummyjson" });
      } else {
        // Try FakeStore
        const fakeRes = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (fakeRes.ok) {
          const data = await fakeRes.json();
          setProduct({ ...data, source: "fakestore" });
        } else {
          throw new Error("Product not found");
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      navigate("/products");
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = () => {
    if (!user) {
      showNotification("Please login to add items to cart", "warning");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    addToCart(
      {
        ...product,
        // Ensure we pass the image correctly
        image: product.image || product.thumbnail,
        source: product.source || "dummyjson",
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Add to cart first, then go to checkout
    addToCart(
      {
        ...product,
        image: product.image || product.thumbnail,
        source: product.source || "dummyjson",
      },
      quantity
    );
    navigate("/checkout");
  };

  if (loading) return <Loading />;
  if (!product) return <div>Product not found</div>;

  const ratingValue =
    typeof product.rating === "object"
      ? product.rating?.rate || 0
      : product.rating || 0;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Product Image */}
        <div className="p-4 bg-white shadow-lg rounded-2xl">
          <img
            src={product.image || product.thumbnail}
            alt={product.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="mb-4 text-4xl font-bold">{product.title}</h1>
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-500">
              {"★".repeat(Math.round(ratingValue))}
              {"☆".repeat(5 - Math.round(ratingValue))}
            </div>
            <span className="ml-2 text-gray-600">{ratingValue.toFixed(1)}</span>
            <span className="mx-2">•</span>
            <span className="text-gray-600 capitalize">{product.category}</span>
          </div>

          <p className="mb-6 text-3xl font-bold text-blue-600">
            ${product.price}
          </p>

          <p className="mb-8 text-gray-700">{product.description}</p>

          {/* Quantity Selector */}
          <div className="mb-8">
            <label className="block mb-2 text-gray-700">Quantity</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex items-center justify-center w-10 h-10 transition bg-gray-200 rounded-full hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex items-center justify-center w-10 h-10 transition bg-gray-200 rounded-full hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 text-lg font-semibold text-white transition bg-blue-500 hover:bg-blue-600 rounded-xl"
            >
              Add to Cart ({quantity})
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-4 text-lg font-semibold text-white transition bg-green-500 hover:bg-green-600 rounded-xl"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
