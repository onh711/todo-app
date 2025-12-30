import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { CustomButton } from "./CustomButton";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
});

const LoginCard = styled("div")({
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
});

type UserInfo = {
  name: string;
  mail_address: string;
  password: string;
  baby_name: string;
};

export const Register = () => {
  const [registInfo, setRegistInfo] = useState<UserInfo>({
    name: "",
    mail_address: "",
    password: "",
    baby_name: "",
  });

  const [errors, setErrors] = useState<Record<keyof UserInfo, string>>({
    name: "",
    mail_address: "",
    password: "",
    baby_name: "",
  });

  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  // バリデーション関数
  const validateForm = () => {
    const newErrors = {
      name: "",
      mail_address: "",
      password: "",
      baby_name: "",
    };
    let isValid = true;

    // 氏名のバリデーション
    if (!registInfo.name) {
      newErrors.name = "氏名を入力してください";
      isValid = false;
    } else if (registInfo.name.length > 40) {
      newErrors.name = "氏名は40文字以内で入力してください";
      isValid = false;
    }

    // メールアドレスのバリデーション
    if (!registInfo.mail_address) {
      newErrors.mail_address = "メールアドレスを入力してください";
      isValid = false;
    } else if (registInfo.mail_address.length > 255) {
      newErrors.mail_address = "メールアドレスは255文字以内で入力してください";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(registInfo.mail_address)
    ) {
      newErrors.mail_address = "メールアドレスの形式が正しくありません";
      isValid = false;
    }

    // パスワードのバリデーション
    if (!registInfo.password) {
      newErrors.password = "パスワードを入力してください";
      isValid = false;
    } else if (registInfo.password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください";
      isValid = false;
    } else if (registInfo.password.length > 255) {
      newErrors.password = "パスワードは255文字以内で入力してください";
      isValid = false;
    }

    // 子供の名前のバリデーション
    if (!registInfo.baby_name) {
      newErrors.baby_name = "子供の名前を入力してください";
      isValid = false;
    } else if (registInfo.baby_name.length > 40) {
      newErrors.baby_name = "子供の名前は40文字以内で入力してください";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange =
    (key: keyof UserInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setRegistInfo((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }
    try {
      await axios.get("/sanctum/csrf-cookie");

      await axios.post("/api/register", { ...registInfo });
      alert("会員登録を作成しました");
      navigate("/");
    } catch (e: any) {
      const mailError = e.response?.data?.errors?.mail_address?.[0];
      if (mailError?.includes("already")) {
        setServerError("このメールアドレスは既に登録されています");
      } else {
        setServerError("登録に失敗しました");
      }
    }
  };

  return (
    <>
      <Container>
        <LoginCard>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            新規登録
          </Typography>
          <form onSubmit={handleSubmit}>
            {serverError && (
              <Typography
                color="error"
                sx={{ mb: 2, textAlign: "center", fontSize: "0.9rem" }}
              >
                {serverError}
              </Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="氏名"
              onChange={handleInputChange("name")}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="メールアドレス"
              onChange={handleInputChange("mail_address")}
              error={!!errors.mail_address}
              helperText={errors.mail_address}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="パスワード"
              type="password"
              onChange={handleInputChange("password")}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="子供の名前"
              onChange={handleInputChange("baby_name")}
              error={!!errors.baby_name}
              helperText={errors.baby_name}
            />
            <Box sx={{ textAlign: "center" }}>
              <CustomButton detail={{ text: "登録", bgcolor: "#1976d2" }} />
              <Link to="/login">
                <CustomButton
                  detail={{ text: "キャンセル", bgcolor: "#c55858ff" }}
                />
              </Link>
            </Box>
          </form>
        </LoginCard>
      </Container>
    </>
  );
};
