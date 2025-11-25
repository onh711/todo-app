import React, { useEffect, useState } from "react";
import { Edit } from "./Edit";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const TaskTable = ({ tasks, onChange }) => {
  const [searchWord, setSearchWord] = useState("");
  const [filterWords, setFilterWords] = useState("");
  const [taskFilters, setTaskFilters] = useState("all");

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
  // const statusFilter =
  //   filterStatus === ""
  //     ? tasks
  //     : tasks.filter((task) => task.status === filterStatus);
  const filters = tasks.filter((task) => {
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

  // const FILTERS = [
  //   { value: 1, label: "" },
  //   { value: 2, label: "未着手" },
  //   { value: 3, label: "進行中" },
  //   { value: 4, label: "完了" },
  //   { value: 5, label: "期限切れ" },
  // ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <p>
          検索：
          <input type="text" onChange={(e) => setSearchWord(e.target.value)} />
        </p>
        <p>
          並べ替え：
          <input type="text" />
        </p>
        フィルター：
        <Select
          value={taskFilters}
          onChange={(e) => setTaskFilters(e.target.value)}
        >
          {/*           {/* <MenuItem value={1}>未着手</MenuItem>
          <MenuItem value={2}>進行中</MenuItem>
          <MenuItem value={3}>完了</MenuItem>
          <MenuItem value={4}>期限切れ</MenuItem> */}
          <MenuItem value="all">すべてのタスク</MenuItem>
          <MenuItem value="checked">完了したタスク</MenuItem>
          <MenuItem value="unchecked">現在の（未完了の）タスク</MenuItem>
          <MenuItem value="expired">期限切れのタスク</MenuItem>
          {/* <MenuItem value="removed">削除済みのタスク</MenuItem> */}
        </Select>
      </div>
      <thead>
        <tr>
          <th>タスク名</th>
          <th>登録日</th>
          <th>期限</th>
          <th>状態</th>
        </tr>
      </thead>
      {filters.map((task) => (
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
