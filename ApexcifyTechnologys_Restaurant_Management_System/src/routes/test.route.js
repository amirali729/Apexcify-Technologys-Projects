import { Router } from "express";
import { testUserController} from "../controllers/test.controller.js"

const router = Router()

router.get("/test-user", testUserController);

export default router