import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { Create } from "./Create";
import Typography from "@mui/material/Typography";
import { TaskTable } from "./TaskTable";

type Task = {
  id: number;
  title: string;
  start_date: string;
  due_date: string;
  status_text: string;
};

type TaskDrawerProps = {
  tasks: Task[];
  onAdd: () => Promise<void>;
};

export const TaskDrawer = ({ onAdd, tasks }: TaskDrawerProps) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ textAlign: "center" }} role="presentation">
      <Button
        variant="contained"
        sx={{
          fontSize: "15px",
          margin: "25px 20px 20px 20px",
          backgroundColor: "#ffffffff",
          color: "#000000DE",
        }}
        onClick={() => toggleDrawer(false)}
      >
        画面を閉じる
      </Button>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ justifyContent: "space-evenly" }}
      >
        <Box sx={{ width: "40%" }}>
          <Create onAdd={onAdd} />
        </Box>
        <Button
          component={Link}
          to="/tasks"
          variant="contained"
          sx={{
            width: "40%",
            backgroundColor: "#ffffffff",
            color: "#000000DE",
          }}
        >
          タスク一覧
        </Button>
      </Stack>
      <Typography sx={{ fontSize: "20px", margin: "20px" }}>
        今日のタスク
      </Typography>
      <TaskTable tasks={tasks} onChange={onAdd} />
    </Box>
  );

  return (
    <>
      <Button
        variant="contained"
        sx={{
          fontSize: "15px",
          backgroundColor: "#ffffffff",
          color: "#000000DE",
        }}
        onClick={() => toggleDrawer(true)}
      >
        今日のタスク一覧
      </Button>
      <Drawer open={open} anchor={"right"}>
        {DrawerList}
      </Drawer>
    </>
  );
};
