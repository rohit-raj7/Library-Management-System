import express from "express";
import {
  addBook,
  getAvailableBooks,
  borrowBook,updateBook,
  returnBook,
} from "../controllers/booksController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();
 
router.get("/", getAvailableBooks);
 
router.post("/", protect, addBook);

router.put("/:id", protect, updateBook);
 
router.post("/:id/borrow", protect, authorize(["Member", "Admin"]), borrowBook);
router.post("/:id/return", protect, authorize(["Member", "Admin"]), returnBook);

export default router;
