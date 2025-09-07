import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { getBooks, borrowBook, returnBook } from "../services/api";

export default function Books() {
  const { userId } = useParams(); // get userId from URL
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (userId) fetchBooks();
  }, [userId]);

  // Fetch books for the specific user
  async function fetchBooks() {
    try {
      const data = await getBooks(userId); // pass userId to API call
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }

  async function handleBorrow(bookId) {
    try {
      await borrowBook(userId, bookId); // pass userId to borrow API
      fetchBooks();
    } catch (err) {
      console.error("Failed to borrow book:", err);
    }
  }

  async function handleReturn(bookId) {
    try {
      await returnBook(userId, bookId); // pass userId to return API
      fetchBooks();
    } catch (err) {
      console.error("Failed to return book:", err);
    }
  }

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filtered.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onBorrow={handleBorrow}
            onReturn={handleReturn}
          />
        ))}
      </div>
    </div>
  );
}
