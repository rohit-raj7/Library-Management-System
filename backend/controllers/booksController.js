import Book from '../models/Book.js';

// Add a new book (Admin / protected)
export const addBook = async (req, res) => {
  const { title, author, isbn } = req.body;
  try {
    const existing = await Book.findOne({ isbn });
    if (existing) return res.status(400).json({ message: 'Book with this ISBN already exists' });

    const book = await Book.create({ title, author, isbn });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch all available books (public)
export const getAvailableBooks = async (req, res) => {
  try {
    const books = await Book.find({ available: true });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Borrow a book (Member)
export const borrowBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.available) return res.status(400).json({ message: 'Book already borrowed' });

    book.available = false;
    await book.save();
    res.json({ message: 'Book borrowed', book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Return a book (Member)
export const returnBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.available) return res.status(400).json({ message: 'Book is already available' });

    book.available = true;
    await book.save();
    res.json({ message: 'Book returned', book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
