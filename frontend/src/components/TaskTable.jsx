import React, { useEffect, useState } from 'react'
import { Edit } from './Edit';
import axios from "axios";

export const TaskTable = ({tasks,onChange}) => {

  const deleteTask = async (id) => {
    if(window.confirm("本当に削除しますか？")){
      try {
        const API_URL = `http://localhost/api/tasks/${id}`;
        await axios.delete(API_URL);
        onChange();//タスクリストの更新関数
      } catch (e) {
        console.error('タスク削除エラー:', e);
        throw e;
      }
    }
  }

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
               <span style={{margin:"20px"}}>{task.due_date  == null ? "--" : task.due_date}</span> 
               <span style={{margin:"20px"}}>{task.status}</span> 
               <Edit task={task} onChange={onChange}/>
               <button onClick={()=>deleteTask(task.id)}>削除</button>
        </div>)}
    </>
  )
}
