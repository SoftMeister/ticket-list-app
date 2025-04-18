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
const express_1 = __importDefault(require("express"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const router = express_1.default.Router();
// Get all tickets
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield Ticket_1.default.find().sort({ createdAt: -1 });
        res.json(tickets);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching tickets" });
    }
}));
// Get single ticket
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield Ticket_1.default.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.json(ticket);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ticket" });
    }
}));
// Update ticket
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, notes } = req.body;
        const ticket = yield Ticket_1.default.findByIdAndUpdate(req.params.id, { status, notes }, { new: true });
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.json(ticket);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ticket" });
    }
}));
exports.default = router;
