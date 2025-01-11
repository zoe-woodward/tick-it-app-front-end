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
  

  const handleMarkAsCompleted = async () => {
    try {
      const updatedTask = await taskService.update(task._id, {isCompleted: true});
      setTask(updatedTask); 
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  return (
    <main>
      <header>
        <h1>{task.name}</h1>
        <p>Due By: {new Date(task.dueDate).toLocaleDateString()}</p>
      </header>

      <h2>
        {task.isCompleted ? 'Completed - well done!' : 'Not Completed - you can do it!'}
      </h2>
      
      <p>Category: {task.category.category}</p>

      <div className="button-container">
      <button className="mark-completed" onClick={handleMarkAsCompleted}>
          I've done this!
        </button>
        
        <Link to={`/${taskId}/edit`}>Edit Task</Link>

      
        <button className="delete-task" onClick={() => props.handleDeleteTask(task._id)}> Delete Task </button>
      </div>
    </main>
  );
};

export default TaskDetail;









