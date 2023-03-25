import React, { useState, useContext } from "react";
import { SettingsContext } from "../../Context/Settings";

import { Pagination, CloseButton } from "@mantine/core";

const List = (props) => {
  const settings = useContext(SettingsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = settings.itemsPerPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedList = settings.list.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="List">
        {displayedList.map((item) => {
          return (
            <div className="listItem" key={item.id}>
              <CloseButton
                className="deleteButton"
                onClick={() => settings.toggleComplete(item.id)}
                title="Close popover"
                size="xl"
                iconSize={20}
              />
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
            </div>
          );
        })}
      </div>
      <Pagination
        className="pagination"
        size="sm"
        total={settings.list.length / itemsPerPage + 1}
        limit={itemsPerPage}
        value={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
