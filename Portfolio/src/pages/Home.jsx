import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if user info is stored in localStorage
    const storedUser = localStorage.getItem("user");
    const storedUserId = localStorage.getItem("userId");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      const updatedUserId = localStorage.getItem("userId");

      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }

      setUserId(updatedUserId);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-gradient-to-br from-indigo-50 to-white">
      {/* Hero Section */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
        Welcome to <span className="text-indigo-600">Library Management</span>
      </h1>
      <p className="mt-4 text-gray-600 max-w-xl">
        Discover, borrow, and manage books with ease.
        Our Library System helps you stay organized and never miss a good read.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          to={userId ? `/${userId}/books` : "/auth"}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition"
        >
          Browse Books
        </Link>

        {user ? (
          <Link
            to={`/${userId}/add-books`}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium shadow hover:bg-green-600 transition"
          >
            Add Book
          </Link>
        ) : (
          <Link
            to="/auth"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium shadow hover:bg-gray-300 transition"
          >
            Login / Signup
          </Link>
        )}
      </div>

      {/* Illustration */}
      <div className="mt-12">
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          alt="Library Illustration"
          className="w-40 sm:w-56 mx-auto opacity-80"
        />
      </div>
    </div>
  );
}
