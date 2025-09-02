import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";

const router = Router();

// api/users
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;