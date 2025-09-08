 
import { useState } from "react";

export default function BookCard({ book, onBorrow, onReturn, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    available: book.available,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    onUpdate(book._id, form);
    setIsEditing(false);
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
          <input
            type="text"
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            className="border rounded p-1 w-full"
          />
          <select
            name="available"
            value={form.available}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                available: e.target.value === "true",
              }))
            }
            className="border rounded p-1 w-full"
          >
            <option value="true">Available</option>
            <option value="false">Borrowed</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-gray-600">by {book.author}</p>
          <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
          <p
            className={`mt-2 font-medium ${
              book.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {book.available ? "Available" : "Borrowed"}
          </p>

          <div className="mt-4 flex gap-2">
            {book.available ? (
              <button
                onClick={() => onBorrow(book._id)}
                className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition"
              >
                Borrow
              </button>
            ) : (
              <button
                onClick={() => onReturn(book._id)}
                className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition"
              >
                Return
              </button>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
            >
              Update
            </button>
          </div>
        </>
      )}
    </div>
  );
}
