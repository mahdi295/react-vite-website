import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("storify-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState(null);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("storify-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id && item.source === product.source
      );

      if (exists) {
        showNotification(`Updated ${product.title} quantity!`, "info");
        return prev.map((item) =>
          item.id === product.id && item.source === product.source
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        showNotification(`Added ${product.title} to cart!`, "success");
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            // Get image from the correct property
            image:
              product.image ||
              product.thumbnail ||
              "https://via.placeholder.com/150",
            quantity: quantity,
            source: product.source || "unknown",
          },
        ];
      }
    });
  };

  const removeFromCart = (id, source) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.source === source))
    );
    showNotification("Item removed from cart!", "warning");
  };

  const updateQuantity = (id, source, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, source);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.source === source
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        notification,
        showNotification,
      }}
    >
      {children}

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "warning"
              ? "bg-yellow-500"
              : notification.type === "info"
              ? "bg-blue-500"
              : "bg-gray-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
