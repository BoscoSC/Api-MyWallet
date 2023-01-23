import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transactions.js";

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(transactionRoutes);

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
