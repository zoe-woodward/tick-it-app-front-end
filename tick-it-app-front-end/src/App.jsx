

import { useState, useEffect } from 'react';
import * as taskService from './services/taskService';

import TaskList from './components/TaskList/TaskList';

const App = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.index();
        if (fetchedTasks.err) {
          throw new Error(fetchedTasks.err);
        }
        setTasks(fetchedTasks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <TaskList tasks={tasks} />
    </>
  );
};

export default App;