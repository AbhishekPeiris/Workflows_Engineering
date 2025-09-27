// CommonJS for simplicity (no "type":"module" needed)
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const { connectDB } = require("./config/db");
const { mailer } = require("./config/email");

const app = express();

// ----- Core Middlewares -----
app.use(
  cors({
    origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL] : "*",
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ----- Static Folders (for uploads & generated PDFs) -----
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/reports", express.static(path.join(__dirname, "reports")));

// ----- Health & Status -----
app.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "Worker Safety & Payroll Backend",
    time: new Date().toISOString(),
  });
});

// ----- API Base (placeholder until routes added) -----
// Example: when you create routes, uncomment and mount here
app.use('/api/workers', require('./routes/workerRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/payroll', require('./routes/payrollRoutes'));
app.use('/api/safety', require('./routes/safetyRoutes'));
app.use('/api/incidents', require('./routes/incidentRoutes'));
app.use('/api/training', require('./routes/trainingRoutes'));
app.use('/api/shifts', require('./routes/shiftSwapRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

// Simple root message
app.get("/", (_req, res) => {
  res.send("Worker Safety & Payroll Management API is running ✅");
});

// ----- 404 Handler -----
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
});

// ----- Global Error Handler -----
app.use((err, _req, res, _next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err?.message || "Something went wrong",
  });
});

// ----- Start Server after DB Connect -----
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    // Simple test of mailer configuration (disabled by default)
    // await mailer.verify();

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("❌ Failed to start server:", e);
    process.exit(1);
  }
})();

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down...");
  process.exit(0);
});
