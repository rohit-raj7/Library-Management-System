import { useState } from "react";
import { addBook } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AddBookForm({ onBookAdded }) {
  const [form, setForm] = useState({ title: "", author: "", isbn: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.isbn) {
      toast.error("⚠️ All fields are required!");
      return;
    }

    try {
      setLoading(true);

      const newBook = await addBook({ ...form, available: true });

      if (onBookAdded) onBookAdded(newBook);

      setForm({ title: "", author: "", isbn: "" });

      toast.success("Book added successfully!");
    } catch (err) {
      toast.error(err.message || " Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ title: "", author: "", isbn: "" });
    toast.info("Form reset");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 mt-6 max-w-md mx-auto"
      id="add-book-form"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">➕ Add New Book</h3>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter book title"
          required
          className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Enter author name"
          required
          className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">ISBN</label>
        <input
          type="text"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="Enter ISBN number"
          required
          className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
