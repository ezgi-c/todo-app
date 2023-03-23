// 2 settings:
// Display or Hide completed items (boolean).
// Number of items to display per screen (number).
// values needed:
// list, setList, toggleComplete(), incomplete, setIncomplete?, defaultValues

import React, { useState, useEffect } from "react";


export const SettingsContext = React.createContext();

function SettingsProvider(props) {
  // const [name, setName] = useState('Nobody');

  const [defaultValues] = useState({
    difficulty: 4,
    itemsPerPage: 3,
  });

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  //  // Proxy Function

  const addToList = (item) => setList([...list, item]);

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items.filter((item) => !item.complete));
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
    // setList,
    addToList,
    incomplete,
    setIncomplete,
    defaultValues,
    toggleComplete,
    // handleChange,
    // handleSubmit
  };

  return (
    <SettingsContext.Provider value={exportedSettings}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
