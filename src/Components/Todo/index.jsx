import React, {useContext} from 'react';
import { UserContext } from '../../App'

const Todo = (props) => {

    const defaultUser = useContext(UserContext)

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

      {defaultUser.list.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}

    </div>
  );
};

export default Todo;