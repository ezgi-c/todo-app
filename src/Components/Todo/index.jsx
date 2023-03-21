import React, {useContext} from 'react';
import { Context } from '../../App'
import {Button } from '@mantine/core';

const Todo = (props) => {

    const defaultUser = useContext(Context)

  return (
    <div className='Todo'>

      <form onSubmit={props.handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item: </span>
          <input onChange={props.handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To: </span>
          <input onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty: </span>
          <input onChange={props.handleChange} defaultValue={defaultUser.defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <Button className="button" type="submit">Add Item</Button>
        </label>
      </form>
    </div>
  );
};

export default Todo;