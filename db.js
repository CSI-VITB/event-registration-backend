const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB URI is missing");
  }

  if (isConnected) {
    console.log("DB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "csiEvents",
    });

    isConnected = true;

    console.log("DB is connected");
  } catch (error) {
    console.log("Error connecting to DB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
