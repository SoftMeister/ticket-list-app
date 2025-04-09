"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
dotenv_1.default.config();
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
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/halentech");
            console.log("Connected to MongoDB");
            // Clear existing tickets
            yield Ticket_1.default.deleteMany({});
            console.log("Cleared existing tickets");
            // Insert sample tickets
            yield Ticket_1.default.insertMany(sampleTickets);
            console.log("Sample tickets inserted successfully");
            yield mongoose_1.default.disconnect();
            console.log("Disconnected from MongoDB");
        }
        catch (error) {
            console.error("Error seeding database:", error);
            process.exit(1);
        }
    });
}
seed();
