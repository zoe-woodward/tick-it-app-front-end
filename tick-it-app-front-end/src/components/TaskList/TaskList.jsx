import { Link } from 'react-router-dom';

const TaskList = (props) => {

  return (
    <main>
      <h1>Task List</h1>
      
      {!props.tasks.length ? (
        <h2>No Tasks Yet!</h2>
      ) : (
        props.tasks.map((task) => (
          <Link key={task._id} to={`/${task._id}`}>
            <article>
              <header>
                <h2>{task.name}</h2>
              </header>
            </article>
          </Link>
        ))
      )}
      <div className="button-container">
      <Link to="/new">
        <button>
          Add Task
        </button>
        </Link>
      </div>
    </main>
  );
};

export default TaskList;



















// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';
// import TaskForm from '../TaskForm/TaskForm';
// import * as taskService from '../../services/taskService';


// const TaskList = (props) => {
//   const [selected, setSelected] = useState(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [tasks, setTasks] = useState([]);

//   const handleSelect = (task) => {
//     setSelected(task === selected ? null : task);
//     setIsFormOpen(false);  
//   };

//   const handleFormView = () => {
//     setIsFormOpen(!isFormOpen);
//   };

//   const handleAddTask = (formData) => {
//     taskService.create(formData)
//       .then(newTask => {
//         setTasks([newTask, ...tasks]);
//         setIsFormOpen(false);
//         setSelected(null);
//       })
//       .catch(err => console.error("Error adding task:", err));
//   };

//   const handleUpdateTask = (formData, taskId) => {
//     taskService.update(formData, taskId)
//       .then(updatedTask => {
//         setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
//         setSelected(null);
//         setIsFormOpen(false);
//       })
//       .catch(err => console.error("Error updating task:", err));
//   };

//   return (
//     <div className="task-list-container">
//       <h1>Task List</h1>
//       {!props.tasks.length ? (
//       <h2>No Tasks Yet!</h2> 
//        ) : (
//         <ul>
//           {props.tasks.map((task) => (
//             <li key={task._id} onClick={() => handleSelect(task)}>
//               {task.name}
//             </li>
//           ))}
//         </ul>
//       )}
//       <button onClick={handleFormView}>
//         {isFormOpen ? 'Close Form' : 'New Task'}
//       </button>

//       {isFormOpen && (
//         <TaskForm
//           selected={selected}
//           handleAddTask={handleAddTask}
//           handleUpdateTask={handleUpdateTask}
//         />
//       )}
//     </div>
//   );
// };

// export default TaskList;
