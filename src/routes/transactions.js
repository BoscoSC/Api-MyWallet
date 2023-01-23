import {
  createTransaction,
  findTransactions,
} from "../controllers/transactions.js";
import { validateAuthRoute } from "../middlewares/auth.js";
import { transactionSchemaValidation } from "../middlewares/transaction.js";

import { Router } from "express";

const router = Router();

router.use(validateAuthRoute);
router.post("/transactions", transactionSchemaValidation, createTransaction);
router.get("/transactions", findTransactions);

export default router;
