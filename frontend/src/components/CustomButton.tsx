import Button from "@mui/material/Button";

type Props = {
  detail: {
    text: string;
    bgcolor: string;
  };
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export const CustomButton = ({ detail, onClick, type = "button" }: Props) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      sx={{ margin: "10px", width: "150px", backgroundColor: detail.bgcolor }}
      variant="contained"
    >
      {detail.text}
    </Button>
  );
};
