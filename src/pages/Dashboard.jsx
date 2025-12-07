import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import EditProfile from "../components/EditProfile";

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      {/* User Info Card */}
      <div className="p-6 mb-8 shadow-md bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <div className="flex flex-col mb-6 md:flex-row md:items-center">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 border-4 border-white rounded-full shadow"
            />
          ) : (
            <div className="flex items-center justify-center w-24 h-24 border-4 border-white rounded-full shadow bg-gradient-to-br from-blue-400 to-purple-500">
              <span className="text-3xl font-bold text-white">
                {user?.displayName?.charAt(0)?.toUpperCase() ||
                  user?.email?.charAt(0)?.toUpperCase() ||
                  "U"}
              </span>
            </div>
          )}
          <div className="mt-4 md:ml-6 md:mt-0">
            <h2 className="text-2xl font-semibold">
              {user?.displayName || "User"}
            </h2>
            <p className="text-gray-600">{user?.email || "No email"}</p>
            <div className="mt-2">
              <span className="inline-block px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded">
                {user?.providerData?.[0]?.providerId === "password"
                  ? "Email"
                  : user?.providerData?.[0]?.providerId === "google.com"
                  ? "Google"
                  : user?.providerData?.[0]?.providerId === "github.com"
                  ? "GitHub"
                  : "Unknown"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold text-gray-700">
              Account Information
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-semibold">
                  {user?.email || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Display Name:</span>
                <span className="ml-2 font-semibold">
                  {user?.displayName || "Not set"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Account Created:</span>
                <span className="ml-2 font-semibold">
                  {user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-gray-700">Account Status</h3>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Last Login:</span>
                <span className="ml-2 font-semibold">
                  {user?.metadata?.lastSignInTime
                    ? new Date(
                        user.metadata.lastSignInTime
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">User ID:</span>
                <span className="ml-2 font-mono text-sm break-all">
                  {user?.uid}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Section */}
      <div className="mb-8">
        <EditProfile />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 text-center transition bg-white border shadow-md cursor-pointer rounded-xl hover:shadow-lg">
          <div className="mb-2 text-3xl font-bold text-blue-600">
            {orders.length}
          </div>
          <h3 className="mb-2 text-lg font-semibold">Total Orders</h3>
          <p className="text-gray-600">View order history</p>
        </div>
        <div className="p-6 text-center transition bg-white border shadow-md cursor-pointer rounded-xl hover:shadow-lg">
          <div className="mb-2 text-3xl font-bold text-green-600">0</div>
          <h3 className="mb-2 text-lg font-semibold">Wishlist</h3>
          <p className="text-gray-600">Saved items</p>
        </div>
        <div className="p-6 text-center transition bg-white border shadow-md cursor-pointer rounded-xl hover:shadow-lg">
          <div className="mb-2 text-3xl font-bold text-purple-600">0</div>
          <h3 className="mb-2 text-lg font-semibold">Reviews</h3>
          <p className="text-gray-600">Your feedback</p>
        </div>
      </div>

      {/* Order History */}
      {orders.length > 0 && (
        <div className="p-6 bg-white shadow-md rounded-2xl">
          <h2 className="mb-6 text-2xl font-semibold">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Order ID</th>
                  <th className="py-3 text-left">Date</th>
                  <th className="py-3 text-left">Total</th>
                  <th className="py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">#{order.id}</td>
                    <td className="py-3">{order.date}</td>
                    <td className="py-3 font-semibold">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
