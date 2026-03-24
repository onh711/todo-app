import type { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import { Box, styled } from "@mui/system";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
});

const Card = styled("div")({
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
});

type FormCardLayoutProps = {
  title: string;
  children: ReactNode;
};

export const FormCardLayout = ({ title, children }: FormCardLayoutProps) => {
  return (
    <Container>
      <Card>
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          {title}
        </Typography>
        <Box>{children}</Box>
      </Card>
    </Container>
  );
};

