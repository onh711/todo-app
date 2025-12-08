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

const babyIconStyle = {
  transition: "0.3s ease",
  "&:hover": {
    transform: "translateY(-7px)",
  },
};

export const BabyActionCreate = ({ fetch }) => {
  const date = dayjs();
  const nowFormat = date.format("YYYY-MM-DD HH:mm:ss"); //フォーマット済みの現在時刻
  const fiveMinLater = date.add(5, "m");
  const fiveMinFormat = fiveMinLater.format("YYYY-MM-DD HH:mm:ss"); //フォーマット済みの5分後の時刻

  const babyActionCreate = (actionNum) => {
    return {
      // baby_id: 1,
      action: actionNum,
      cry: 0,
      start_date: nowFormat,
      end_date: fiveMinFormat,
    };
  };

  const fetchAction = async (actionNum) => {
    const API_URL = "http://localhost/api/dashboard";
    try {
      await axios.post(API_URL, babyActionCreate(actionNum));
      fetch();
    } catch (e) {
      console.error(e);
    }
  };

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
          "@media screen and (max-width:600px)": {
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
          <Box sx={babyIconStyle}>
            <IconContext.Provider value={{ color: "#00000099", size: "40px" }}>
              <Tooltip title="寝る">
                <GiNightSleep onClick={() => fetchAction(1)} />
              </Tooltip>
            </IconContext.Provider>
          </Box>

          <Box sx={babyIconStyle}>
            <IconContext.Provider value={{ color: "#00000099", size: "40px" }}>
              <Tooltip title="授乳">
                <GiBabyBottle onClick={() => fetchAction(2)} />
              </Tooltip>
            </IconContext.Provider>
          </Box>

          <Box sx={babyIconStyle}>
            <IconContext.Provider value={{ color: "#00000099", size: "40px" }}>
              <Tooltip title="ご飯">
                <FaUtensilSpoon onClick={() => fetchAction(3)} />
              </Tooltip>
            </IconContext.Provider>
          </Box>

          <Box sx={babyIconStyle}>
            <IconContext.Provider value={{ color: "#00000099", size: "40px" }}>
              <Tooltip title="うんち">
                <FaPoop onClick={() => fetchAction(4)} />
              </Tooltip>
            </IconContext.Provider>
          </Box>

          <Box sx={babyIconStyle}>
            <IconContext.Provider value={{ color: "#00000099", size: "40px" }}>
              <Tooltip title="おしっこ">
                <IoIosWater onClick={() => fetchAction(5)} />
              </Tooltip>
            </IconContext.Provider>
          </Box>

          <Box sx={babyIconStyle}>
            <IconContext.Provider value={{ color: "#00000099", size: "40px" }}>
              <Tooltip title="うんち/おしっこ">
                <FaBaby onClick={() => fetchAction(6)} />
              </Tooltip>
            </IconContext.Provider>
          </Box>
        </Box>
      </Box>
    </>
  );
};
