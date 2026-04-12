const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes  = require("./routes/auth");
const leadRoutes  = require("./routes/leads");
const noteRoutes  = require("./routes/notes");

const app = express();

// ── Middleware ──────────────────────────────────
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// ── Routes ──────────────────────────────────────
app.use("/api/auth",  authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/notes", noteRoutes);

// Health check
app.get("/api/health", (_req, res) =>
  res.json({ status: "OK", message: "CRM API running" })
);

// 404
app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// ── Connect & Start ──────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅  MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀  Server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌  MongoDB error:", err.message);
    process.exit(1);
  });
