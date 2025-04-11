import React, {useCallback, useEffect, useMemo, useState} from 'react';

const TodoApp = () => {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setTodos(prevState => [...prevState, {
            completed: false, label: task
        }])
    };

    const handleDeleteTask = (indexToDelete) => {
        setTodos(prevState => prevState.filter((ele, index) => index !== indexToDelete))
    };

    const toggleTaskDone = (taskToComplete) => {
        setTodos(prevState => prevState.map((todo, index) => {
            if (index === taskToComplete) {
                return {
                    ...todo, completed: !todo.completed
                }
            }
            return todo;
        }))
    };

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('todos'));
        setTodos(localData)
    }, [])

    return (<div>
            <form onSubmit={handleFormSubmit}>
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
                    Total: {todos.length} | Completed: {todos.filter((item) => item.completed).length}
                </p>
            </form>
            <ul className='todo-list'>
                {todos.map((todo, index) => (<li key={index}>
                        <label>
                            <input type='checkbox' checked={todo.completed} onChange={() => {
                                toggleTaskDone(index)
                            }}/>
                            <span>{todo.label}</span>
                        </label>
                        <button className='btn-remove' onClick={() => {
                            handleDeleteTask(index)
                        }}>Delete
                        </button>
                    </li>))}
            </ul>
        </div>);
};

export default TodoApp;
