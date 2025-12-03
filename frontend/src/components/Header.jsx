import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

export const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    const API_URL = "http://localhost/api/logout";
    const res = await axios.post(API_URL);
    try {
      alert("ログアウトしました");
      navigate("/login");
    } catch (e) {
      alert("ログアウトに失敗しました");
    }
  };

  const trigger = useScrollTrigger();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "64px" }}>
      <Slide in={!trigger}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BabyCalendar
            </Typography>
            <Button component={Link} to="/dashbord" color="inherit">
              ダッシュボード
            </Button>
            <Button component={Link} to="/tasks" color="inherit">
              タスク一覧
            </Button>
            <Button onClick={logout} color="inherit">
              ログアウト
            </Button>
          </Toolbar>
        </AppBar>
      </Slide>
    </Box>
  );
};
