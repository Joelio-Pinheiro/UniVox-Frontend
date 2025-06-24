import { Button } from "@mui/material";

export function LoginConfirmButton({ onClick }) {
  return (
    <div className="relative top-24">
      <Button
        size="large"
        sx={{
          padding: "12px 60px",
          backgroundColor: "#106FE2",
        }}
        variant="contained"
        onClick={onClick}
      >
        ENTRAR
      </Button>
    </div>
  );
}
