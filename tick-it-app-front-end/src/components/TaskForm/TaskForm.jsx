import { useState, useEffect } from 'react';

const TaskForm = (props) => {
  const initialState = {
    name: '',
    dueDate: '',
    category: '',
  };

  const [formData, setFormData] = useState(initialState);

  
  useEffect(() => {
    if (props.selected) {
      setFormData({
        name: props.selected.name || '',
        dueDate: props.selected.dueDate || '',
        category: props.selected.category || '',
      });
    } else {
      setFormData(initialState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selected]);


  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    if (props.selected && props.selected._id) {
      props.handleUpdateTask(formData, props.selected._id);
    } else {
      props.handleAddTask(formData);
    }
  };
  

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
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
        <button type="submit">
          {props.selected ? 'Update Task' : 'Add New Task' }
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
