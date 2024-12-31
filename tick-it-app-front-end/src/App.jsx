

import { useState, useEffect } from 'react';
import * as taskService from './services/taskService';

import TaskList from './components/TaskList/TaskList';
import TaskDetail from './components/TaskDetail/TaskDetail';

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(null);


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

  const handleSelect = (task) => {
    if (task === selected) {
      setSelected(null); 
    } else {
      setSelected(task);
    }
  };


  return (
    <>
      <TaskList tasks={tasks} handleSelect={handleSelect} />
      <TaskDetail selected={selected} handleSelect={handleSelect} />
    </>
  );
};

export default App;