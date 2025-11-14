import * as React from 'react';
import axios from "axios";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { CustomButton } from './CustomButton';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '70%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

const TextFieldStyle = {
  textAlign:"center",
  margin:"15px",
  width: "80%",
  padding: "0px",
};

export const Edit = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userId = 1; //ログイン機能作成後にログインユーザの情報を渡すように変更する
  const status = 1;

  const [inputData, setInputData] = useState({
        user_id:userId,
        title:"",
        start_date:"",
        due_date:"",
        content:"",
        status:status
  })

  const editTask = async () =>{
    const API_URL = `http://localhost/api/tasks/${props.task.id}`;
      try {
      await axios.put(API_URL, inputData);
      } catch (e) {
      console.error(e);
      }
  }

  return (
    <div>
      <Button onClick={handleOpen}>編集</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: 'center',margin:"10px" }} id="modal-modal-title" variant="h6" component="h2">
            タスク編集
          </Typography>
          
          <Box component="form"  sx={{textAlign:"center"}}>
            <TextField label={"タスク名"} sx={TextFieldStyle} onChange={(e) =>setInputData({...inputData,title:e.target.value})}/>
            <TextField type={"datetime-local"} label={"開始日時"} sx={TextFieldStyle}  onChange={(e) =>setInputData({...inputData,start_date:e.target.value})}/>
            <TextField type={"datetime-local"} label={"完了期限"} sx={TextFieldStyle}  onChange={(e) =>setInputData({...inputData,due_date:e.target.value})}/>
            <TextField label={"タスク詳細"} sx={TextFieldStyle}  onChange={(e) =>setInputData({...inputData,content:e.target.value})}/>
            <TextField label={"状態"} sx={TextFieldStyle} onChange={(e) =>setInputData({...inputData,status:e.target.value})}/>
            
            <Box sx={{justifyContent:'center'}}>
            <CustomButton onClick={editTask} detail={{text:'編集',bgcolor:'#1976d2',}} />
            <CustomButton detail={{text:'キャンセル',bgcolor:'#c55858ff'}}/>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}