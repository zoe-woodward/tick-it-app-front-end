

import { useState, useEffect } from 'react';
import './App.css';
import * as taskService from './services/taskService';

import TaskList from './components/TaskList/TaskList';
import TaskDetail from './components/TaskDetail/TaskDetail';
import TaskForm from './components/TaskForm/TaskForm';

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);


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
    setIsFormOpen(false);
  };

  const handleFormView = (task) => {
    setIsFormOpen(!isFormOpen);
    if (task) {
      setSelected(task);
    } else {
      setSelected(null);
    }
  };
  

  const handleAddTask = async (formData) => {
    try {
      const newTask = await taskService.create(formData);
      if (newTask.err) {
        throw new Error(newTask.err);
      }
      setTasks([newTask, ...tasks]);
      setIsFormOpen(false);  
      setSelected(null);      
    } catch (err) {
      console.log(err);
    }
  };



  const handleUpdateTask = async (formData, taskId) => {
    try {
      const updatedTask = await taskService.update(formData, taskId);
      if (updatedTask.err) {
        throw new Error(updatedTask.err);
      }
      const updatedTaskList = tasks.map((task) => (
        task._id !== updatedTask._id ? task : updatedTask
      ));
      setTasks(updatedTaskList);
      setSelected(updatedTask); 
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const deletedTask = await taskService.deleteTask(taskId);
      if (deletedTask.err) {
        throw new Error(deletedTask.err);
      }
      const fetchedTasks = await taskService.index(); 
      setTasks(fetchedTasks);  
      setSelected(null);       
      setIsFormOpen(false);  
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <TaskList
      tasks={tasks}
      handleSelect={handleSelect} 
      handleFormView={handleFormView}
      isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
      <TaskForm  
      handleAddTask={handleAddTask} 
      selected={selected} 
      handleUpdateTask={handleUpdateTask}/>
      ) : (
      <TaskDetail 
      selected={selected} 
      handleFormView={handleFormView}
      handleSelect={handleSelect} 
      handleDeleteTask={handleDeleteTask} />
      )}
    </>
  );
};



export default App;