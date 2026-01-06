import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { CustomButton } from "./CustomButton";
import Checkbox from "@mui/material/Checkbox";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
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

type BabyActionCreateModalProps = {
  showFlag: boolean;
  fetch: () => Promise<void>;
  clickDate: string;
  onCloseCreateModal: () => void;
};

type InputActions = {
  action: number;
  cry: number;
  start_date: string;
  end_date: string;
  milk_amount: string;
  memo: string;
};

export const BabyActionCreateModal = ({
  showFlag,
  fetch,
  clickDate,
  onCloseCreateModal,
}: BabyActionCreateModalProps) => {
  const ACTION_ID = [
    { id: 1, label: "寝る", icon: <GiNightSleep /> },
    { id: 2, label: "授乳", icon: <GiBabyBottle /> },
    { id: 3, label: "ご飯", icon: <FaUtensilSpoon /> },
    { id: 4, label: "うんち", icon: <FaPoop /> },
    { id: 5, label: "おしっこ", icon: <IoIosWater /> },
    { id: 6, label: "うんち/おしっこ", icon: <FaBaby /> },
  ];

  const handleClose = () => onCloseCreateModal();

  const [inputActions, setInputActions] = useState<InputActions>({
    action: 1,
    cry: 0,
    start_date: dayjs(clickDate).format("YYYY-MM-DD HH:mm"),
    end_date: dayjs(clickDate).add(5, "m").format("YYYY-MM-DD HH:mm"),
    milk_amount: "",
    memo: "",
  });

  useEffect(() => {
    setInputActions({
      ...inputActions,
      start_date: dayjs(clickDate).format("YYYY-MM-DD HH:mm"),
      end_date: dayjs(clickDate).add(5, "m").format("YYYY-MM-DD HH:mm"),
    });
  }, [showFlag]);

  const createAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const API_URL = `http://localhost/api/dashboard`;
    try {
      await axios.post(API_URL, inputActions);
      handleClose();
      fetch();
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange =
    (key: keyof InputActions) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<number>
    ) => {
      setInputActions((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
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
            新規赤ちゃん記録
          </Typography>
          <Box component="form" onSubmit={createAction}>
            <Select
              sx={TextFieldStyle}
              value={inputActions.action}
              onChange={handleInputChange("action")}
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
              onChange={handleInputChange("start_date")}
            />
            <TextField
              type={"datetime-local"}
              label={"終了時刻"}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={TextFieldStyle}
              value={inputActions.end_date}
              onChange={handleInputChange("end_date")}
            />
            <TextField
              label={"メモ"}
              sx={TextFieldStyle}
              value={inputActions.memo ? inputActions.memo : ""}
              onChange={handleInputChange("memo")}
            />
            {inputActions.action === 2 ? (
              <TextField
                type="number"
                label={"飲んだ量"}
                sx={TextFieldStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">ml</InputAdornment>
                  ),
                }}
                slotProps={{
                  inputLabel: { shrink: true },
                  htmlInput: {
                    min: 0,
                    max: 300,
                  },
                }}
                value={inputActions.milk_amount}
                onChange={handleInputChange("milk_amount")}
              />
            ) : (
              ""
            )}
            <Box sx={{ justifyContent: "center" }}>
              泣いてた？
              <Checkbox
                checked={Boolean(inputActions.cry)}
                onChange={(e) =>
                  setInputActions((prev) => ({
                    ...prev,
                    cry: e.target.checked ? 1 : 0,
                  }))
                }
              />
              <Box>
                <CustomButton detail={{ text: "登録", bgcolor: "#1976d2" }} />
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
