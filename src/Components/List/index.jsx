import React, { useState, useContext } from "react";
import { SettingsContext } from '../../Context/Settings';

import { Pagination, CloseButton } from "@mantine/core";

const List = (props) => {

  const settings = useContext(SettingsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedList = settings.list
    .sort((a, b) => a.difficulty - b.difficulty)
    .slice(startIndex, endIndex);

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
              <p>{item.text}</p>
              <p>
                <small>Assigned to: {item.assignee}</small>
              </p>
              <p>
                <small>Difficulty: {item.difficulty}</small>
              </p>
              <div>Complete: {item.complete.toString()}</div>
            </div>
          );
        })}
      </div>
      <Pagination
        className="pagination"
        size="sm"
        total={settings.list.length / 3}
        limit={itemsPerPage}
        value={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
