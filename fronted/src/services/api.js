 
const API_URL = "https://assignment20-five.vercel.app/api/books"; 

//  Get token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem("token"); 
  return token ? { Authorization: `Bearer ${token}` } : {};
}

//  Get all books
export async function getBooks() {
  const res = await fetch(API_URL, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

// Add a new book
export async function addBook(bookData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(bookData),
  });
  if (!res.ok) throw new Error("Failed to add book");
  return res.json();
}

// Borrow a book
export async function borrowBook(id) {
  const res = await fetch(`${API_URL}/${id}/borrow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to borrow book");
  return res.json();
}


// Update a book
export async function updateBook(id, updatedData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return res.json();
}


// Return a book
export async function returnBook(id) {
  const res = await fetch(`${API_URL}/${id}/return`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to return book");
  return res.json();
}
