import React from 'react';
import Button from '@mui/material/Button';

const style = {
  margin: '10px',
  width: '150px',
};

export const CustomButton = ({ detail, onClick }) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      sx={{ margin: '10px', width: '150px', backgroundColor: detail.bgcolor }}
      variant="contained"
    >
      {detail.text}
    </Button>
  );
};
