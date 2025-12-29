import React from "react";
import Button from "@mui/material/Button";

const style = {
  margin: "10px",
  width: "150px",
};

type Props = {
  detail: {
    text: string;
    bgcolor: string;
  };
  onClick?: () => void;
};

export const CustomButton = ({ detail, onClick }: Props) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      sx={{ margin: "10px", width: "150px", backgroundColor: detail.bgcolor }}
      variant="contained"
    >
      {detail.text}
    </Button>
  );
};
