// import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  //-1 means that default value indicates not editing mode
  const [editIndex, setEditIndex] = useState(-1);
  const [updatedTask, setUpdatedTask] = useState("");

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(task.trim());
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const handleUpdate = (index) => {
    setEditIndex(index);
    setUpdatedTask(tasks[index]);
  };

  const handleSave = (index) => {
    const updatedTasks = tasks.map((t, i) => (i === index ? updatedTask : t));
    setTasks(updatedTasks);
    setEditIndex(-1);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Enter Task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={updatedTask}
                    onChange={(event) => setUpdatedTask(event.target.value)}
                  />
                  <button onClick={() => handleSave(index)}>Save</button>
                </>
              ) : (
                <>
                  {task}
                  <button onClick={() => handleUpdate(index)}>Update</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
