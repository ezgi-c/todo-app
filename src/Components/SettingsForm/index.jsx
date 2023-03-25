import React, { useContext } from "react";
import { SettingsContext } from "../../Context/Settings";
import { Modal } from "@mantine/core";

function SettingsForm(props) {
  let settings = useContext(SettingsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeItemsPerPage = (e) => {
    let value = e.target.value;
    settings.changeItemsPerPage(value);
  };

  const handleChangeShowCompleted = (e) => {
    let value = e.target.checked;
    settings.changeShowCompleted(value);
  };

  return (
    <Modal onClose={props.handleCloseModal} opened={props.showModal}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>How Many Items per Page?</span>
            <input
              type="number"
              onChange={handleChangeItemsPerPage}
              defaultValue={settings.itemsPerPage}
            />
          </label>
        </div>

        <div>
          <label>
            <span>Show Completed Items?</span>
            <input
              type="checkbox"
              onChange={handleChangeShowCompleted}
              defaultChecked={settings.showCompleted}
            />
          </label>
        </div>
      </form>
    </Modal>
  );
}

export default SettingsForm;
