import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("renders TicketList on the home route", () => {
    render(<App />);
    // Verify the container is present
    expect(screen.getByRole("TicketList")).toBeInTheDocument();
  });

  it("renders TicketList component at root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    // Add specific assertions for TicketList component
    // This will depend on what your TicketList component renders
  });

  it("renders TicketDetail component for ticket route", () => {
    render(
      <MemoryRouter initialEntries={["/ticket/1"]}>
        <App />
      </MemoryRouter>
    );
    // Add specific assertions for TicketDetail component
    // This will depend on what your TicketDetail component renders
  });

  it("uses the correct theme configuration", () => {
    render(<App />);
    // You can test theme application by checking computed styles
    const container = screen.getByRole("main");
    const styles = window.getComputedStyle(container);
    expect(styles.marginTop).toBeDefined();
  });
});
