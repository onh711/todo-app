import React, { useEffect, useState } from "react";
import { Edit } from "./Edit";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

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
      <Stack direction="row" spacing={2}>
        <p>
          検索：
          <input type="text" onChange={(e) => setSearchWord(e.target.value)} />
        </p>
        並べ替え：
        <Select
          value={taskSorts}
          onChange={(e) => setTaskSorts(e.target.value)}
        >
          <MenuItem value="start_asc">開始日昇順</MenuItem>
          <MenuItem value="start_desc">開始日降順</MenuItem>
          <MenuItem value="due_asc">期限日昇順</MenuItem>
          <MenuItem value="due_desc">期限日降順</MenuItem>
          <MenuItem value="status_asc">状態昇順</MenuItem>
          <MenuItem value="status_desc">状態降順</MenuItem>
        </Select>
        フィルター：
        <Select
          value={taskFilters}
          onChange={(e) => setTaskFilters(e.target.value)}
        >
          <MenuItem value="all">すべてのタスク</MenuItem>
          <MenuItem value="checked">完了したタスク</MenuItem>
          <MenuItem value="unchecked">現在の（未完了の）タスク</MenuItem>
          <MenuItem value="expired">期限切れのタスク</MenuItem>
          {/* <MenuItem value="removed">削除済みのタスク</MenuItem> */}
        </Select>
      </Stack>
      <div style={{ display: "flex" }}></div>
      <thead>
        <tr>
          <th>タスク名</th>
          <th>登録日</th>
          <th>期限</th>
          <th>状態</th>
        </tr>
      </thead>
      {taskSortingResults.map((task) => (
        <div
          key={task.id}
          style={{
            borderRadius: "10px",
            border: "solid, thin",
            margin: "20px",
            display: "flex",
          }}
        >
          <span style={{ margin: "20px" }}>{task.title}</span>
          <span style={{ margin: "20px" }}>{task.start_date}</span>
          <span style={{ margin: "20px" }}>
            {task.due_date == null ? "--" : task.due_date}
          </span>
          <span style={{ margin: "20px" }}>{task.status_text}</span>
          <Edit task={task} onChange={onChange} />
          <button onClick={() => deleteTask(task.id)}>削除</button>
        </div>
      ))}
    </>
  );
};
