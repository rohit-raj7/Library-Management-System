 
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { getBooks, borrowBook, returnBook, updateBook } from "../services/api";
import { toast } from "react-toastify";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      toast.error("❌ Failed to load books");
    } finally {
      setLoading(false);
    }
  }

  async function handleBorrow(bookId) {
    try {
      await borrowBook(bookId);
      toast.success("📚 Book borrowed successfully!");
      fetchBooks();
    } catch (err) {
      console.error("Failed to borrow book:", err);
      toast.error("❌ Failed to borrow book");
    }
  }

  async function handleReturn(bookId) {
    try {
      await returnBook(bookId);
      toast.success("✅ Book returned successfully!");
      fetchBooks();
    } catch (err) {
      console.error("Failed to return book:", err);
      toast.error("❌ Failed to return book");
    }
  }

  async function handleUpdate(bookId, updatedData) {
    try {
      await updateBook(bookId, updatedData);
      toast.success("✏️ Book updated successfully!");
      fetchBooks();
    } catch (err) {
      console.error("Failed to update book:", err);
      toast.error("❌ Failed to update book");
    }
  }

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <SearchBar query={query} setQuery={setQuery} />

      {loading ? (
        <p className="text-center text-gray-600 mt-6">Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filtered.length > 0 ? (
            filtered.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onBorrow={handleBorrow}
                onReturn={handleReturn}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No books found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
