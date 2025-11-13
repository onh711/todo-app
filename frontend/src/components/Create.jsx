import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { bgcolor, borderRadius, padding, textAlign } from '@mui/system';
import { CustomButton } from './CustomButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '60%',
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

export const Create = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Typography sx={{ textAlign: 'center',margin:"20px" }} id="modal-modal-title" variant="h6" component="h2">
            新規タスク登録
          </Typography>
          <Box component="form" onSubmit={""} sx={{textAlign:"center"}}>
            <TextField label={"タスク名"} sx={TextFieldStyle}/>
            <TextField label={"開始日時"} sx={TextFieldStyle}/>
            <TextField label={"完了期限"} sx={TextFieldStyle}/>
            <TextField label={"タスク詳細"} sx={TextFieldStyle}/>
            <Box>
            <CustomButton detail={{text:'登録',bgcolor:'#1976d2'}}/>
            <CustomButton detail={{text:'キャンセル',bgcolor:'#c55858ff'}}/>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}