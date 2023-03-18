import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Pagination } from "@mantine/core";

const List = (props) => {
  const defaultUser = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedList = defaultUser.list.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="List">
        {displayedList.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.text}</p>
              <p>
                <small>Assigned to: {item.assignee}</small>
              </p>
              <p>
                <small>Difficulty: {item.difficulty}</small>
              </p>
              <div onClick={() => props.toggleComplete(item.id)}>
                Complete: {item.complete.toString()}
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <Pagination
        size="sm"
        total={defaultUser.list.length/3}
        limit={itemsPerPage}
        value={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
