import React from 'react';

const TodoApp = () => {
  /*
  const [todos, setTodos] = [[], () => {}];
  const [task, setTask] = ['', () => {}];

  const totalTasks = null;
  const completedTasks = null;

  const handleAddTask = () => {};

  const toggleTaskDone = () => {};

  const handleDeleteTask = () => {};

  const handleFormSubmit = () => {};

  const handleFormInputChange = () => {};
  */

  return (
    <div>
      <form>
        <fieldset role='group'>
          <input type='text' value='' required />
          <button className='btn-add' type='submit'>
            Add Task
          </button>
        </fieldset>
        <p>
          Total: {} | Completed: {}
        </p>
      </form>
      <ul className='todo-list'>
        <li>
          <label>
            <input type='checkbox' checked={false} />
            <span>{'Make this list dynamic!'}</span>
          </label>
          <button className='btn-remove'>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default TodoApp;
