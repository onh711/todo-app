import React from "react";
import { Calender } from "./Calender";
import { useEffect, useState } from "react";
import axios from "axios";
import { BabyActionCreate } from "./BabyActionCreate";
import Box from "@mui/material/Box";
import { TaskTable } from "./TaskTable";

export const DashBoard = () => {
  const [actions, setActions] = useState([]);
  const [tasks, setTasks] = useState([]);

  const featchActions = async () => {
    const API_URL = "http://localhost/api/dashbord";
    const res = await axios.get(API_URL);
    try {
      setActions(res.data.baby_actions);
    } catch (e) {
      return e;
    }
  };

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
    featchActions();
    featchTasks();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", gap: "0" }}>
        <Calender actions={actions} fetch={featchActions} />
        <Box sx={{ flexGrow: 1 }}>
          <BabyActionCreate fetch={featchActions} />
          <TaskTable tasks={tasks} onChange={featchTasks} />
        </Box>
      </Box>
    </>
  );
};
