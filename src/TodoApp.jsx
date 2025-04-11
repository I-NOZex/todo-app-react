import React, { useState } from 'react';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (task.trim() === '') return;

    setTodos([...todos, { text: task, isCompleted: false }]);
    setTask('');
  };

  const handleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setTodos(updatedTodos);
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <form>
        <fieldset role='group'>
          <input
            type='text'
            value={task}
            required
            onChange={handleInputChange}
          />
          <button className='btn-add' type='submit' onClick={handleAddTask}>
            Add Task
          </button>
        </fieldset>
        <p>
          Total: {todos.length} | Completed:{' '}
          {todos.filter((todo) => todo.isCompleted).length}
        </p>
      </form>
      <ul className='todo-list'>
        {todos.map((todo, index) => (
          <li>
            <label key={index}>
              <input
                type='checkbox'
                checked={todo.isCompleted}
                onClick={() => handleComplete(index)}
              />
              <span>{todo.text}</span>
            </label>
            <button className='btn-remove' onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
