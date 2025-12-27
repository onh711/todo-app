import React from "react";
import { Calender } from "./Calender.jsx";
import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { BabyActionCreate } from "./BabyActionCreate.jsx";
import Box from "@mui/material/Box";
import { TaskTable } from "./TaskTable.jsx";
import { Create } from "./Create.jsx";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import isBetween from "dayjs/plugin/isBetween";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { TaskDrawer } from "./TaskDrawer.jsx";
dayjs.extend(isBetween);

export const DashBoard = () => {
  const [actions, setActions] = useState([]);
  const [tasks, setTasks] = useState([]);

  const featchActions = async () => {
    const res = await axios.get("/api/dashboard");
    try {
      setActions(res.data.baby_actions);
    } catch (e) {
      return e;
    }
  };

  const featchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data.tasks);
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

  const todayTaskSortingResults = todayTaskFilter.toSorted((a, b) => {
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
          height: "100%",
          background: "#F9F9F9 ",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          margin: "10px",
          overflow: "hidden",
        }}
      >
        <Box sx={{ margin: "10px" }}>
          <TaskDrawer tasks={todayTaskSortingResults} onAdd={featchTasks} />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 210px)",
            "& .fc .fc-toolbar-title": {
              fontSize: "1rem",
              fontWeight: "bold",
            },
            "& .fc .fc-button": {
              fontSize: "0.6rem",
            },

            "& .fc .fc-col-header-cell-cushion": {
              fontSize: "0.7rem",
            },
          }}
        >
          <Calender actions={actions} fetch={featchActions} />
        </Box>
        <BabyActionCreate fetch={featchActions} />
      </Box>

      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
          height: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            width: "50%",
            margin: "20px",
            padding: "20px",
            height: "95%",
            "& .fc .fc-toolbar-title": {
              fontSize: "1.3rem",
              fontWeight: "bold",
            },
            "& .fc .fc-col-header-cell-cushion": {
              fontSize: "0.7rem",
            },
            "& .fc .fc-button": {
              fontSize: "0.7rem",
            },
            "@media screen and (max-width:760px)": {
              "& .fc .fc-toolbar-title": {
                fontSize: "1rem",
                fontWeight: "bold",
              },
              "& .fc .fc-button": {
                fontSize: "0.6rem",
              },
            },
          }}
        >
          <Calender actions={actions} fetch={featchActions} />
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "calc(100vh - 180px)",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "20px", margin: "20px 0 0 0" }}>
            赤ちゃん記録
          </Typography>
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
          <Box
            sx={{
              height: "78%",
              overflowY: "auto",
              boxShadow: 3,
              marginRight: "10px",
            }}
          >
            <TaskTable tasks={todayTaskSortingResults} onChange={featchTasks} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
