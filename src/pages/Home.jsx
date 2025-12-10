import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  FaArrowRight,
  FaShoppingBag,
  FaTshirt,
  FaHome,
  FaGem,
  FaCheck,
  FaTag,
} from "react-icons/fa";
import { MdLocalShipping, MdPayment } from "react-icons/md";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // API configuration
  const API_URL = "https://dummyjson.com/products?limit=8";
  const CACHE_KEY = "cached_products";
  const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const isExpired = Date.now() - timestamp > CACHE_TIME;

          if (!isExpired) {
            setProducts(data);
            setLoading(false);
            return;
          }
        }

        // Fetch from API
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const productsWithSource = (data.products || []).map((p) => ({
          ...p,
          source: "api",
        }));

        // Cache the data
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: productsWithSource,
            timestamp: Date.now(),
          })
        );

        setProducts(productsWithSource);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Couldn't load products. Showing sample products instead.");

        // Fallback to mock data
        const mockProducts = [
          {
            id: 1,
            title: "iPhone 15 Pro",
            price: 999,
            description: "Latest smartphone with advanced camera",
            image:
              "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop",
            rating: { rate: 4.8, count: 120 },
            source: "mock",
          },
          {
            id: 2,
            title: "MacBook Air",
            price: 1299,
            description: "Lightweight and powerful laptop",
            image:
              "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
            rating: { rate: 4.7, count: 89 },
            source: "mock",
          },
          {
            id: 3,
            title: "Samsung TV",
            price: 799,
            description: "4K Smart TV with HDR",
            image:
              "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
            rating: 4.5,
            source: "mock",
          },
          {
            id: 4,
            title: "Nike Shoes",
            price: 129,
            description: "Comfortable running shoes",
            image:
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
            rating: 4.6,
            source: "mock",
          },
          {
            id: 5,
            title: "Wireless Headphones",
            price: 199,
            description: "Noise cancelling bluetooth headphones",
            image:
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
            rating: 4.4,
            source: "mock",
          },
          {
            id: 6,
            title: "Smart Watch",
            price: 299,
            description: "Fitness tracker with notifications",
            image:
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
            rating: 4.3,
            source: "mock",
          },
          {
            id: 7,
            title: "Coffee Maker",
            price: 89,
            description: "Automatic espresso machine",
            image:
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
            rating: 4.2,
            source: "mock",
          },
          {
            id: 8,
            title: "Backpack",
            price: 79,
            description: "Waterproof laptop backpack",
            image:
              "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
            rating: 4.7,
            source: "mock",
          },
        ];

        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = [
    {
      name: "Electronics",
      icon: <FaShoppingBag className="text-2xl" />,
      color: "from-blue-500 to-blue-600",
      count: 42,
    },
    {
      name: "Fashion",
      icon: <FaTshirt className="text-2xl" />,
      color: "from-purple-500 to-purple-600",
      count: 36,
    },
    {
      name: "Home",
      icon: <FaHome className="text-2xl" />,
      color: "from-green-500 to-green-600",
      count: 28,
    },
    {
      name: "Beauty",
      icon: <FaGem className="text-2xl" />,
      color: "from-pink-500 to-pink-600",
      count: 19,
    },
  ];

  const features = [
    { icon: <MdLocalShipping />, text: "Free Shipping Over $50" },
    { icon: <MdPayment />, text: "Secure Payment" },
    { icon: <FaCheck />, text: "30-Day Returns" },
    { icon: <FaTag />, text: "Best Price Guarantee" },
  ];

  const handleShopNow = () => {
    navigate("/products");
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.toLowerCase()}`);
  };

  return (
    <div className="animate-fadeIn">
      {/* Professional Hero Banner */}
      <div className="relative mb-12 overflow-hidden rounded-2xl md:mb-16">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/60"></div>
        </div>

        {/* Content */}
        <div className="relative px-4 py-12 md:px-8 md:py-20 lg:px-12 lg:py-24">
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
              {/* Left side: Text content */}
              <div className="text-white lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium bg-blue-600 rounded-full">
                  <span className="animate-pulse">🔥</span>
                  <span>Limited Time Offer</span>
                </div>

                <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  Summer <span className="text-blue-400">Sale</span> Is Here!
                </h1>

                <p className="mb-6 text-xl font-medium md:text-2xl lg:text-3xl opacity-90">
                  Up to{" "}
                  <span className="font-bold text-yellow-300">50% OFF</span> on
                  Premium Products
                </p>

                <p className="max-w-2xl mb-8 text-lg opacity-90">
                  Discover amazing products at unbeatable prices. Quality
                  products with fast delivery and excellent customer support.
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8 md:grid-cols-4 md:gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-lg bg-white/10 backdrop-blur-sm"
                    >
                      <div className="text-blue-300">{feature.icon}</div>
                      <span className="text-sm font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={handleShopNow}
                    className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 hover:shadow-xl"
                    aria-label="Shop Now"
                  >
                    Shop Now
                    <FaArrowRight />
                  </button>
                  <button
                    onClick={() => navigate("/products?category=electronics")}
                    className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-white transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-900 hover:scale-105 active:scale-95"
                    aria-label="View Deals"
                  >
                    View Deals
                    <FaTag />
                  </button>
                </div>

                {/* Countdown Timer (optional) */}
                <div className="max-w-md p-4 mt-8 rounded-lg bg-black/30 backdrop-blur-sm">
                  <p className="mb-2 text-sm opacity-80">Offer ends in:</p>
                  <div className="flex gap-2">
                    {["03", "12", "45", "30"].map((time, index) => (
                      <div key={index} className="text-center">
                        <div className="px-3 py-2 bg-gray-800 rounded-lg">
                          <span className="text-xl font-bold">{time}</span>
                        </div>
                        <span className="block mt-1 text-xs opacity-70">
                          {["Days", "Hours", "Minutes", "Seconds"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side: Promo Product Image */}
              <div className="relative mt-8 lg:w-1/2 lg:mt-0">
                <div className="relative max-w-md mx-auto lg:max-w-full">
                  {/* Main promo product */}
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1600003263720-95b45a4035d5?q=80&w=2070&auto=format&fit=crop"
                      alt="Latest iPhone Promotion"
                      className="w-full h-auto transition-transform duration-500 transform shadow-2xl rounded-2xl -rotate-3 hover:rotate-0"
                    />

                    {/* Price tag */}
                    <div className="absolute px-6 py-3 text-white rounded-full shadow-lg -top-4 -right-4 bg-gradient-to-r from-red-600 to-red-700 animate-bounce">
                      <div className="text-center">
                        <div className="text-2xl font-bold">$999</div>
                        <div className="text-xs line-through opacity-80">
                          $1299
                        </div>
                      </div>
                    </div>

                    {/* Floating badges */}
                    <div className="absolute px-4 py-2 text-gray-800 bg-white rounded-lg shadow-lg -bottom-4 -left-4">
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-green-500" />
                        <span className="font-semibold">Best Seller</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating small product cards */}
                  <div className="absolute hidden -bottom-6 -right-6 md:block">
                    <div className="p-3 transform bg-white shadow-xl rounded-xl rotate-6">
                      <img
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                        alt="Wireless Headphones"
                        className="object-cover w-20 h-20 rounded-lg"
                      />
                      <div className="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded -top-2 -left-2">
                        -30%
                      </div>
                    </div>
                  </div>

                  <div className="absolute hidden -top-6 -left-6 md:block">
                    <div className="p-3 transform bg-white shadow-xl rounded-xl -rotate-6">
                      <img
                        src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop"
                        alt="Smart Watch"
                        className="object-cover w-20 h-20 rounded-lg"
                      />
                      <div className="absolute px-2 py-1 text-xs text-white bg-green-500 rounded -top-2 -right-2">
                        NEW
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="container p-4 mx-auto mb-6 text-yellow-800 bg-yellow-100 border-l-4 border-yellow-500 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Featured Products */}
      <section className="mb-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Featured Products
              </h2>
              <p className="mt-2 text-gray-600">
                Handpicked selections just for you
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1 font-medium text-blue-600 transition hover:text-blue-800"
            >
              View All
              <FaArrowRight className="text-sm" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg animate-pulse">
                  <div className="w-full h-48 mb-4 bg-gray-300 rounded"></div>
                  <div className="h-4 mb-2 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-4 mb-4 bg-gray-300 rounded"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-4xl">😞</div>
              <h3 className="mb-2 text-xl font-semibold">No Products Found</h3>
              <p className="text-gray-600">Check back soon for new products!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.slice(0, 4).map((product) => (
                  <ProductCard
                    key={`${product.source || "product"}-${product.id}`}
                    product={product}
                  />
                ))}
              </div>

              {/* Show view all products link if more than 4 */}
                <div className="mt-8 text-center">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 active:scale-95"
                  >
                    View All Products
                    <FaArrowRight />
                  </Link>
                </div>
              
            </>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <div className="container mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center md:text-3xl">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className="relative p-6 text-left transition-all duration-300 bg-white border rounded-xl hover:shadow-xl hover:-translate-y-1 active:scale-95 group"
                aria-label={`Browse ${category.name} products`}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${category.color} rounded-t-xl`}
                ></div>
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${category.color} text-white`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-blue-600">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {category.count} products
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Explore our curated collection
                </div>
                <div className="flex items-center gap-1 mt-4 text-sm text-blue-600 transition-opacity opacity-0 group-hover:opacity-100">
                  Browse
                  <FaArrowRight className="text-xs" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 mb-12 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Ready to Start Shopping?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-600">
            Join thousands of satisfied customers. Free shipping on orders over
            $50.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 active:scale-95"
            >
              Browse Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
