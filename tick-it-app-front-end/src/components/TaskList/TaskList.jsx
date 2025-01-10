import { Link } from 'react-router-dom';

const TaskList = (props) => {

  return (
    <main>
      <h1>Task List</h1>
      
      {!props.tasks.length ? (
        <h2>No Tasks Yet!</h2>
      ) : (
        props.tasks.map((task) => (
          <Link key={task._id} to={`/${task._id}`}>
             <article className={task.isCompleted ? 'completed' : ''}>
              <header>
                <h2>{task.name}</h2>
              </header>
            </article>
          </Link>
        ))
      )}
      <div className="button-container">
      <Link to="/new">
        <button>
          Add Task
        </button>
        </Link>
      </div>
    </main>
  );
};

export default TaskList;

















