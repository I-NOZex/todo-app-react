import React, { useEffect, useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    setCompletedTasks(completed);
  }, [todos]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([...todos, { task: task.trim(), completed: false }]);
    setTask('');
  };

  const handleInputChange = ({target}) => setTask(target.value);

  const toggleTaskCompletion = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <fieldset role="group">
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            required
          />
          <button className="btn-add" type="submit">
            Add Task
          </button>
        </fieldset>
        <p>Total: {todos.length} | Completed: {completedTasks}</p>
      </form>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              <span>{todo.task}</span>
            </label>
            <button
              className="btn-remove"
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