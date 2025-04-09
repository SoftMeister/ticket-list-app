import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import TicketList from "./TicketList";
import { api } from "../services/api";

// Mock the api
vi.mock("../services/api", () => ({
  api: {
    getTickets: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("TicketList", () => {
  const mockTickets = [
    {
      _id: "1",
      customerName: "John Doe",
      email: "john@example.com",
      status: "open",
      createdAt: "2024-04-09T10:00:00.000Z",
    },
    {
      _id: "2",
      customerName: "Jane Smith",
      email: "jane@example.com",
      status: "pending",
      createdAt: "2024-04-09T11:00:00.000Z",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (api.getTickets as any).mockResolvedValue(mockTickets);
  });

  it("renders the title correctly", () => {
    render(
      <MemoryRouter>
        <TicketList />
      </MemoryRouter>
    );
    expect(screen.getByText("Onboarding Tickets")).toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(
      <MemoryRouter>
        <TicketList />
      </MemoryRouter>
    );
    expect(screen.getByText("Customer Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Created At")).toBeInTheDocument();
  });

  it("fetches and displays tickets", async () => {
    render(
      <MemoryRouter>
        <TicketList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });

    expect(api.getTickets).toHaveBeenCalledTimes(1);
  });

  it("navigates to ticket detail when clicking a row", async () => {
    render(
      <MemoryRouter>
        <TicketList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    const row = screen.getByText("John Doe").closest("tr");
    await userEvent.click(row!);

    expect(mockNavigate).toHaveBeenCalledWith("/ticket/1");
  });

  it("handles API error gracefully", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (api.getTickets as any).mockRejectedValue(new Error("API Error"));

    render(
      <MemoryRouter>
        <TicketList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});
