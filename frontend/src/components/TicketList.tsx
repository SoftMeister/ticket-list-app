import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { api } from "../services/api";
import { Ticket } from "../types/ticket";

const statusColors = {
  open: "error",
  pending: "warning",
  done: "success",
} as const;

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await api.getTickets();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Onboarding Tickets
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow
                key={ticket._id}
                onClick={() => navigate(`/ticket/${ticket._id}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell>{ticket.customerName}</TableCell>
                <TableCell>{ticket.email}</TableCell>
                <TableCell>
                  <Chip
                    label={ticket.status}
                    color={statusColors[ticket.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
