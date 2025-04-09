import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
  customerName: string;
  email: string;
  createdAt: Date;
  status: "open" | "pending" | "done";
  notes: string;
}

const TicketSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["open", "pending", "done"],
    default: "open",
  },
  notes: { type: String, default: "" },
});

export default mongoose.model<ITicket>("Ticket", TicketSchema);
