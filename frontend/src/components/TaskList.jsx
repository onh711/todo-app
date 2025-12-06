import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { TaskFilter } from './TaskFilter';

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const featchTasks = async () => {
    try {
      const API_URL = '/api/tasks';
      const res = await axios.get(API_URL);
      setTasks(res.data.tasks);
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    featchTasks();
  }, []);

  return (
    <>
      <Box sx={{ margin: '0 auto', textAlign: 'center' }}>
        <Container sx={{ marginBottom: '30px' }}>
          <Typography variant="h1" fontSize={40} sx={{ padding: '35px' }}>
            タスク一覧
          </Typography>
          <TaskFilter tasks={tasks} onChange={featchTasks} />
        </Container>
      </Box>
    </>
  );
};
