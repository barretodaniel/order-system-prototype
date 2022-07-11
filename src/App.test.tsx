import { describe, expect, it } from "vitest";
import App from "./App";
import { render, screen, waitFor, userEvent } from "./utils/test-utils";

describe("Opal Menu prototype", () => {
  it("shows the title", () => {
    render(<App />);
    expect(screen.getByText(/Opal Menu/i)).toBeInTheDocument();
  });

  it("shows all the menu options", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Burger/i)).toBeInTheDocument();
      expect(screen.getByText(/Fries/i)).toBeInTheDocument();
      expect(screen.getByText(/Soda/i)).toBeInTheDocument();
    });
  });

  it("adds menu options to order summary", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Soda/i)).toBeInTheDocument();
    });
    userEvent.selectOptions(screen.getByTestId(/soda-select/i), "too large");
    await waitFor(() => {
      expect(
        screen.getAllByRole("button", { name: /Add to cart/i })[1]
      ).not.toBeDisabled();
    });

    userEvent.click(screen.getAllByRole("button", { name: /Add to cart/i })[1]);
    await waitFor(() => {
      expect(screen.getByText(/qty\. 1/i)).toBeInTheDocument();
    });
  });
});
