import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;
