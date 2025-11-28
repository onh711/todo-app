import React from "react";
import { Calender } from "./Calender";
import { useEffect, useState } from "react";
import axios from "axios";
import { BabyActionCreate } from "./BabyActionCreate";
import Box from "@mui/material/Box";
import { TaskTable } from "./TaskTable";
import { Create } from "./Create";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import isBetween from "dayjs/plugin/isBetween";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
dayjs.extend(isBetween);

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

  const todayTaskFilter = tasks.filter((task) => {
    return (
      (task.status === 1 || task.status === 2) &&
      // !dayjs(task.due_date).isBefore(dayjs(), "day")
      dayjs().isBetween(task.start_date, task.due_date, "day", "[]")
    );
  });

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", background: "#F9F9F9 " }}>
        <Box sx={{ width: "50%", margin: "20px" }}>
          <Calender actions={actions} fetch={featchActions} />
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "95vh",
            textAlign: "center",
            overflow: "auto",
            margin: "20px",
          }}
        >
          <BabyActionCreate fetch={featchActions} />
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ justifyContent: "space-evenly" }}
          >
            <Box sx={{ width: "40%" }}>
              <Create onAdd={featchTasks} />
            </Box>
            <Button
              component={Link}
              to="/tasks"
              variant="contained"
              color="#00000099"
              sx={{ width: "40%" }}
            >
              タスク一覧
            </Button>
          </Stack>
          <Typography sx={{ fontSize: "20px", margin: "20px" }}>
            今日のタスク
          </Typography>
          <TaskTable sx={{}} tasks={todayTaskFilter} onChange={featchTasks} />
        </Box>
      </Box>
    </>
  );
};
