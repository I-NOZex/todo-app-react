import React from 'react';

const TodoElement = ({ task = 'default', isCompleted, onToggle, onDelete }) => {
  return (
    <li>
      <label>
        <input
          type='checkbox'
          checked={isCompleted ? 'true' : 'false'}
          onChange={onToggle}
        />
        <span>{task}</span>
      </label>
      <button className='btn-remove' onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default TodoElement;
