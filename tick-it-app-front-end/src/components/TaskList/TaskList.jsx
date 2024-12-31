

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
            <li key={task._id}>{task.name}</li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
