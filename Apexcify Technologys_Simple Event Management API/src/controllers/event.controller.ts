import { Request, Response } from "express";
import Event, { IEvent } from "../models/event.model";

// Get all events
// Route: GET /api/events
// Access: Public
export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const events: IEvent[] = await Event.find();
    res.status(200).json(events);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get a single event by ID
// Route: GET /api/events/:id
// Access: Public
export const getEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = req.params.id;

    const event: IEvent | null = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.status(200).json(event);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Create a new event
// Route: POST /api/events
// Access: Private (only logged-in users)
export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    
    // Create new event object with data from request
    const event: IEvent = new Event({
      ...req.body,
      createdBy: userId,
    });

    // Save new event to database
    const savedEvent: IEvent = await event.save();
    res.status(200).json(savedEvent);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update an event
// Route: PUT /api/events/:id
// Access: Private (only creator can update)
export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const event: IEvent | null = await Event.findById(req.params.id);

    if (!event) {
      res.status(404).json({ message: "Event not Found" });
      return;
    }

    // Check if logged-in user is the creator
    if (event.createdBy.toString() !== userId) {
      res
        .status(403)
        .json({ message: "You do not have permission to update this event" });
      return;
    }

    // Update event with new data
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Delete an event
// Route: DELETE /api/events/:id
// Access: Private (only creator can delete)
export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const event: IEvent | null = await Event.findById(req.params.id);

    if (!event) {
      res.status(404).json({ message: "Event not Found" });
      return;
    }

    // Check if logged-in user is the creator
    if (event.createdBy.toString() !== userId) {
      res
        .status(403)
        .json({ message: "You do not have permission to update this event" });
      return;
    }

    // Delete the event
    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Event deleted" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};