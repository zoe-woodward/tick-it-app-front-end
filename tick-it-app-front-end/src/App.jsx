import * as authService from '../src/services/authService'; 
import { useState, createContext, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import './App.css';
import * as taskService from './services/taskService';
import TaskList from './components/TaskList/TaskList';
import TaskDetail from './components/TaskDetail/TaskDetail';
import TaskForm from './components/TaskForm/TaskForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchAllTasks = async () => {
      const tasksData = await taskService.index();
      console.log('tasksData:', tasksData);
      setTasks(tasksData);
    };
    if (user) fetchAllTasks();
  }, [user]);


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            // Protected Routes:
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/tasks" element={<TaskList tasks={tasks} />} />
              <Route path="/tasks/:taskId" element={<TaskDetail />} />
            </>
          ) : (
            // Public Route:
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


// const App = () => {

//   const [tasks, setTasks] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [user, setUser] = useState(authService.getUser()); // using the method from authservice

//   // Set the user from localStorage or JWT token if available
//   useEffect(() => {
//     const storedUser = authService.getUser();
//     setUser(storedUser);
//   }, []);  // Run once on component mount

//   // Signout handler
//   const handleSignout = () => {
//     localStorage.removeItem('token');  // Remove token from localStorage
//     setUser(null);  // Reset the user state
//   };

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const fetchedTasks = await taskService.index();
//         if (fetchedTasks.err) {
//           throw new Error(fetchedTasks.err);
//         }
//         setTasks(fetchedTasks);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const handleSelect = (task) => {
//     if (task === selected) {
//       setSelected(null); 
//     } else {
//       setSelected(task);
//     }
//     setIsFormOpen(false);
//   };

//   const handleFormView = (task) => {
//     setIsFormOpen(!isFormOpen);
//     if (task) {
//       setSelected(task);
//     } else {
//       setSelected(null);
//     }
//   };
  

//   const handleAddTask = async (formData) => {
//     try {
//       const newTask = await taskService.create(formData);
//       if (newTask.err) {
//         throw new Error(newTask.err);
//       }
//       setTasks([newTask, ...tasks]);
//       setIsFormOpen(false);  
//       setSelected(null);      
//     } catch (err) {
//       console.log(err);
//     }
//   };



//   const handleUpdateTask = async (formData, taskId) => {
//     try {
//       const updatedTask = await taskService.update(formData, taskId);
//       if (updatedTask.err) {
//         throw new Error(updatedTask.err);
//       }
//       const updatedTaskList = tasks.map((task) => (
//         task._id !== updatedTask._id ? task : updatedTask
//       ));
//       setTasks(updatedTaskList);
//       setSelected(updatedTask); 
//       setIsFormOpen(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleDeleteTask = async (taskId) => {
//     try {
//       const deletedTask = await taskService.deleteTask(taskId);
//       if (deletedTask.err) {
//         throw new Error(deletedTask.err);
//       }
//       const fetchedTasks = await taskService.index(); 
//       setTasks(fetchedTasks);  
//       setSelected(null);       
//       setIsFormOpen(false);  
//     } catch (err) {
//       console.log(err);
//     }
//   };


//   return (
//     <>
//       <NavBar user={user} handleSignout={handleSignout} />  {/* Pass user and handleSignout to NavBar */}
//       <Routes>
//       {
//           user ?
//             <Route path="/" element={<TaskList user={user} />} />
//           :
//             <Route path="/" element={<Landing />} />
//         }
//       <Route path="/signup" element={<SignupForm setUser={setUser} />} />
//       <Route path="/signin" element={<SigninForm setUser={setUser} />} />
//       </Routes>
//       <TaskList
//       tasks={tasks}
//       handleSelect={handleSelect} 
//       handleFormView={handleFormView}
//       isFormOpen={isFormOpen}
//       />
//       {isFormOpen ? (
//       <TaskForm  
//       handleAddTask={handleAddTask} 
//       selected={selected} 
//       handleUpdateTask={handleUpdateTask}/>
//       ) : (
//       <TaskDetail 
//       selected={selected} 
//       handleFormView={handleFormView}
//       handleSelect={handleSelect} 
//       handleDeleteTask={handleDeleteTask} />
//       )}
//     </>
//   );
// };



// export default App;