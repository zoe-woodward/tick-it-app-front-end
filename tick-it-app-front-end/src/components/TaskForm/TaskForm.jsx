
import { useState } from 'react';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dueDate: '',
    category: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  return (
    <div>
      <form>
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="dueDate"> Due by </label>
        <input
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
        <label htmlFor="category"> Category </label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <button type="submit">Add New Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
