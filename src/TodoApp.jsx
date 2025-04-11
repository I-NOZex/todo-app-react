import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.done).length;

  const handleFormInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = (newTask) => {
    setTodos([...todos, newTask]);
    setTask('');
  };

  const toggleTaskDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const handleDeleteTask = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (task.trim()) {
      handleAddTask({ task: task.trim(), done: false });
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <fieldset role='group'>
          <input
            type='text'
            value={task}
            onChange={handleFormInputChange}
            required
          />
          <button className='btn-add' type='submit'>
            Add Task
          </button>
        </fieldset>
        <p>
          Total: {totalTasks} | Completed: {completedTasks}
        </p>
      </form>
      <ul className='todo-list'>
        {todos.map((todo, index) => (
          <li key={index}>
            <label>
              <input
                type='checkbox'
                checked={todo.done}
                onChange={() => toggleTaskDone(index)}
              />
              <span className={todo.done ? 'done' : ''}>{todo.task}</span>
            </label>
            <button
              className='btn-remove'
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
