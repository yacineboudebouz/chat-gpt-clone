import { connect, disconnect } from "mongoose";
async function connectDB() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("Database connected successfully.");
  } catch (e) {
    throw new Error("Error while connecting to database.");
  }
}

async function disconnectFromDB() {
  try {
    await disconnect();
    console.log("Database disconnected successfully.");
  } catch (e) {
    throw new Error("Error while disconnecting from database.");
  }
}

export { connectDB, disconnectFromDB };
