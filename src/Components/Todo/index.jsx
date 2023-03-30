import React, { useContext, useState } from "react";
import { SettingsContext } from "../../Context/Settings";
import useForm from "../../hooks/form";
import { v4 as uuid } from "uuid";
import { Button } from "@mantine/core";
import SettingsForm from "../SettingsForm";

const Todo = (props) => {
  const settings = useContext(SettingsContext);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    props.handleAddItem(item);
  }

  const { handleChange, handleSubmit } = useForm(
    addItem,
    settings.defaultValues
  );

  return (
    <div className="Todo">
      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item: </span>
          <input
            onChange={handleChange}
            name="text"
            type="text"
            placeholder="Item Details"
          />
        </label>

        <label>
          <span>Assigned To: </span>
          <input
            onChange={handleChange}
            name="assignee"
            type="text"
            placeholder="Assignee Name"
          />
        </label>

        <label>
          <span>Difficulty: </span>
          <input
            onChange={handleChange}
            defaultValue={settings.defaultValues.difficulty}
            type="range"
            min={1}
            max={5}
            name="difficulty"
          />
        </label>

        <label>
          <Button className="button" type="submit">
            Add Item
          </Button>
        </label>

        <span className="settings" onClick={handleShowModal}>
          ⛭ settings
        </span>
      </form>
      <SettingsForm showModal={showModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default Todo;
