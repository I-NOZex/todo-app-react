import React from 'react';

import { useState } from 'react';

import TodoElement from './toDoElement.jsx';

const TodoApp = () => {
  const [task, setTask] = useState('');

  const [todos, setTodos] = useState([]);

  const handleFormInputChange = (event) => {
    setTask(event.target.value);

    console.log(task);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setTodos((prevTodos) => [...prevTodos, { task, isCompleted: false }]);

    setTask('');
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <fieldset role='group'>
          <input
            type='text'
            required
            value={task}
            onInput={handleFormInputChange}
          />

          <button className='btn-add' type='submit'>
            Add Task
          </button>
        </fieldset>

        <p>
          Total: {} | Completed: {}
        </p>
      </form>

      <ul className='todo-list'>
        {todos.map((todo, index) => (
          <TodoElement
            key={index}
            task={todo.task}
            isCompleted={todo.isCompleted}
            onToggle={() => {
              setTodos((prevTodos) => {
                const newTodos = [...prevTodos];

                newTodos[index].isCompleted = !newTodos[index].isCompleted;

                return newTodos;
              });
            }}
            onDelete={() => {
              setTodos((prevTodos) =>
                prevTodos.filter((nothingToWorryBout, i) => i !== index)
              );
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
