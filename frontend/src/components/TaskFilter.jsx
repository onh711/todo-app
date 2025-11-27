import React, { useState } from "react";
import { TaskTable } from "./TaskTable";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const TaskFilter = ({ tasks, onChange }) => {
  const [searchWord, setSearchWord] = useState("");
  const [taskFilters, setTaskFilters] = useState("all");
  const [taskSorts, setTaskSorts] = useState("");
  console.log("dayjs()", dayjs());
  //   console.log(
  //     dayjs(new Date()).format("YYYY-MM-DD") <=
  //       dayjs({ ...tasks.due_date }).format("YYYY-MM-DD")
  //   );
  //   console.log("A", dayjs({ ...tasks.due_date }).format("YYYY-MM-DD"));
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
      case "today":
        return (
          (task.status === 1 || task.status === 2) &&
          // !dayjs(task.due_date).isBefore(dayjs(), "day")
          dayjs().isBetween(task.start_date, task.due_date, "day", "[]")
        );
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
          value={searchWord}
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
            <MenuItem value="today">今日のタスク</MenuItem>
            <MenuItem value="all">すべてのタスク</MenuItem>
            <MenuItem value="checked">完了したタスク</MenuItem>
            <MenuItem value="unchecked">現在の（未完了の）タスク</MenuItem>
            <MenuItem value="expired">期限切れのタスク</MenuItem>
          </Select>
        </FormControl>
      </Container>
      <TaskTable onChange={onChange} tasks={taskSortingResults} />
    </>
  );
};
