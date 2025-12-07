import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Try DummyJSON first
        const response = await fetch("https://dummyjson.com/products?limit=4");
        if (response.ok) {
          const data = await response.json();
          const productsWithSource = (data.products || []).map((p) => ({
            ...p,
            source: "dummyjson",
          }));
          setProducts(productsWithSource);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback: Use mock data
        setProducts([
          {
            id: 1,
            title: "iPhone 15 Pro",
            price: 999,
            description: "Latest smartphone",
            image:
              "https://dummyjson.com/image/400x300/FF6B6B/ffffff?text=iPhone",
            rating: { rate: 4.8, count: 120 },
            source: "mock",
          },
          {
            id: 2,
            title: "MacBook Air",
            price: 1299,
            description: "Lightweight laptop",
            image:
              "https://dummyjson.com/image/400x300/4ECDC4/ffffff?text=MacBook",
            rating: { rate: 4.7, count: 89 },
            source: "mock",
          },
          {
            id: 3,
            title: "Samsung TV",
            price: 799,
            description: "4K Smart TV",
            image: "https://dummyjson.com/image/400x300/45B7D1/ffffff?text=TV",
            rating: 4.5,
            source: "mock",
          },
          {
            id: 4,
            title: "Nike Shoes",
            price: 129,
            description: "Running shoes",
            image:
              "https://dummyjson.com/image/400x300/96CEB4/ffffff?text=Shoes",
            rating: 4.6,
            source: "mock",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div>
        <div className="p-8 mb-12 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
          <h1 className="mb-4 text-4xl font-bold">Welcome to Storify</h1>
          <p className="mb-6 text-xl ">
            Discover amazing products at unbeatable prices
          </p>
          <button className="px-6 py-3 font-semibold text-blue-600 transition bg-white rounded-lg hover:bg-gray-100">
            Shop Now
          </button>
        </div>
      </div>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="mb-8 text-3xl font-bold text-center">
          Featured Products
        </h2>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={`${product.source || "product"}-${product.id}-${index}`}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="mb-8 text-3xl font-bold text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {["Electronics", "Fashion", "Home", "Beauty"].map((category) => (
            <div
              key={category}
              className="p-6 text-center transition cursor-pointer bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold">{category}</h3>
              <p className="mt-2 text-gray-600">Explore products</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
