import { useState, useEffect } from 'react';
import * as taskService from '../../services/taskService';
import { Link, useParams } from "react-router-dom";



const TaskDetail = (props) => {
  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await taskService.show(taskId);
      setTask(taskData);
    };
    fetchTask();
  }, [taskId]);

  if (!task) return <main>Loading...</main>;

  return (
    <main>
      <header>
        <h1>{task.name}</h1>
        <p>Due By: {new Date(task.dueDate).toLocaleDateString()}</p>
      </header>

      <h2>
        {task.isCompleted ? 'Completed - well done!' : 'Not Completed - you can do it!'}
      </h2>
      
      <p>Category: {task.category}</p>

      <div className="button-container">
      <button>
          I've done this!
        </button>
        
        <Link to={`/${taskId}/edit`}>Edit</Link>

      
        <button onClick={() => props.handleDeleteTask(task._id)}> Delete Task </button>
      </div>
    </main>
  );
};

export default TaskDetail;











// const TaskDetail = (props) => {
//   if (!props.selected) {
//     return (
//       <div className="details-container">
//         <h2>Select a task for more information</h2>
//       </div>
//     );
//   }

//   const handleClick = () => {
//     props.handleSelect(null); 
//   };

//   return (
//     <div className="details-container" onClick={handleClick} style={{ cursor: 'pointer' }}>
//       <h1>{props.selected.name}</h1>
//       <h2>Due by: {props.selected.dueDate}</h2>
//       <h2>Category: {props.selected.category}</h2>
//       <div className="button-container">
//         <button onClick={(e) => {
//             e.stopPropagation(); 
//             props.handleFormView(props.selected); 
//           }}
//         >
//           Edit Task
//         </button>
        
//         <button
//           onClick={(e) => {
//             e.stopPropagation(); 
//             props.handleDeleteTask(props.selected._id); 
//           }}
//         >
//           Delete Task
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskDetail;
