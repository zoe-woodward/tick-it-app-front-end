import * as authService from '../src/services/authService'; 
import { useState, createContext, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import './App.css';
import * as taskService from './services/taskService';
import TaskList from './components/TaskList/TaskList';
import TaskDetail from './components/TaskDetail/TaskDetail';
import TaskForm from './components/TaskForm/TaskForm';
import Landing from './components/Landing/Landing';
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchAllTasks = async () => {
      const tasksData = await taskService.index();
      setTasks(tasksData);
    };
    if (user) fetchAllTasks();
  }, [user]);


  const handleSignout = () => {
    authService.signout();
    localStorage.removeItem('authToken'); 
    setUser(null);
  }

  const navigate = useNavigate();

  const handleAddTask = async (formData) => {
    const newTask = await taskService.create(formData);
    setTasks([newTask, ...tasks]);
    navigate('/');
  };

  const handleDeleteTask = async (taskId) => {
    const deletedTask = await taskService.deleteTask(taskId);
    console.log('taskId', taskId);
    setTasks(tasks.filter((task) => task._id !== deletedTask._id));
  navigate('/');
};


const handleUpdateTask = async (taskId, formData) => {
  const updatedTask = await taskService.update(taskId, formData);
  setTasks(tasks.map((task) => (taskId === task._id ? updatedTask : task)));
  navigate(`/${taskId}`);
};



  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<TaskList tasks={tasks} />} />
              <Route path="/:taskId" element={<TaskDetail handleDeleteTask={handleDeleteTask} />} />
              <Route path="/new" element={<TaskForm handleAddTask={handleAddTask} />} />
              <Route path="/:taskId/edit" element={<TaskForm handleUpdateTask={handleUpdateTask} />} />

            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
         
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;














