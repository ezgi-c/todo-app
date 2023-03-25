// 2 settings:
// Display or Hide completed items (boolean).
// Number of items to display per screen (number).

import React, { useState, useEffect } from "react";

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const [defaultValues] = useState({
    difficulty: 4,
  });

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [showCompleted, setShowCompleted] = useState(false);

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  // Proxy Function

  const changeItemsPerPage = (newNumber) => {
    newNumber = Number(newNumber);
    localStorage.setItem("itemsPerPage", newNumber);
    setItemsPerPage(newNumber);
  };

  const changeShowCompleted = (newChoice) => {
    localStorage.setItem("showCompleted", JSON.stringify(newChoice));
    setShowCompleted(newChoice);
  };

  useEffect(() => {
    let savedItemsPerPage = localStorage.getItem("itemsPerPage");
    let savedShowCompleted = JSON.parse(localStorage.getItem("showCompleted"));
    changeItemsPerPage(savedItemsPerPage);
    changeShowCompleted(savedShowCompleted);
  }, []);

  const addToList = (item) => setList([...list, item]);

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    if (!showCompleted) {
      setList(items.filter((item) => !item.complete));
    } else {

      setList(items)
    }
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  let exportedSettings = {
    list,
    addToList,
    defaultValues,
    toggleComplete,
    itemsPerPage,
    showCompleted,
    changeItemsPerPage,
    changeShowCompleted,
    incomplete,
  };

  return (
    <SettingsContext.Provider value={exportedSettings}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
