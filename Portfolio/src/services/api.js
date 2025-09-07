const API_URL = "http://localhost:5000/api/books"; // your backend endpoint

export async function getBooks() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function borrowBook(id) {
  await fetch(`${API_URL}/borrow/${id}`, { method: "PUT" });
}

export async function returnBook(id) {
  await fetch(`${API_URL}/return/${id}`, { method: "PUT" });
}
