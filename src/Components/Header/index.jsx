import React from "react";

import { Header } from "@mantine/core";
import "./header.scss";
// import { SettingsContext } from "../../Context/Settings";

const HeaderComponent = (props) => {
  // const settings = useContext(SettingsContext);

  return (
    <Header className="todo-header" data-testid="todo-header">
      <h1 data-testid="todo-h1">
        To Do List
        <h5>{props.incomplete} items pending</h5>
      </h1>
    </Header>
  );
};

export default HeaderComponent;
