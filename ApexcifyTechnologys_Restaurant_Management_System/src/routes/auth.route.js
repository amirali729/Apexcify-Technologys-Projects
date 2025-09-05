import { Router } from "express";

import {
    registerController,
    loginController,
} from "../controllers/auth.controller"

const router = Router()

//routes
//REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);
export default router