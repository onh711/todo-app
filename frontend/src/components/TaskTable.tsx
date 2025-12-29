import React, { useEffect, useState } from "react";
import { Edit } from "./Edit";
import axios from "axios";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import dayjs from "dayjs";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import type { Task } from "../types/task";

type TaskTableProps = {
  tasks: Task[];
  onChange: () => Promise<void>;
};

export const TaskTable = ({ onChange, tasks }: TaskTableProps) => {
  const deleteTask = async (id: number) => {
    if (window.confirm("本当に削除しますか？")) {
      try {
        const API_URL = `http://localhost/api/tasks/${id}`;
        await axios.delete(API_URL);
        onChange(); //タスクリストの更新関数
      } catch (e) {
        console.error("タスク削除エラー:", e);
        throw e;
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "未着手":
        return "#C9E6EE";
      case "進行中":
        return "#FFD4B8";
      case "完了":
        return "#A8E6CF";
      case "期限切れ":
        return "#FF667D";
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table aria-label="task table">
          <TableHead>
            <TableRow>
              <TableCell>タスク名</TableCell>
              <TableCell align="center">開始日</TableCell>
              <TableCell align="center">期日</TableCell>
              <TableCell align="center">状態</TableCell>
              <TableCell align="center">編集/削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell component="th" scope="row">
                  {task.title}
                </TableCell>
                <TableCell align="center">
                  {dayjs(task.start_date).format("YYYY年MM月DD日 HH:mm")}
                </TableCell>
                {/* {dayjs() >= dayjs(task.due_date) ? ( */}
                {dayjs().isSame(task.due_date, "day") ? (
                  <TableCell sx={{ color: "red" }} align="center">
                    {dayjs(task.due_date).format("YYYY年MM月DD日 HH:mm")}
                  </TableCell>
                ) : (
                  <TableCell align="center">
                    {dayjs(task.due_date).format("YYYY年MM月DD日 HH:mm")}
                  </TableCell>
                )}
                <TableCell align="center">
                  <Box
                    sx={{
                      width: "100%",
                      background: getStatusColor(task.status_text),
                      color: "#333333",
                      borderRadius: "20px",
                      boxShadow: "1",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                    }}
                  >
                    {task.status_text}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Edit task={task} onChange={onChange} />
                  <Tooltip title="削除">
                    <DeleteOutlineSharpIcon
                      sx={{
                        fontSize: 30,
                        transition: "0.5s",
                        "&:hover": {
                          color: "#ba000d",
                        },
                      }}
                      onClick={() => deleteTask(task.id)}
                    >
                      削除
                    </DeleteOutlineSharpIcon>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
