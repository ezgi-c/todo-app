import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

test("renders header component", () => {
  render(<App />);
  const headerElement = screen.getByText(/to do list/i);
  expect(headerElement).toBeInTheDocument();
});
