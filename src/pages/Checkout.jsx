import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully! Thank you for your purchase.");
    clearCart(); // Clear the cart after purchase
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Calculate real totals
  const shipping = cartItems.length > 0 ? 9.99 : 0;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (!user) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold">Please login to checkout</h2>
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
        <p className="mb-6 text-gray-600">Add some products to checkout!</p>
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
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {["Shipping", "Payment", "Review"].map((label, index) => (
          <div key={label} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step > index
                  ? "bg-green-500 text-white"
                  : step === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-2 ${
                step >= index + 1 ? "font-semibold" : "text-gray-500"
              }`}
            >
              {label}
            </span>
            {index < 2 && <div className="w-24 h-1 mx-4 bg-gray-300"></div>}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Shipping */}
        {step === 1 && (
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h2 className="mb-6 text-2xl font-semibold">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h2 className="mb-6 text-2xl font-semibold">Payment Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 font-semibold text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Review Order
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="p-6 bg-white shadow-md rounded-xl">
            <h2 className="mb-6 text-2xl font-semibold">Review Your Order</h2>
            <div className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="mb-2 text-lg font-semibold">Order Items</h3>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between pb-2 border-b"
                    >
                      <span>
                        {item.title} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Shipping Address</h3>
                <p>{formData.name}</p>
                <p>{formData.address}</p>
                <p>
                  {formData.city}, {formData.zip}
                </p>
                <p>{formData.email}</p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Payment Method</h3>
                <p>Card ending in {formData.cardNumber.slice(-4) || "XXXX"}</p>
              </div>

              <div className="pt-6 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 font-semibold text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-3 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
