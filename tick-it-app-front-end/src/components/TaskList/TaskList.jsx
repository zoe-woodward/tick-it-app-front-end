

const TaskList = (props) => {

  return (
    <div>
      <h1>Task List</h1>
      <div>
      {!props.tasks.length ? (
          <h2>No Tasks Yet!</h2>
        ) : (
        <ul>
          {props.tasks.map((task) => (
            <li 
            key={task._id}
            style= {{ cursor: 'pointer' }}  
            onClick={() => props.handleSelect(task)}
          >
            {task.name}
          </li>
        ))}
      </ul>
        )}
      </div>
      <button onClick={props.handleFormView}>
        {props.isFormOpen ? 'Close Form' : 'New Task'}
      </button>
    </div>
  );
};

export default TaskList;
