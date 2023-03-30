import React, { useState, useContext, useEffect } from "react";
import { SettingsContext } from "../../Context/Settings";
import Auth from "../Auth";

import { Pagination, CloseButton } from "@mantine/core";

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

  const toggleComplete = (item) => {
    item.complete = !item.complete;
    // axios.put
    // url: api/v1/todo/item._id
    // data: item
    // update in state
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
              <Auth capability="update">
                <CloseButton
                  className="deleteButton"
                  onClick={() => toggleComplete(item)}
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
                  <div>Complete: {item.complete.toString()}</div>
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
