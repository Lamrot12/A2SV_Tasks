import React, { useRef } from 'react';

const AddToDo = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const value = inputRef.current?.value || '';
    if (value.trim()) {
      onSubmit(value);
      inputRef.current!.value = ''; 
    }
  };

  return (
    <>
      <input id="myInput" type="text" placeholder="Enter task" ref={inputRef} />
      <button onClick={handleClick}>Add Task</button>
    </>
  );
};

export default AddToDo;
