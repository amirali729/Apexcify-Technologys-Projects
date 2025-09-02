import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "../controllers/event.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// api/events
router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/", authenticate, createEvent);
router.put("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);

export default router;