import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { CustomButton } from "./CustomButton";
import MenuItem from "@mui/material/MenuItem";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "50%",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const TextFieldStyle = {
  textAlign: "center",
  margin: "15px",
  width: "80%",
  padding: "0px",
};

export const Edit = ({ task, onChange }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userId = 1; //ログイン機能作成後にログインユーザの情報を渡すように変更する
  const status = 1;

  const [inputData, setInputData] = useState({
    user_id: userId,
    title: task.title,
    start_date: task.start_date,
    due_date: task.due_date,
    content: task.content,
    status: task.status,
  });

  const selectStatus = [
    { label: "未着手", value: 1 },
    { label: "進行中", value: 2 },
    { label: "完了", value: 3 },
    { label: "期限切れ", value: 4 },
  ];

  const editTask = async (e) => {
    e.preventDefault();
    const API_URL = `http://localhost/api/tasks/${task.id}`;
    try {
      await axios.put(API_URL, inputData);
      onChange(); //タスクリストの更新関数
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Tooltip title="編集">
        <EditOutlinedIcon
          sx={{
            fontSize: 30,
            transition: "0.5s",
            "&:hover": {
              color: "#00bfa5",
            },
          }}
          onClick={handleOpen}
        >
          編集
        </EditOutlinedIcon>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ textAlign: "center", margin: "10px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            タスク編集
          </Typography>

          <Box
            component="form"
            onSubmit={editTask}
            sx={{ textAlign: "center" }}
          >
            <TextField
              label={"タスク名"}
              sx={TextFieldStyle}
              value={inputData.title}
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
            />
            <TextField
              type={"datetime-local"}
              label={"開始日時"}
              value={inputData.start_date}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={TextFieldStyle}
              onChange={(e) =>
                setInputData({ ...inputData, start_date: e.target.value })
              }
            />
            <TextField
              type={"datetime-local"}
              label={"完了期限"}
              value={inputData.due_date}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={TextFieldStyle}
              onChange={(e) =>
                setInputData({ ...inputData, due_date: e.target.value })
              }
            />
            <TextField
              label={"タスク詳細"}
              sx={TextFieldStyle}
              value={inputData.content}
              onChange={(e) =>
                setInputData({ ...inputData, content: e.target.value })
              }
            />
            <TextField
              label={"状態"}
              select
              sx={TextFieldStyle}
              value={inputData.status}
              onChange={(e) =>
                setInputData({ ...inputData, status: e.target.value })
              }
            >
              {selectStatus.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ justifyContent: "center" }}>
              <CustomButton detail={{ text: "編集", bgcolor: "#1976d2" }} />
              <CustomButton
                detail={{ text: "キャンセル", bgcolor: "#c55858ff" }}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
