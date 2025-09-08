import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const navigate = useNavigate();
 
  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserId(null);  
    navigate("/auth");
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">📚 Library</Link>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:underline">Home</Link>
          {userId ? (
            <>
              <Link to={`/${userId}/books`} className="hover:underline">Books</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="hover:underline">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
