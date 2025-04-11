import React, { useEffect, useState } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
    const [task, setTask] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTask = (task) => {
        setTodos((prevTodos) => [...prevTodos, task]);
        setTask('');
    };

    const toggleTaskDone = (taskID) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === taskID ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDeleteTask = (taskID) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskID));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (task.trim() === '') {
            alert('Please enter the name of the task');
            return;
        }

        const taskExists = todos.some(
            (todo) => todo.title.toLowerCase() === task.trim().toLowerCase()
        );
        if (taskExists) {
            alert('Task already exists');
            return;
        }

        const newTask = {
            id: Date.now(),
            title: task.trim(),
            completed: false,
        };
        handleAddTask(newTask);
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
                        onChange={handleFormInputChange}
                        placeholder='Enter a task'
                    />
                    <button className='btn-add' type='submit'>
                        Add Task
                    </button>
                </fieldset>
                <p>
                    Total: {todos.length} | Completed: {todos.filter((todo) => todo.completed).length}
                </p>
            </form>
            <ul className='todo-list'>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <label>
                            <input
                                type='checkbox'
                                checked={todo.completed}
                                onChange={() => toggleTaskDone(todo.id)}
                            />
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.title}
                            </span>
                        </label>
                        <button className='btn-remove' onClick={() => handleDeleteTask(todo.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
