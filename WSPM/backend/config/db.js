const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  const uri =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/worker_safety_payroll";

  if (isConnected) return mongoose.connection;

  mongoose.set("strictQuery", true);

  mongoose.connection.on("connected", () => {
    console.log("🟢 MongoDB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("🔴 MongoDB connection error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("🟠 MongoDB disconnected");
  });

  await mongoose.connect(uri, {
    // options left default for Mongoose v8
  });

  isConnected = true;
  return mongoose.connection;
};

module.exports = { connectDB };
