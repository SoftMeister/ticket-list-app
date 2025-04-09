import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import TicketList from "./components/TicketList";
import TicketDetail from "./components/TicketDetail";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<TicketList />} />
            <Route path="/ticket/:id" element={<TicketDetail />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
