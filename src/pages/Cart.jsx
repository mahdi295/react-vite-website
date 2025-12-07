import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shipping = cartItems.length > 0 ? 9.99 : 0;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (!user) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold">Please login to view cart</h2>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold">Your cart is empty</h2>
        <p className="mb-6 text-gray-600">Add some products to get started!</p>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={`${item.source || "product"}-${item.id}`}
              className="p-4 mb-4 bg-white shadow-md rounded-xl"
            >
              <div className="flex items-center">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.title}
                  className="object-cover w-24 h-24 rounded-lg"
                />
                <div className="flex-grow ml-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">
                    ${item.price?.toFixed(2) || "0.00"} each
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.source,
                            item.quantity - 1
                          )
                        }
                        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.source,
                            item.quantity + 1
                          )
                        }
                        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold">
                        ${((item.price || 0) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id, item.source)}
                        className="mt-1 text-sm text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky p-6 bg-white shadow-md rounded-xl top-4">
            <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

            <div className="mb-6 space-y-3">
              <div className="flex justify-between">
                <span>
                  Subtotal (
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  items)
                </span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-4 mb-4 text-lg font-semibold text-white transition bg-green-500 hover:bg-green-600 rounded-xl"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/products")}
              className="w-full py-4 text-lg font-semibold text-blue-500 transition border-2 border-blue-500 hover:bg-blue-50 rounded-xl"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
