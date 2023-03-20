import React, { useContext } from "react";

import { Header } from "@mantine/core";
import "./header.scss";
import { Context } from "../../App";

const HeaderComponent = () => {
  const defaultUser = useContext(Context);

  return (
    <Header className="todo-header" data-testid="todo-header">
      <h1 data-testid="todo-h1">
        To Do List: <span>{defaultUser.incomplete} items pending</span>
      </h1>
    </Header>
  );
};

export default HeaderComponent;
