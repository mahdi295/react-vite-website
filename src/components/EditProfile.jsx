import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage({ type: "error", text: "Name is required" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const updates = {};
      if (name !== user.displayName) updates.displayName = name;
      if (photoURL !== user.photoURL) updates.photoURL = photoURL;

      if (Object.keys(updates).length > 0) {
        await updateUserProfile(updates);
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "info", text: "No changes made" });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to update profile: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.style.display = "none";
    const nextSibling = e.target.nextElementSibling;
    if (nextSibling) {
      nextSibling.style.display = "block";
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h3 className="mb-4 text-xl font-semibold">Edit Profile</h3>

      {message.text && (
        <div
          className={`p-3 rounded mb-4 ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-700">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700">
            Profile Photo URL (optional)
          </label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/photo.jpg"
          />
          {photoURL && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Preview:</p>
              <img
                src={photoURL}
                alt="Profile preview"
                className="w-16 h-16 mt-1 border rounded-full"
                onError={handleImageError}
              />
              <div className="text-sm text-red-500" style={{ display: "none" }}>
                Invalid image URL
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
