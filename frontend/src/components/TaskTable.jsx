import React, { useEffect, useState } from "react";
import { Edit } from "./Edit";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import Tooltip from "@mui/material/Tooltip";

export const TaskTable = ({ tasks, onChange }) => {
  const [searchWord, setSearchWord] = useState("");
  const [taskFilters, setTaskFilters] = useState("all");
  const [taskSorts, setTaskSorts] = useState("start_asc");

  const deleteTask = async (id) => {
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

  //ワード検索機能
  const wordFilter =
    searchWord === ""
      ? tasks
      : tasks.filter((task) => task.title.includes(searchWord));

  //フィルター機能
  const filters = wordFilter.filter((task) => {
    //ワード検索機能でフィルタリングした配列(wordFilter)を利用
    switch (taskFilters) {
      case "all":
        return task;
      case "checked":
        return task.status === 3;
      case "unchecked":
        return task.status != 3 && task.status != 4;
      case "expired":
        return task.status === 4;
    }
  });
  //ソート機能
  const taskSortingResults = filters.toSorted((a, b) => {
    switch (taskSorts) {
      case "start_asc":
        return (
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
      case "start_desc":
        return (
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );
      case "due_asc":
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      case "due_desc":
        return new Date(b.due_date).getTime() - new Date(a.due_date).getTime();
      case "status_asc":
        return a.status - b.status;
      case "status_desc":
        return b.status - a.status;
    }
  });

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "40px",
        }}
      >
        <TextField
          label="タスク名で検索"
          variant="outlined"
          onChange={(e) => setSearchWord(e.target.value)}
          sx={{ width: 1 / 4 }}
        />
        <FormControl sx={{ width: 1 / 4 }}>
          <InputLabel>並べ替え</InputLabel>
          <Select
            value={taskSorts}
            label="並べ替え"
            onChange={(e) => setTaskSorts(e.target.value)}
          >
            <MenuItem value="start_asc">開始日昇順</MenuItem>
            <MenuItem value="start_desc">開始日降順</MenuItem>
            <MenuItem value="due_asc">期限日昇順</MenuItem>
            <MenuItem value="due_desc">期限日降順</MenuItem>
            <MenuItem value="status_asc">状態昇順</MenuItem>
            <MenuItem value="status_desc">状態降順</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: 1 / 4 }}>
          <InputLabel>フィルター</InputLabel>
          <Select
            value={taskFilters}
            label="フィルター"
            onChange={(e) => setTaskFilters(e.target.value)}
          >
            <MenuItem value="all">すべてのタスク</MenuItem>
            <MenuItem value="checked">完了したタスク</MenuItem>
            <MenuItem value="unchecked">現在の（未完了の）タスク</MenuItem>
            <MenuItem value="expired">期限切れのタスク</MenuItem>
          </Select>
        </FormControl>
      </Container>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="task table">
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
            {taskSortingResults.map((task) => (
              <TableRow key={task.id}>
                <TableCell component="th" scope="row">
                  {task.title}
                </TableCell>

                <TableCell align="center">
                  {dayjs(task.start_date).format("YYYY年MM月DD HH:mm")}
                </TableCell>
                <TableCell align="center">
                  {dayjs(task.due_date).format("YYYY年MM月DD HH:mm")}
                </TableCell>
                <TableCell align="center">{task.status_text}</TableCell>
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
