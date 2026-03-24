import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import type { ValidationErrorResponse } from "../types/api";
import type { Profile } from "../types/profile";
import { CustomButton } from "./CustomButton";
import { FormCardLayout } from "./shared/FormCardLayout";
import { ProfileFields } from "./shared/ProfileFields";

export const ProfileEdit = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Profile>({
    name: "",
    mail_address: "",
    baby_name: "",
  });
  const [errors, setErrors] = useState<Record<keyof Profile, string>>({
    name: "",
    mail_address: "",
    baby_name: "",
  });
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get<Profile>("/api/profile");
        setForm(res.data);
      } catch (error) {
        console.error("プロフィール取得エラー:", error);
      }
    };
    fetchProfile();
  }, []);

  const validate = () => {
    const nextErrors: Record<keyof Profile, string> = {
      name: "",
      mail_address: "",
      baby_name: "",
    };
    let valid = true;

    if (!form.name) {
      nextErrors.name = "氏名を入力してください";
      valid = false;
    } else if (form.name.length > 40) {
      nextErrors.name = "氏名は40文字以内で入力してください";
      valid = false;
    }

    if (!form.mail_address) {
      nextErrors.mail_address = "メールアドレスを入力してください";
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.mail_address)
    ) {
      nextErrors.mail_address = "メールアドレスの形式が正しくありません";
      valid = false;
    }

    if (!form.baby_name) {
      nextErrors.baby_name = "子供の名前を入力してください";
      valid = false;
    } else if (form.baby_name.length > 40) {
      nextErrors.baby_name = "子供の名前は40文字以内で入力してください";
      valid = false;
    }

    setErrors(nextErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) {
      return;
    }

    try {
      await axios.put("/api/profile", form);
      navigate("/mypage");
    } catch (error) {
      if (axios.isAxiosError<ValidationErrorResponse>(error)) {
        const mailError = error.response?.data?.errors?.mail_address?.[0];
        if (typeof mailError === "string") {
          setServerError("このメールアドレスは既に使用されています");
          return;
        }
      }
      setServerError("更新に失敗しました");
    }
  };

  const handleChange =
    (key: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  return (
    <FormCardLayout title="登録情報の変更">
      <Box component="form" onSubmit={handleSubmit}>
        {serverError && (
          <Typography color="error" sx={{ mb: 2, textAlign: "center", fontSize: "0.9rem" }}>
            {serverError}
          </Typography>
        )}
        <ProfileFields values={form} errors={errors} onChange={handleChange} />

        <Box sx={{ textAlign: "center" }}>
          <CustomButton type="submit" detail={{ text: "登録", bgcolor: "#1976d2" }} />
          <Link to="/mypage">
            <CustomButton
              type="button"
              detail={{ text: "キャンセル", bgcolor: "#c55858ff" }}
            />
          </Link>
        </Box>
      </Box>
    </FormCardLayout>
  );
};
