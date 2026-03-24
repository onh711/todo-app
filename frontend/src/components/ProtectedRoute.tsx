import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import type { AuthenticatedUser } from "../types/api";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  const checkAuth = async (): Promise<void> => {
    try {
      await axios.get("/sanctum/csrf-cookie");

      const res = await axios.get<AuthenticatedUser>("/user", {
        withCredentials: true,
      });
      setIsAuthenticated(Object.keys(res.data).length > 0);
    } catch (error) {
      console.error("認証エラー:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ローディング中
  if (isAuthenticated === null) {
    return (
      <Box sx={{ display: "flex" }}>
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
