import "./App.scss";
import React, { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Todo from "./Components/Todo";
import List from "./Components/List"

import useForm from "./hooks/form";

export const UserContext = createContext("");

const App = () => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  //  - Display three items.
 //  - Hide completed items using a boolean.
 // - Define “difficulty” as a default sort word 
 // to optionally use in the stretch goal.

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
      
    });

    setList(items.filter(item => !item.complete));
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <UserContext.Provider value={{ list, setList, incomplete, setIncomplete, defaultValues }}>
      <Todo handleChange={handleChange} handleSubmit={handleSubmit} />;
      <List toggleComplete={toggleComplete}/>
    </UserContext.Provider>
  );
};
export default App;