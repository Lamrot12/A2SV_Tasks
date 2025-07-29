import React, { useState } from "react"
import Header from "./components/Header"
import AddToDo from "./components/AddToDo"
import NewTask from "./components/NewTask"
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (task: string) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, newTask: string) => {
    const updated = [...tasks];
    updated[index] = newTask;
    setTasks(updated);
  };

  return (
  <div className="app">
    <Header />
    <AddToDo onSubmit={addTask} />
    <ul>
      {tasks.map((task, index) => (
        <NewTask
          key={index}
          task={task}
          index={index}
          onDelete={deleteTask}
          onEdit={updateTask}
        />
      ))}
    </ul>
  </div>
);

};

export default App;
