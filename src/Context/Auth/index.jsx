import React, { useState, useEffect } from "react";

import jwt_decode from "jwt-decode";

import { testUsers } from "./testUsers";

export const LoginContext = React.createContext();

function LoginProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ capabilities: [] });
  const [error, setError] = useState(null);

  const login = (username, password) => {
    let validUser = testUsers[username];

    if (validUser && validUser.password === password) {
      try {
        validateToken(validUser.token);
      } catch (e) {
        setLoginState(false, null, {}, e.message);
      }
    } else {
      setLoginState(false, null, {}, { message: "Invalid User" });
    }
  };

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      setLoginState(true, token, validUser);
    } catch (e) {
      setLoginState(false, null, {}, e.message);
    }
  };

  const setLoginState = (loggedIn, token, user, error) => {
    setLoggedIn(loggedIn);
    setToken(token);
    setUser(user);
    setError(error);
    localStorage.setItem("auth", token);
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  const can = (capability) => {
    console.log(user?.capabilities);
    return user?.capabilities?.includes(capability);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth");
    validateToken(token);
    // eslint-disable-next-line
  }, []);

  const state = { loggedIn, token, user, login, logout, can, error };
  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
