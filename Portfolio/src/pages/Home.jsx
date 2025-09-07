import { Link } from "react-router-dom";

export default function Home() {
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
          to="/books"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition"
        >
          Browse Books
        </Link>
        <Link
          to="/auth"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium shadow hover:bg-gray-300 transition"
        >
          Login / Signup
        </Link>
      </div>

      {/* Illustration / Extra Styling */}
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
