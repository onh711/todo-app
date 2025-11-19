import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Create } from './components/Create';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TaskTable } from './components/TaskTable';

export const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    
    const featchTasks = async () =>{
      try {
        const API_URL = "http://localhost/api/tasks"
        const res = await axios.get(API_URL);
        setTasks(res.data.tasks);
        console.log(res.data)
        } catch (e) {
          return e;
        }
    }

    useEffect(() => {
    featchTasks();
    }, []);

 
    
//     useEffect(() => {
//       (async () => {
//         try {
//           const res = await axios.get(API_URL);
//           setTasks(res.data.tasks);
//         } catch (e) {
//             return e;
//         }
//     })();
// }, []);


  return (
    <>
    <Box>
        <Typography variant="h1" component="h2">タスク一覧</Typography>
        <Create onAdd={featchTasks}/>
        <TaskTable tasks={tasks} onChange={featchTasks}/>
    </Box>
    </>
  )
}
