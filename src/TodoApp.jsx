import React, { useEffect, useState } from 'react';

const TodoApp = () => {
  // const [todos, setTodos] = [[], () => {}];
  // const [task, setTask] = ['', () => {}];

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  // let totalTasks = 0;
  // let completedTasks = 0;

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    if (!todos.length) return;

    const calculateCompletedTasks = async () => {
      setCompletedTasks(todos.filter((todo) => todo.completed).length);
      setTotalTasks(todos.length);
    };

    calculateCompletedTasks();
  }, [todos]);

  const handleAddTask = () => {
    if (task) {
      setTodos([...todos, { task, completed: false }]);
      setTask('');
    }
  };

  const toggleTaskDone = (taskIndex) => {
    const updatedTodos = todos.map((todo, index) => {
      if (index === taskIndex) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTask = (taskIndex) => {
    const filteredTodos = todos.filter((val, index) => index !== taskIndex);
    setTodos(filteredTodos);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleAddTask();
    setTask('');
  };

  const handleFormInputChange = (event) => {
    setTask(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <fieldset role='group'>
          <input
            type='text'
            value={task}
            required
            onChange={(e) => handleFormInputChange(e)}
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
                checked={todo.completed}
                onChange={() => toggleTaskDone(index)}
              />
              <span>{todo.task}</span>
            </label>
            <button
              className='btn-remove'
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
        {/* <li>
          <label>
            <input type='checkbox' checked={false} />
            <span>{'Make this list dynamic!'}</span>
          </label>
          <button className='btn-remove'>Delete</button>
        </li> */}
      </ul>
    </div>
  );
};

export default TodoApp;
