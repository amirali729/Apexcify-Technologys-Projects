import { Router } from "express";
import {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} from "../controllers/user.controller.js";

import  {authMiddleware}  from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/getUser",authMiddleware,getUserController);

router.put("/updateUser", authMiddleware, updateUserController);

router.post("/updatePassword", authMiddleware, updatePasswordController);

// RESET PASSWORD
router.post("/resetPassword", authMiddleware, resetPasswordController);

// delete USER
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

export default router
