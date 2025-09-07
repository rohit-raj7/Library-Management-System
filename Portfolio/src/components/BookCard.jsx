export default function BookCard({ book, onBorrow, onReturn }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-gray-600">by {book.author}</p>
      <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
      <p className={`mt-2 font-medium ${book.available ? "text-green-600" : "text-red-600"}`}>
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
      </div>
    </div>
  );
}
