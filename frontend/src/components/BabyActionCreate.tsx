import axios from "axios";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import Tooltip from "@mui/material/Tooltip";
import { GiNightSleep } from "react-icons/gi";
import { GiBabyBottle } from "react-icons/gi";
import { FaUtensilSpoon } from "react-icons/fa";
import { FaPoop } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { FaBaby } from "react-icons/fa";
import { IconContext } from "react-icons";
import Box from "@mui/material/Box";

dayjs.locale(ja);

type BabyActionCreateProp = {
  fetch: () => Promise<void>;
};

type IconItem = {
  id: number;
  label: string;
  icon: React.ReactElement;
};

const babyIconStyle = {
  transition: "0.3s ease",
  "&:hover": {
    transform: "translateY(-7px)",
  },
};

export const BabyActionCreate = ({ fetch }: BabyActionCreateProp) => {
  const date = dayjs();
  const nowFormat = date.format("YYYY-MM-DD HH:mm:ss"); //フォーマット済みの現在時刻
  const fiveMinLater = date.add(5, "m");
  const fiveMinFormat = fiveMinLater.format("YYYY-MM-DD HH:mm:ss"); //フォーマット済みの5分後の時刻

  const babyActionCreate = (actionNum: number) => {
    return {
      action: actionNum,
      cry: 0,
      start_date: nowFormat,
      end_date: fiveMinFormat,
    };
  };

  const fetchAction = async (actionNum: number) => {
    const API_URL = "http://localhost/api/dashboard";
    try {
      await axios.post(API_URL, babyActionCreate(actionNum));
      fetch();
    } catch (e) {
      console.error(e);
    }
  };

  const ACTION_ID: IconItem[] = [
    { id: 1, label: "寝る", icon: <GiNightSleep /> },
    { id: 2, label: "授乳", icon: <GiBabyBottle /> },
    { id: 3, label: "ご飯", icon: <FaUtensilSpoon /> },
    { id: 4, label: "うんち", icon: <FaPoop /> },
    { id: 5, label: "おしっこ", icon: <IoIosWater /> },
    { id: 6, label: "うんち/おしっこ", icon: <FaBaby /> },
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(246, 247, 248, 0.5)",
          height: "80px",
          width: "90%",
          margin: "10px auto 20px auto",
          borderRadius: 3,
          alignItems: "center",
          boxShadow: 3,

          "@media screen and (max-width:899px)": {
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            margin: "0 auto",
            width: "100%",
            borderRadius: 0,
            backgroundColor: "#F9F9F9",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            justifyContent: "space-evenly",
            display: "flex",
            alignItems: "center",
          }}
        >
          {ACTION_ID.map((action) => (
            <Box
              sx={babyIconStyle}
              key={action.id}
              onClick={() => fetchAction(action.id)}
            >
              <IconContext.Provider
                value={{ color: "#00000099", size: "40px" }}
              >
                <Tooltip title={action.label}>{action.icon}</Tooltip>
              </IconContext.Provider>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
