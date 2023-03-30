import "./App.scss";
import React, { useState, useEffect } from "react";
// import React from "react";
import SettingsContext from "./Context/Settings";
import LoginContext from "../src/Context/Auth/";
import Auth from "./Components/Auth";
import { MantineProvider } from "@mantine/core";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Todo from "./Components/Todo";
import List from "./Components/List";
import axios from "axios";

const App = () => {

  const [items, setItems] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  const getTodoItems = async function() {
    let url = `${process.env.REACT_APP_API}/api/v1/todo`
    const response = await axios.get(url);
    setItems( response.data.results)
  }

  const handleAddItem = async (item) => {

    const url = `${process.env.REACT_APP_API}/api/v1/todo`;
    
    try {
    const response = await axios.post(url, item)
    setItems( [...items, response.data]);
    } catch (e) {
      console.error( e.message)
    }
  }
  
  useEffect( () => {
    getTodoItems();
  }, [])

  useEffect(() => {
    let incompleteCount = items.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    
    let sortedList = items
    ?.sort((a, b) => a.difficulty - b.difficulty)
    .sort((a,b)=> a.complete - b.complete);
    setItems(sortedList);
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items], []);

  return (
    <LoginContext>
      <SettingsContext items={items} setItems={setItems}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Header incomplete={incomplete}/>
          <Login />
          <Auth capability="create">
            <Todo handleAddItem={handleAddItem}/>;
          </Auth>
          <Auth capability="read">
            <List items={items} setItems={setItems}/>
          </Auth>
        </MantineProvider>
      </SettingsContext>
    </LoginContext>
  );
};
export default App;
