import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";

// Clean up after each test
afterEach(() => {
  cleanup();
});
