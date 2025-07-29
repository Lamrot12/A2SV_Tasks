import React, { useState } from 'react';

const NewTask = ({
  task,
  index,
  onDelete,
  onEdit,
}: {
  task: string;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (index: number, newTask: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task);

  const handleSave = () => {
    onEdit(index, newText);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type='text'
            placeholder='Edit the task'
            value={newText}
            onChange={(e) => setNewText(e.target.value)
            
            }
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          {task}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default NewTask;
