import React, { useEffect, useState } from 'react'
import axios from "axios";

export const TaskList = () => {

    const [tasks, setTasks] = useState([]);

    const url = "http://localhost/api/tasks"

    useEffect(() => {
      (async () => {
        try {
          const res = await axios.get(url);
          console.log(res.data.tasks);
          setTasks(res.data.tasks);
        } catch (e) {
            return e;
        }
    })();
}, []);

console.log('tasks',tasks);
  return (
    <>
    <div>
        <h1>タスク一覧a</h1>
        <button>新規作成</button>
            <div style={{display:"flex"}}>
                <p>検索：<input type="text" /></p> 
                <p>並べ替え：<input type="text" /></p> 
                <p>フィルター：<input type="text" /></p> 
            </div>
            <thead>
                <tr>
                    <th>タスク名</th>
                    <th>登録日</th>
                    <th>期限</th>
                    <th>状態</th>
                </tr>
            </thead>
            {tasks.map((task)=>
            <div key={task.id} style={{borderRadius:"10px",border:"solid, thin",margin:"20px"}}>
               <span style={{margin:"20px"}}>{task.title}</span>
               <span style={{margin:"20px"}}>{task.start_date}</span> 
               <span style={{margin:"20px"}}>{task.due_date  == null ? "--" : ""}</span> 
               <span style={{margin:"20px"}}>{task.status}</span> 
               <button>編集</button>
               <button>削除</button>
            </div>)}
    </div>
    </>
  )
}
