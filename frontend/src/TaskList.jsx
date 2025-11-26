import React, { useEffect, useState } from "react";
import axios from "axios";
import { Create } from "./components/Create";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TaskTable } from "./components/TaskTable";
import Container from "@mui/material/Container";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const featchTasks = async () => {
    try {
      const API_URL = "http://localhost/api/tasks";
      const res = await axios.get(API_URL);
      setTasks(res.data.tasks);
      console.log(res.data.tasks);
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    featchTasks();
  }, []);

  return (
    <>
      <Box sx={{ margin: "0 auto", textAlign: "center" }}>
        <Container>
          <Typography variant="h1" fontSize={40} sx={{ padding: "35px" }}>
            タスク一覧
          </Typography>
          {/* <Create onAdd={featchTasks} /> */}
          <TaskTable tasks={tasks} onChange={featchTasks} />
        </Container>
      </Box>
    </>
  );
};
