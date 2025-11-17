import * as React from 'react';
import axios from "axios";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { CustomButton } from './CustomButton';
import Alert from '@mui/material/Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
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

export const Create = ({onAdd}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userId = 1; //ログイン機能作成後にログインユーザの情報を渡すように変更する

  const [inputData, setInputData] = useState({
        user_id:userId,
        title:"",
        start_date:"",
        due_date:"",
        content:""
  });

  const [errorMessages, setErrorMessages] = useState({
    title:"",
    start_date:"",
    due_date:"",
    content:""
  });

  const handleInput = (e) =>{
    setInputData({...inputData,title:e.target.value})
  }
  
  const addTask = async () =>{
      const API_URL = "http://localhost/api/tasks"
      console.log(inputData);
      try {
      await axios.post(API_URL, { ...inputData });
      onAdd();
      handleClose();
      } catch (e) {
      console.error(e);
      }
  }

 //タイトル名のバリデーション 
  const titleValidate = () =>{
    if(inputData.title.length >= 50 ){
      setErrorMessages({...errorMessages,title:"タスク名は50文字以上入力できません。"});
      console.log(errorMessages.title);
    }
    
    if(inputData.title.length === 0){
      setErrorMessages({...errorMessages,title:"タスク名を入力してください"});
      console.log(errorMessages.title);
    }

    if(inputData.title.length >= 1 && inputData.title.length <= 49){
      setErrorMessages({...errorMessages,title:""});
      console.log(errorMessages.title);
    }
  }

  //開始日時のバリデーション
  const startValidate = () =>{
    if(!inputData.start_date){
      setErrorMessages({...errorMessages,start_date:"開始日時を入力してください"});
      console.log(errorMessages.start_date);
    }
  }

  //開始日時のバリデーション
  const contentValidate = () =>{
    if(inputData.content.length >= 250){
      setErrorMessages({...errorMessages,content:"タスク詳細は250文字以上入力できません。"});
      console.log(errorMessages.content);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>新規タスク登録</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{margin:"10px" }} id="modal-modal-title" variant="h6" component="h2">
            新規タスク登録
          </Typography>
          <Box component="form">
            <TextField label={"タスク名"} error={errorMessages.title} helperText={errorMessages.title} sx={TextFieldStyle} onChange={(e) =>{setInputData({...inputData,title:e.target.value}),titleValidate()}}/>
            <TextField type={"datetime-local"} error={errorMessages.start_date} helperText={errorMessages.start_date} label={"開始日時"} InputLabelProps={{ shrink: true }} sx={TextFieldStyle} onChange={(e) =>{setInputData({...inputData,start_date:e.target.value}),startValidate()}}/>
            <TextField type={"datetime-local"} label={"完了期限"} InputLabelProps={{ shrink: true }}sx={TextFieldStyle} onChange={(e) =>setInputData({...inputData,due_date:e.target.value})}/>
            <TextField label={"タスク詳細"} error={errorMessages.content} helperText={errorMessages.content} sx={TextFieldStyle} onChange={(e) =>{setInputData({...inputData,content:e.target.value}),contentValidate()}}/>
            <Box sx={{justifyContent:'center'}}>
            <CustomButton onClick={addTask} detail={{text:'登録',bgcolor:'#1976d2',}} />
            <CustomButton  detail={{text:'キャンセル',bgcolor:'#c55858ff'}}/>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}