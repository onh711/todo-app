import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { CustomButton } from "./CustomButton.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
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

type CreateProps = {
  onAdd: () => Promise<void>;
};

type InputData = {
  title: string;
  start_date: string;
  due_date: string;
  content: string;
};

export const Create = ({ onAdd }: CreateProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputData, setInputData] = useState<InputData>({
    title: "",
    start_date: "",
    due_date: "",
    content: "",
  });

  const [errorMessages, setErrorMessages] = useState<
    Record<keyof InputData, string>
  >({
    title: "",
    start_date: "",
    due_date: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleValidate()) {
      return;
    }
    const API_URL = "http://localhost/api/tasks";
    try {
      await axios.post(API_URL, { ...inputData });
      onAdd();
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleValidate = () => {
    const errors: Record<keyof InputData, string> = {
      title: "",
      start_date: "",
      due_date: "",
      content: "",
    };
    let isValid = true;

    //タイトル名のバリデーション
    if (!inputData.title) {
      errors.title = "タスク名を入力してください";
      isValid = false;
    } else if (inputData.title.length >= 50) {
      errors.title = "タスク名は50文字以上入力できません。";
      isValid = false;
    }

    //開始日時のバリデーション
    if (!inputData.start_date) {
      errors.start_date = "開始日時を入力してください";
      isValid = false;
    }

    //完了期限のバリデーション
    if (!inputData.due_date) {
      errors.due_date = "完了期限を入力してください";
      isValid = false;
    }

    //タスク詳細のバリデーション
    if (inputData.content.length >= 250) {
      errors.content = "タスク詳細は250文字以上入力できません。";
      isValid = false;
    }
    setErrorMessages(errors);
    return isValid;
  };

  const handleInputChange =
    (key: keyof InputData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputData((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  // const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setInputData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  return (
    <Box>
      <Button
        sx={{ width: "100%", backgroundColor: "#fff", color: "#000000fd" }}
        variant="contained"
        onClick={handleOpen}
      >
        新規タスク登録
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ margin: "10px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            新規タスク登録
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label={"タスク名"}
              error={!!errorMessages.title}
              helperText={errorMessages.title}
              sx={TextFieldStyle}
              value={inputData.title}
              onChange={handleInputChange("title")}
            />
            <TextField
              type={"datetime-local"}
              error={!!errorMessages.start_date}
              helperText={errorMessages.start_date}
              label={"開始日時"}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={TextFieldStyle}
              value={inputData.start_date}
              onChange={handleInputChange("start_date")}
            />
            <TextField
              type={"datetime-local"}
              error={!!errorMessages.due_date}
              helperText={errorMessages.due_date}
              label={"完了期限"}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: {
                  min: inputData.start_date,
                },
              }}
              sx={TextFieldStyle}
              value={inputData.due_date}
              onChange={handleInputChange("due_date")}
            />
            <TextField
              label={"タスク詳細"}
              error={!!errorMessages.content}
              helperText={errorMessages.content}
              sx={TextFieldStyle}
              value={inputData.content}
              onChange={handleInputChange("content")}
            />
            <Box sx={{ justifyContent: "center", height: "100%" }}>
              <CustomButton detail={{ text: "登録", bgcolor: "#1976d2" }} />
              <CustomButton
                onClick={handleClose}
                detail={{ text: "キャンセル", bgcolor: "#c55858ff" }}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
