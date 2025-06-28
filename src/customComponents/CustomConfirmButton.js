import { Button } from "@mui/material";

export default function CustomConfirmButton({ text, onClick }) {
  return (
    <Button
      className="bg-[#106FE2]"
      variant="contained"
      size="large"
      sx={{
        padding: "12px 60px",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
