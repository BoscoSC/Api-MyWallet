import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await mongoClient.connect();
} catch (error) {
  console.log(error);
}

const db = mongoClient.db();

export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");
export const transactionsCollection = db.collection("transactions");
