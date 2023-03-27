import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { LoginContext } from "../../Context/Auth";
import Login from ".";

describe("Login component", () => {
  test("should render login form when not logged in", () => {
    const contextValue = { loggedIn: false };
    render(
      <LoginContext.Provider value={contextValue}>
        <Login />
      </LoginContext.Provider>
    );
    const loginForm = screen.getByPlaceholderText("login id");
    expect(loginForm).toBeInTheDocument();
  });

  test("should render logout button when logged in", () => {
    const contextValue = { loggedIn: true };
    render(
      <LoginContext.Provider value={contextValue}>
        <Login />
      </LoginContext.Provider>
    );
    const logoutButton = screen.getByText("Log Out");
    expect(logoutButton).toBeInTheDocument();
  });

  test("should call login function on form submit", () => {
    const contextValue = { loggedIn: false, login: jest.fn() };
    render(
      <LoginContext.Provider value={contextValue}>
        <Login />
      </LoginContext.Provider>
    );
    const loginForm = screen.getByPlaceholderText("login id");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(loginForm, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    expect(contextValue.login).toHaveBeenCalledTimes(1);
    expect(contextValue.login).toHaveBeenCalledWith("testuser", "testpassword");
  });
});
