/**
 * ============================================================
 * MONGOOSE CONCEPT: Database Connection
 * ============================================================
 * mongoose.connect() establishes a connection to MongoDB.
 * We use a single connection that the entire app reuses.
 * Options like serverSelectionTimeoutMS help handle network issues.
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if DB unreachable
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // CONCEPT: Connection Events
    // Mongoose emits lifecycle events on the connection object
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB reconnected");
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;
