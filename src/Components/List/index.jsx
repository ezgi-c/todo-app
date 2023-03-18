import React, { useContext } from "react";
import { UserContext } from "../../App";

const List = (props) => {
  const defaultUser = useContext(UserContext);

  return (
    <div className="List">
      {defaultUser.list.map((item) => {
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
      )})}
    </div>
  );
};

export default List;
