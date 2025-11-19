import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system';
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { CustomButton } from './CustomButton'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
});

const LoginCard = styled('div')({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
});

export const LoginForm = () => {
  
  const [userInfo,setUserInfo] = useState({
    mail_address:"",
    password:""
  })
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const API_URL = "http://localhost/api/login"
    try {
      await axios.post(API_URL, { ...userInfo });
      console.log(Response.data);
      navigate('/tasks');
    } catch (e) {
     console.log(Response.data);
    }
  }

  return (
    <>
     <Container>
      <LoginCard>
        <Typography variant="h5" gutterBottom sx={{textAlign:'center'}}>
          ログイン
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField variant="outlined"
           margin="normal" 
           fullWidth label="ユーザー名" 
           onChange={(e) =>setUserInfo({...userInfo,mail_address:e.target.value})}
        />
        <TextField variant="outlined" 
          margin="normal" 
          fullWidth label="パスワード" 
          type="password" 
          onChange={(e) =>setUserInfo({...userInfo,password:e.target.value})}
        />
        <Box sx={{textAlign:'center'}}>
            <CustomButton detail={{text:'ログイン',bgcolor:'#1976d2',}} />
          <Link to="/register">
            <CustomButton detail={{text:'新規登録',bgcolor:'#1976d2'}}/>
          </Link>
        </Box>
        </form>
      </LoginCard>
    </Container>
    </>
  )
}
