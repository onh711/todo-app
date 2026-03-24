import type { ReactNode } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

type InsightCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export const InsightCard = ({ title, subtitle, children }: InsightCardProps) => {
  return (
    <Paper
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 2,
          background: "linear-gradient(120deg, #f8fafc 0%, #eef2ff 100%)",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>{title}</Typography>
        {subtitle && (
          <Typography sx={{ fontSize: 13, color: "#475569", mt: 0.5 }}>{subtitle}</Typography>
        )}
      </Box>
      <Divider />
      <Box sx={{ p: 2.5 }}>{children}</Box>
    </Paper>
  );
};

