import "./App.scss";
import React from "react";

import { MantineProvider } from "@mantine/core";

import Header from "./Components/Header";
import Todo from "./Components/Todo";
import List from "./Components/List";

import { SettingsContext } from "./Context/Settings";

const App = () => {
  
  return (
    <SettingsContext>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Header />
        <Todo />;
        <List />
      </MantineProvider>
    </SettingsContext>
  );
};
export default App;
