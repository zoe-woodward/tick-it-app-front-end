import { useState, useEffect } from 'react';
import * as taskService from '../../services/taskService';

import { useParams } from 'react-router-dom';



const TaskForm = (props) => {

  const [formData, setFormData] = useState({
    name: '',
    dueDate: '',
    category: '',
  });


const { taskId } = useParams();



  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (taskId) {
      props.handleUpdateTask(taskId, formData);
    } else {
      props.handleAddTask(formData);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId) {
        const taskData = await taskService.show(taskId);
        const formattedDate = taskData.dueDate ? taskData.dueDate.split('T')[0] : ''; 

        setFormData({
          name: taskData.name || '', 
          dueDate: formattedDate, 
          category: taskData.category || '',  
        });
      }
    };

    fetchTask();  
  }, [taskId]);  
  


  return (
    
    <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1>{taskId ? 'Edit Task' : 'New Task'}</h1>
        <label htmlFor="name"> Name </label>
        <input
          id="name-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="dueDate"> Due by </label>
        <input
          id="dueDate-input"
          name="dueDate"
          type='date'
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
       <label htmlFor="category">Category</label>
       <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;

