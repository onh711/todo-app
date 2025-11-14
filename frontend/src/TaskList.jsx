import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Create } from './components/Create';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TaskTable } from './components/TaskTable';

export const TaskList = () => {
  return (
    <>
    <Box>
        <Typography variant="h1" component="h2">タスク一覧</Typography>
        <Create/>
        <TaskTable/>
    </Box>
    </>
  )
}
