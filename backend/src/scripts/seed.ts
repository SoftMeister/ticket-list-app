import mongoose from "mongoose";
import dotenv from "dotenv";
import Ticket from "../models/ticket.model";

dotenv.config();

const sampleTickets = [
  {
    customerName: "John Doe",
    email: "john.doe@example.com",
    status: "open",
    notes: "Initial onboarding request",
  },
  {
    customerName: "Jane Smith",
    email: "jane.smith@example.com",
    status: "pending",
    notes: "Waiting for document verification",
  },
  {
    customerName: "Bob Wilson",
    email: "bob.wilson@example.com",
    status: "done",
    notes: "Onboarding completed successfully",
  },
];

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/halentech"
    );
    console.log("Connected to MongoDB");

    // Clear existing tickets
    await Ticket.deleteMany({});
    console.log("Cleared existing tickets");

    // Insert sample tickets
    await Ticket.insertMany(sampleTickets);
    console.log("Sample tickets inserted successfully");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
