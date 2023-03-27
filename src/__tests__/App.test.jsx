import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("App component", () => {
  test("renders Header component", () => {
    render(<App />);
    const headerElement = screen.getByTestId("todo-header");
    expect(headerElement).toBeInTheDocument();
  });
});
