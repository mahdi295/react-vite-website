import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h1 className="text-9xl font-bold text-blue-500">404</h1>
      <h2 className="text-3xl font-bold mt-4 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="space-x-4">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold inline-block"
        >
          Go Home
        </Link>
        <Link
          to="/products"
          className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold inline-block"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
