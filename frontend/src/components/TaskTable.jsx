import React, { useEffect, useState } from 'react'
import { Edit } from './Edit';
import axios from "axios";

export const TaskTable = () => {

        const [tasks, setTasks] = useState([]);
        const API_URL = "http://localhost/api/tasks"
    
    useEffect(() => {
      (async () => {
        try {
          const res = await axios.get(API_URL);
          setTasks(res.data.tasks);
        } catch (e) {
            return e;
        }
    })();
}, []);

console.log(tasks)
  return (
    <>
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
            <div key={task.id} style={{borderRadius:"10px",border:"solid, thin",margin:"20px", display:"flex"}}>
               <span style={{margin:"20px"}}>{task.title}</span>
               <span style={{margin:"20px"}}>{task.start_date}</span> 
               <span style={{margin:"20px"}}>{task.due_date  == null ? "--" : ""}</span> 
               <span style={{margin:"20px"}}>{task.status}</span> 
               <Edit task={task} />
               <button >削除</button>
        </div>)}
    </>
  )
}
