import React, { useState, useMemo } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const totalTasks = useMemo(() => todos.length, [todos]);
  const completedTasks = useMemo(
    () => todos.filter((todo) => todo.done).length,
    [todos]
  );

  const handleAddTask = () => {
    if (task) {
      setTodos([...todos, { text: task, done: false }]);
      setTask('');
    }
  };

  const toggleTaskDone = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <fieldset role='group'>
          <input
            type='text'
            value={task}
            onChange={(e) => setTask(e.target.value)}
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
              <span>{todo.text}</span>
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
