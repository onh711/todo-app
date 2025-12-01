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

export const TaskDrawer = ({ onAdd, tasks }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ textAlign: "center" }} role="presentation">
      <Button
        variant="contained"
        color="#00000099"
        sx={{ fontSize: "15px", margin: "25px 20px 20px 20px" }}
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
          color="#00000099"
          sx={{ width: "40%" }}
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
        sx={{ fontSize: "15px" }}
        color="#00000099"
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
