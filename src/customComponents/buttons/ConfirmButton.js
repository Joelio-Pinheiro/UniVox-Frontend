import { Button } from "@mui/material";

export default function ConfirmButton({ text, onClick }) {
  return (
    <Button
      className="bg-[#106FE2] !py-3 !px-20"
      variant="contained"
      onClick={onClick}
    >
      {<p className="text-xl">{text}</p>}
    </Button>
  );
}
