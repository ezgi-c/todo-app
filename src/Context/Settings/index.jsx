// 2 settings:
// Display or Hide completed items (boolean).
// Number of items to display per screen (number).

import React, { useState, useEffect } from "react";

export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  const [defaultValues] = useState({
    difficulty: 3,
  });

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [showCompleted, setShowCompleted] = useState(false);

  let items = props.items;
  let setItems = props.setItems;

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

    if (!showCompleted) {
      setItems(items.filter((item) => !item.complete));
    } else {
      setItems(items);
    }

    changeItemsPerPage(savedItemsPerPage);
    changeShowCompleted(savedShowCompleted);

  }, [items, setItems, showCompleted]);

  let exportedSettings = {
    defaultValues,
    itemsPerPage,
    showCompleted,
    changeItemsPerPage,
    changeShowCompleted,
  };

  return (
    <SettingsContext.Provider value={exportedSettings}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
