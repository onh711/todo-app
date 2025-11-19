import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

export const  Header = () => {

  const logout = async(e)=>{
    e.preventDefault();
    const API_URL = "http://localhost/api/logout"
    const res = await axios.post(API_URL);
    try {
      console.log(res.data);
      alert("ログアウトしました")
      navigate('/login');
    } catch (e) {
      alert("ログアウトに失敗しました")
      console.log(res.data);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo
          </Typography>
          <Button onClick={logout} color="inherit">ログアウト</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}