import { useState, useEffect } from 'react';
import * as taskService from '../../services/taskService';
import { useParams } from "react-router-dom";


const TaskDetail = (props) => {
  if (!props.selected) {
    return (
      <div className="details-container">
        <h2>Select a task for more information</h2>
      </div>
    );
  }

  const handleClick = () => {
    props.handleSelect(null); 
  };

  return (
    <div className="details-container" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h1>{props.selected.name}</h1>
      <h2>Due by: {props.selected.dueDate}</h2>
      <h2>Category: {props.selected.category}</h2>
      <div className="button-container">
        <button onClick={(e) => {
            e.stopPropagation(); 
            props.handleFormView(props.selected); 
          }}
        >
          Edit Task
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            props.handleDeleteTask(props.selected._id); 
          }}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
