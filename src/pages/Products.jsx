import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const [dummyRes, fakeRes] = await Promise.all([
        fetch("https://dummyjson.com/products"),
        fetch("https://fakestoreapi.com/products"),
      ]);

      const dummyData = await dummyRes.json();
      const fakeData = await fakeRes.json();

      // Add source property to identify API
      const dummyProducts = dummyData.products.map((p) => ({
        ...p,
        source: "dummyjson",
      }));
      const fakeProducts = fakeData.map((p) => ({ ...p, source: "fakestore" }));

      const combined = [...dummyProducts, ...fakeProducts];
      setProducts(combined);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || product.category.toLowerCase().includes(category);
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    "electronics",
    "fashion",
    "home",
    "beauty",
    "jewelery",
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">All Products</h1>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={`${product.source || "product"}-${product.id}-${index}`}
              product={product}
            />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-xl text-gray-500">
            No products found. Try a different search.
          </p>
        </div>
      )}
    </div>
  );
}
