/**
 * ============================================================
 * ENTRY POINT — index.js
 * ============================================================
 * Wires together: DB connection, Express app, routes, middleware.
 */

require("dotenv").config(); // Load .env variables

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middleware/error.middleware");

// ── Connect to MongoDB ──
connectDB();

const app = express();

// ── Middleware ──
app.use(cors());                          // Allow cross-origin requests from HTML file
app.use(express.json());                  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve HTML UI

// ── API Routes ──
app.use("/api/users", userRoutes);

// ── Health Check ──
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    db: require("mongoose").connection.readyState === 1 ? "connected" : "disconnected",
    time: new Date().toISOString(),
  });
});

// ── Serve UI for all non-API routes ──
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Global Error Handler (must be LAST middleware) ──
app.use(errorHandler);

// ── Start Server ──
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📖 UI available at  http://localhost:${PORT}`);
  console.log(`🔌 API base URL     http://localhost:${PORT}/api/users`);
});
