import express from 'express';
import { addBook, getAvailableBooks, borrowBook, returnBook } from '../controllers/booksController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// GET public available books
router.get('/', getAvailableBooks);

// Add book - Admin only
router.post('/', protect, authorize('Admin'), addBook);

// Borrow & Return - Members (or Admin)
router.post('/:id/borrow', protect, authorize(['Member', 'Admin']), borrowBook);
router.post('/:id/return', protect, authorize(['Member', 'Admin']), returnBook);

export default router;
