import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

export const Header = () => {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/logout',
        {},
        {
          withCredentials: true,
        }
      );
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
            <Typography component="div">ようこそ〇〇さん</Typography>
            <Button component={Link} to="/dashboard" color="inherit">
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
