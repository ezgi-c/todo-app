import React, { useState, useContext, useEffect } from "react";
import { SettingsContext } from "../../Context/Settings";
import Auth from "../Auth";
import { Pagination, CloseButton } from "@mantine/core";
import axios from "axios";

const List = ({ items, setItems }) => {
  const settings = useContext(SettingsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = settings.itemsPerPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedList = items.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const toggleComplete = async (item) => {
    // axios.put
    // url: api/v1/todo/item._id
    // data: item
    const url = `${process.env.REACT_APP_API}/api/v1/todo/${item._id}`;

    try {
      const response = await axios.put(url, {
        ...item,
        complete: !item.complete,
      });

      // item.complete = !item.complete;

      // update in state
      const updatedItems = items.map((i) =>
        i._id === item._id ? { ...item, complete: !item.complete } : i
      );

      setItems(
        settings.showCompleted
          ? updatedItems
          : updatedItems.filter((i) => !i.complete)
      );
      console.log(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  const deleteItem = async (item) => {
    const url = `${process.env.REACT_APP_API}/api/v1/todo/${item._id}`;

    try {
      const response = await axios.delete(url);

      // remove from state
      const updatedItems = items.filter((i) => i._id !== item._id);

      setItems(
        settings.showCompleted
          ? updatedItems
          : updatedItems.filter((i) => !i.complete)
      );
      console.log(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    toggleComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="List">
        {displayedList.map((item) => {
          return (
            <div className="listItem" key={item._id}>
              <Auth capability="delete">
                <CloseButton
                  className="deleteButton"
                  onClick={() => deleteItem(item)}
                  title="Close popover"
                  size="xl"
                  iconSize={20}
                />
              </Auth>

              <Auth capability="read">
                <div
                  style={{
                    textDecoration: item.complete ? "line-through" : "none",
                  }}
                >
                  <h4>{item.text}</h4>
                  <p>
                    <small>Assigned to: {item.assignee}</small>
                  </p>
                  <p>
                    <small>Difficulty: {item.difficulty}</small>
                  </p>
                  <Auth capability="update">
                    <button
                      className={`completeButton ${
                        item.complete ? "complete" : "incomplete"
                      }`}
                      onClick={() => toggleComplete(item)}
                    >
                      Complete: {item.complete.toString()}
                    </button>
                  </Auth>
                </div>
              </Auth>
            </div>
          );
        })}
      </div>
      <Pagination
        className="pagination"
        size="sm"
        total={items.length / itemsPerPage + 1}
        limit={itemsPerPage}
        value={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
