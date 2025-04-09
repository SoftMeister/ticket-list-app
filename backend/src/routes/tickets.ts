import express from "express";
import Ticket from "../models/ticket.model";

const router = express.Router();

// Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
});

// Get single ticket
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ticket" });
  }
});

// Update ticket
router.patch("/:id", async (req, res) => {
  try {
    const { status, notes } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error updating ticket" });
  }
});

export default router;
