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
import type { Task } from "../types/task";
dayjs.extend(isBetween);

type TaskFilterProps = {
  tasks: Task[];
  onChange: () => Promise<void>;
};
const SORT_OPTIONS = [
  { value: "start_asc", label: "開始日昇順" },
  { value: "start_desc", label: "開始日降順" },
  { value: "due_asc", label: "期限日昇順" },
  { value: "due_desc", label: "期限日降順" },
  { value: "status_asc", label: "状態昇順" },
  { value: "status_desc", label: "状態降順" },
] as const;

const FILTER_OPTIONS = [
  { value: "today", label: "今日のタスク" },
  { value: "all", label: "すべてのタスク" },
  { value: "checked", label: "完了したタスク" },
  { value: "unchecked", label: "現在の（未完了の）タスク" },
  { value: "expired", label: "期限切れのタスク" },
] as const;

export const TaskFilter = ({ tasks, onChange }: TaskFilterProps) => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [taskFilters, setTaskFilters] = useState<string>("all");
  const [taskSorts, setTaskSorts] = useState<string>("");

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
  const taskSortingResults = filters.toSorted((a: Task, b: Task): number => {
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
      default:
        return 0;
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
            {SORT_OPTIONS.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 1 / 4 }}>
          <InputLabel>フィルター</InputLabel>
          <Select
            value={taskFilters}
            label="フィルター"
            onChange={(e) => setTaskFilters(e.target.value)}
          >
            {FILTER_OPTIONS.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
      <TaskTable onChange={onChange} tasks={taskSortingResults} />
    </>
  );
};
