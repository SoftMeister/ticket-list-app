import axios from "axios";
import { Ticket, TicketUpdate } from "../types/ticket";

const API_URL = "http://localhost:5000/api";

export const api = {
  // Get all tickets
  getTickets: async (): Promise<Ticket[]> => {
    const response = await axios.get(`${API_URL}/tickets`);
    return response.data;
  },

  // Get single ticket
  getTicket: async (id: string): Promise<Ticket> => {
    const response = await axios.get(`${API_URL}/tickets/${id}`);
    return response.data;
  },

  // Update ticket
  updateTicket: async (id: string, data: TicketUpdate): Promise<Ticket> => {
    const response = await axios.patch(`${API_URL}/tickets/${id}`, data);
    return response.data;
  },
};
