const API_URL = "https://assignment20-five.vercel.app/api/books"; // your backend endpoint

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
