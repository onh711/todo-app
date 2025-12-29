import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TaskFilter } from "./TaskFilter.jsx";
import type { Task } from "../types/task.js";

type TasksResponse = {
  tasks: Task[];
};

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const API_URL = "/api/tasks";
      const res = await axios.get<TasksResponse>(API_URL);
      setTasks(res.data.tasks);
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Box sx={{ margin: "0 auto", textAlign: "center" }}>
        <Container sx={{ marginBottom: "30px" }}>
          <Typography variant="h1" fontSize={40} sx={{ padding: "35px" }}>
            タスク一覧
          </Typography>
          <TaskFilter tasks={tasks} onChange={fetchTasks} />
        </Container>
      </Box>
    </>
  );
};
