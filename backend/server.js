import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';

dotenv.config(); 

const app = express();

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://library-management-nu-one.vercel.app"            

];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());



app.get("/", (req, res) => res.send("✅ API Working"));
 
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
// ✅ Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
