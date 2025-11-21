import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { CustomButton } from './CustomButton';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";

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

export const CalenderModal  = ({showFlag,events}) => {
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    console.log(events.id)
    setInputActions({
      ...inputActions,
      baby_id:events.id,
      action:events.title,
      cry:0,
      start_date:events.start,
      end_date:events.end,
      milk_amount:0,
      memo:events.description
    })
  },[showFlag]);

  const [inputActions, setInputActions] = useState({
      baby_id:events.id,
      action:events.title,
      cry:0,
      start_date:events.start,
      end_date:events.end,
      milk_amount:0,
      memo:events.description
  });

  const editAction = async (e) =>{
    e.preventDefault();
  const API_URL = `http://localhost/api/dashbord/${events.id}`;
      try {
      await axios.put(API_URL, inputActions);
      } catch (e) {
      console.error(e);
      }
  }

  return (
    <>
      <Modal
        open={showFlag}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{margin:"5px" }} id="modal-modal-title" variant="h6" component="h2">
              編集
          </Typography>
          <Box component="form" onSubmit={editAction}>
             {/* <InputLabel id="demo-simple-select-label">タイトル</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={inputActions.action}
                  label="Age"
                  onChange={(e) =>setInputActions({...inputActions,action:e.target.value})}
                >
                  <MenuItem value={1}>寝る</MenuItem>
                  <MenuItem value={2}>授乳</MenuItem>
                  <MenuItem value={3}>ご飯</MenuItem>
                  <MenuItem value={4}>うんち</MenuItem>
                  <MenuItem value={5}>おしっこ</MenuItem>
                  <MenuItem value={6}>うんち/おしっこ</MenuItem>
                </Select> */}
            <TextField label={"タイトル"} 
              sx={TextFieldStyle} 
              name="title"
              value={inputActions.action} 
              onChange={(e) =>setInputActions({...inputActions,action:e.target.value})}
            />
            <TextField type={"datetime-local"} 
              label={"開始時刻"} InputLabelProps={{ shrink: true }} 
              sx={TextFieldStyle} 
              value={inputActions.start_date} 
              onChange={(e) =>setInputActions({...inputActions,start_date:e.target.value})}
            />
            <TextField type={"datetime-local"} 
              label={"終了時刻"} InputLabelProps={{ shrink: true }}
              sx={TextFieldStyle}
              value={inputActions.end_date} 
            />
            <TextField label={"メモ"} 
              sx={TextFieldStyle} 
              // value={events.description}
              onChange={(e) =>setInputActions({...inputActions,start_date:e.target.value})}
            />
            {events.title === "授乳" ?  
            <TextField label={"飲んだ量"} InputLabelProps={{ shrink: true }}sx={TextFieldStyle}/> 
            : 
            ""}
            <Box sx={{justifyContent:'center'}}>
            泣いてた？<Checkbox value={inputActions.cry}/>
            <Box>
            <CustomButton detail={{text:'登録',bgcolor:'#1976d2',}} />
            <CustomButton onClick={handleClose}detail={{text:'キャンセル',bgcolor:'#c55858ff'}}/>
            </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
