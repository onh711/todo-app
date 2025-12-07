import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../api/axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = async () => {
    try {
      await axios.get('/sanctum/csrf-cookie');

      const res = await axios.get('/user', { withCredentials: true });
      if (res.data) {
        setIsAuthenticated(true);
        console.log(res.data);
      }
    } catch (error) {
      console.error('認証エラー:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ローディング中
  if (isAuthenticated === null) {
    return (
      <Box sx={{ display: 'flex' }}>
        <LinearProgress />
      </Box>
    );
  }

  // ログインしてなければログインページへリダイレクト
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 認証済みなら子要素を表示
  return children;
};
