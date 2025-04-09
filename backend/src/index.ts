import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ticketRoutes from "./routes/tickets";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tickets", ticketRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/halentech")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
