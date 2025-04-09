import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { api } from "../services/api";
import { Ticket } from "../types/ticket";

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Ticket["status"]>("open");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        if (id) {
          const data = await api.getTicket(id);
          setTicket(data);
          setNotes(data.notes);
          setStatus(data.status);
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        const updatedTicket = await api.updateTicket(id, { status, notes });
        setTicket(updatedTicket);
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!ticket) {
    return <Typography>Ticket not found</Typography>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Ticket Details
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Back to List
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Customer Information</Typography>
        <Typography>Name: {ticket.customerName}</Typography>
        <Typography>Email: {ticket.email}</Typography>
        <Typography>
          Created: {new Date(ticket.createdAt).toLocaleDateString()}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value as Ticket["status"])}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
