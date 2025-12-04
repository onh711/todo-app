import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

export const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    try {
      const API_URL = 'http://localhost/api/logout';
      await axios.post(API_URL, { withCredentials: true });

      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  const trigger = useScrollTrigger();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '64px' }}>
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
