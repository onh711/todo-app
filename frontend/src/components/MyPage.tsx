import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import type { Profile } from "../types/profile";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "calc(100vh - 64px)",
  backgroundColor: "#f0f0f0",
});

const Card = styled("div")({
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "560px",
});

export const MyPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get<Profile>("/api/profile");
        setProfile(res.data);
      } catch (error) {
        console.error("プロフィール取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Container>
      <Card>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
          マイページ
        </Typography>

        {loading ? (
          <Typography sx={{ textAlign: "center" }}>読み込み中...</Typography>
        ) : (
          <Box sx={{ display: "grid", rowGap: 2 }}>
            <Box>
              <Typography sx={{ fontSize: 13, color: "#666" }}>氏名</Typography>
              <Typography>{profile?.name ?? "-"}</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 13, color: "#666" }}>
                メールアドレス
              </Typography>
              <Typography>{profile?.mail_address ?? "-"}</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 13, color: "#666" }}>
                子供の名前
              </Typography>
              <Typography>{profile?.baby_name ?? "-"}</Typography>
            </Box>

            <Button
              component={Link}
              to="/profile/edit"
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#1976d2" }}
            >
              登録情報を変更する
            </Button>
          </Box>
        )}
      </Card>
    </Container>
  );
};

