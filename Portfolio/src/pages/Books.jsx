import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { getBooks, borrowBook, returnBook } from "../services/api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const data = await getBooks();
    setBooks(data);
  }

  async function handleBorrow(id) {
    await borrowBook(id);
    fetchBooks();
  }

  async function handleReturn(id) {
    await returnBook(id);
    fetchBooks();
  }

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase()) ||
    b.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filtered.map((book) => (
          <BookCard key={book._id} book={book} onBorrow={handleBorrow} onReturn={handleReturn} />
        ))}
      </div>
    </div>
  );
}
