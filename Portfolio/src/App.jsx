import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Books from "./pages/Books";
import AddBookForm from "./components/AddBookForm";
import Auth from "./pages/Auth";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} /> 
            <Route path="/auth" element={<Auth />} />
            <Route path="/:userId/add-books" element={<AddBookForm />} /> 

            <Route path="/:userId/books" element={<Books />} />  
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
