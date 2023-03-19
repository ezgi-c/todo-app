import React, {useContext} from 'react';
import { Context } from '../../App'

const Todo = (props) => {

    const defaultUser = useContext(Context)

  return (
    <div className='Todo'>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: <span>{defaultUser.incomplete} items pending</span></h1>
      </header>

      <form onSubmit={props.handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={props.handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={props.handleChange} defaultValue={defaultUser.defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>
    </div>
  );
};

export default Todo;