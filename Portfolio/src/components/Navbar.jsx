import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">📚 Library</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/books" className="hover:underline">Books</Link>
          <Link to="/auth" className="hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
}
