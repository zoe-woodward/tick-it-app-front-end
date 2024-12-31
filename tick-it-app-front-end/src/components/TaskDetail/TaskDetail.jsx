const TaskDetail = (props) => {
    if (!props.selected) {
      return (
        <div>
          <h2>Select a task for more information</h2>
        </div>
      );
    }
  
    const handleClick = () => {
      props.handleSelect(null); 
    };
  
    return (
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        <h1>{props.selected.name}</h1>
        <h2>Due by: {props.selected.dueDate}</h2>
        <h2>Category: {props.selected.category}</h2>
      </div>
    );
  };
  
  export default TaskDetail;
  