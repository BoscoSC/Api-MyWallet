import { validateLogin, validateUserSchema } from "../middlewares/auth.js";
import { signIn, signUp } from "../controllers/auth.js";

import { Router } from "express";

const router = Router();

router.post("/sign-up", validateUserSchema, signUp);
router.post("/sign-in", validateLogin, signIn);

export default router;
