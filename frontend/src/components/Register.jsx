import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { CustomButton } from './CustomButton'
import Button from '@mui/material/Button';

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

    // useEffect(() => {
    //   (async () => {
    //     try {
    //       const API_URL = "http://localhost/api/register"
    //       const res = await axios.get(API_URL);
    //       setTasks(res.data.tasks);
    //     } catch (e) {
    //         return e;
    //     }
    //     })();
    // }, []);

 

export const Register = () => {

  const [registInfo,setRegistInfo] = useState({
    name:"",
    mail_address:"",
    password:"",
    baby_name:""
  })

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const API_URL = "http://localhost/api/register"
    try {
      await axios.post(API_URL, { ...registInfo });
      console.log(Response.data);
    } catch (e) {
     console.log(Response.data);
    }
  }
    
  return (
    <>
     <Container>
      <LoginCard>
        <Typography variant="h5" gutterBottom sx={{textAlign:'center'}}>
          新規登録
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField variant="outlined" margin="normal" fullWidth label="氏名" onChange={(e) =>setRegistInfo({...registInfo,name:e.target.value})}/>
        <TextField variant="outlined" margin="normal" fullWidth label="メールアドレス"  onChange={(e) =>setRegistInfo({...registInfo,mail_address:e.target.value})}/>
        <TextField variant="outlined" margin="normal" fullWidth label="パスワード" type="password"  onChange={(e) =>setRegistInfo({...registInfo,password:e.target.value})}/>
        <TextField variant="outlined" margin="normal" fullWidth label="子供の名前"  onChange={(e) =>setRegistInfo({...registInfo,baby_name:e.target.value})}/>
        <Box sx={{textAlign:'center'}}>
            <CustomButton detail={{text:'登録',bgcolor:'#1976d2',}} />
            <CustomButton detail={{text:'キャンセル',bgcolor:'#c55858ff'}}/>
        </Box>
        </form>
      </LoginCard>
    </Container>
    </>
  )
}
