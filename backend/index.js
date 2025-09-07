// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';
// import bookRoutes from './routes/books.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect Database
// connectDB(process.env.MONGODB_URI);

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/books', bookRoutes);

// // Health check
// app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Dynamic CORS setup
const allowedOrigins = [
  "http://localhost:3000",                // local dev
  process.env.ALLOWED_ORIGIN || "*"       // deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Connect Database
connectDB(process.env.MONGODB_URI);

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// ✅ Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
