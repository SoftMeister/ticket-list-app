export interface Ticket {
  _id: string;
  customerName: string;
  email: string;
  createdAt: string;
  status: "open" | "pending" | "done";
  notes: string;
}

export interface TicketUpdate {
  status?: "open" | "pending" | "done";
  notes?: string;
}
