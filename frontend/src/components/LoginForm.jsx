import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CustomButton } from './CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

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
  const [userInfo, setUserInfo] = useState({
    mail_address: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    mail_address: '',
    password: '',
  });
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  //バリデーション関数
  const validateForm = () => {
    const newErrors = {
      mail_address: '',
      password: '',
    };
    let isValid = true;

    //メールアドレスのバリデーション
    if (!userInfo.mail_address) {
      newErrors.mail_address = 'メールアドレスを入力してください';
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userInfo.mail_address)
    ) {
      newErrors.mail_address = 'メールアドレスの形式が正しくありません';
      isValid = false;
    }

    //パスワードのバリデーション
    if (!userInfo.password) {
      newErrors.password = 'パスワードを入力してください';
      isValid = false;
    } else if (userInfo.password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      await axios.get('/sanctum/csrf-cookie');

      const res = await axios.post('/login', {
        mail_address: userInfo.mail_address,
        password: userInfo.password,
      });
      console.log(res);

      navigate('/dashboard');
    } catch (e) {
      console.error(e);

      // サーバーエラーの処理
      if (e.response) {
        if (e.response.status === 401) {
          setServerError('メールアドレスまたはパスワードが正しくありません');
        } else {
          setServerError('ログインに失敗しました。もう一度お試しください');
        }
      }
    }
  };

  return (
    <>
      <Container>
        <LoginCard>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            ログイン
          </Typography>
          <form onSubmit={handleSubmit}>
            {serverError && (
              <Typography
                color="error"
                sx={{ mb: 2, textAlign: 'center', fontSize: '0.9rem' }}
              >
                {serverError}
              </Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="メールアドレス"
              onChange={(e) =>
                setUserInfo({ ...userInfo, mail_address: e.target.value })
              }
              error={!!errors.mail_address}
              helperText={errors.mail_address}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="パスワード"
              type="password"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              error={!!errors.password}
              helperText={errors.password}
            />
            <Box sx={{ textAlign: 'center' }}>
              <CustomButton detail={{ text: 'ログイン', bgcolor: '#1976d2' }} />
              <Link to="/register">
                <CustomButton
                  detail={{ text: '新規登録', bgcolor: '#1976d2' }}
                />
              </Link>
            </Box>
          </form>
        </LoginCard>
      </Container>
    </>
  );
};
