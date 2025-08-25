import express from "express";
import path from "path";

// Import using relative paths since aliases don't work in server context
import { createRoutes } from "./routes";
import { MemStorage } from "./storage";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize storage
const storage = new MemStorage();

// API routes
app.use("/api", createRoutes(storage));

// Start server
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});