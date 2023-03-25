import "./App.scss";
// import React, { useState } from "react";
import React from "react";

import SettingsContext from "./Context/Settings";
import LoginContext from "../src/Context/Auth/";
import Auth from "./Components/Auth";

import { MantineProvider } from "@mantine/core";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Todo from "./Components/Todo";
import List from "./Components/List";

const App = () => {
  return (
    <LoginContext>
      <SettingsContext>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Header />
          <Login />
          <Auth capability="create">
            <Todo />;
            <Auth>
              <List />
            </Auth>
          </Auth>
        </MantineProvider>
      </SettingsContext>
    </LoginContext>
  );
};
export default App;
