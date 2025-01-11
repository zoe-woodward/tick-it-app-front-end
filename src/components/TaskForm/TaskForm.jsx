import { useState, useEffect } from 'react';
import * as taskService from '../../services/taskService';
import * as categoryService from '../../services/categoryService';
import { useParams } from 'react-router-dom';

const TaskForm = (props) => {
  const { handleUpdateTask, handleAddTask } = props; 
  const [formData, setFormData] = useState({
    name: '',
    dueDate: '',
    category: '',
  });
  const { taskId } = useParams();
  const [categories, setCategories] = useState([]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (taskId) {
      handleUpdateTask(taskId, formData);
    } else {
      handleAddTask(formData);
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
  const fetchCategories = async () => {
    const categoriesList = await categoryService.index();
    setCategories(categoriesList);
  }
  fetchCategories();
}, [taskId]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>{taskId ? 'Edit Task' : 'New Task'}</h1>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="dueDate">Due by</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          required
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))
          ) : (
            <option disabled>No categories available</option>
          )}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;