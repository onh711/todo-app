import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { CustomButton } from "./CustomButton";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import InputAdornment from "@mui/material/InputAdornment";
import { GiNightSleep } from "react-icons/gi";
import { GiBabyBottle } from "react-icons/gi";
import { FaUtensilSpoon } from "react-icons/fa";
import { FaPoop } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { FaBaby } from "react-icons/fa";
dayjs.locale(ja);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  width: "50%",
  height: "65%",
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

export const BabyActionEditModal = ({
  showFlag,
  events,
  onCloseEditModal,
  fetch,
}) => {
  const ACTION_ID = [
    { id: 1, label: "寝る", icon: <GiNightSleep /> },
    { id: 2, label: "授乳", icon: <GiBabyBottle /> },
    { id: 3, label: "ご飯", icon: <FaUtensilSpoon /> },
    { id: 4, label: "うんち", icon: <FaPoop /> },
    { id: 5, label: "おしっこ", icon: <IoIosWater /> },
    { id: 6, label: "うんち/おしっこ", icon: <FaBaby /> },
  ];

  const findId = (label) => {
    //labelを渡してリスト内のlabelのIDを返す関数
    const found = ACTION_ID.find((id) => id.label === label);
    return found ? found.id : "";
  };

  const handleClose = () => onCloseEditModal();

  useEffect(() => {
    setInputActions({
      ...inputActions,
      baby_id: events.id,
      action: findId(events.title),
      cry: events.cry,
      start_date: dayjs(events.start).format("YYYY-MM-DD HH:mm"),
      end_date: dayjs(events.end).format("YYYY-MM-DD HH:mm"),
      milk_amount: events.milk_amount,
      memo: events.description,
    });
  }, [showFlag]);

  const [inputActions, setInputActions] = useState({
    baby_id: events.id,
    action: findId(events.title),
    cry: events.cry,
    start_date: dayjs(events.start).format("YYYY-MM-DD HH:mm"),
    end_date: dayjs(events.end).format("YYYY-MM-DD HH:mm"),
    milk_amount: events.milk_amount,
    memo: events.description,
  });

  const editAction = async (e) => {
    e.preventDefault();
    const API_URL = `http://localhost/api/dashboard/${events.id}`;
    try {
      await axios.put(API_URL, inputActions);
      handleClose();
      fetch();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAction = async () => {
    if (window.confirm("本当に削除しますか？")) {
      try {
        const API_URL = `http://localhost/api/dashboard/${events.id}`;
        await axios.delete(API_URL);
        handleClose();
        fetch(); //タスクリストの更新関数
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <Modal
        open={showFlag}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ margin: "5px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            編集
          </Typography>
          <Box component="form" onSubmit={editAction}>
            <Select
              sx={TextFieldStyle}
              value={inputActions.action}
              onChange={(e) =>
                setInputActions({ ...inputActions, action: e.target.value })
              }
            >
              {ACTION_ID.map((action) => (
                <MenuItem key={action.id} value={action.id}>
                  {action.icon}
                  {action.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              type={"datetime-local"}
              label={"開始時刻"}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={TextFieldStyle}
              value={inputActions.start_date}
              onChange={(e) =>
                setInputActions({ ...inputActions, start_date: e.target.value })
              }
            />
            <TextField
              type={"datetime-local"}
              label={"終了時刻"}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={TextFieldStyle}
              value={inputActions.end_date}
              onChange={(e) =>
                setInputActions({ ...inputActions, end_date: e.target.value })
              }
            />
            <TextField
              label={"メモ"}
              sx={TextFieldStyle}
              value={inputActions.memo ? inputActions.memo : ""}
              onChange={(e) =>
                setInputActions({
                  ...inputActions,
                  memo: e.target.value,
                })
              }
            />
            {inputActions.action === 2 ? (
              <TextField
                type="number"
                label={"飲んだ量"}
                sx={TextFieldStyle}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    min: 0,
                    max: 300,
                    endAdornment: (
                      <InputAdornment position="end">ml</InputAdornment>
                    ),
                  },
                }}
                value={inputActions.milk_amount}
                onChange={(e) =>
                  setInputActions({
                    ...inputActions,
                    milk_amount: e.target.value,
                  })
                }
              />
            ) : (
              ""
            )}
            <Box sx={{ justifyContent: "center" }}>
              泣いてた？
              <Checkbox
                checked={Boolean(inputActions.cry)}
                onChange={(e) =>
                  setInputActions({
                    ...inputActions,
                    cry: e.target.checked,
                  })
                }
              />
              <Box>
                <CustomButton detail={{ text: "登録", bgcolor: "#1976d2" }} />
                <CustomButton
                  onClick={deleteAction}
                  detail={{ text: "削除", bgcolor: "#595c5fff" }}
                />
                <CustomButton
                  onClick={handleClose}
                  detail={{ text: "キャンセル", bgcolor: "#c55858ff" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
