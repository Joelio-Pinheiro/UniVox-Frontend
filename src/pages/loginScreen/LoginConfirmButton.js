import { Button } from "@mui/material";

export function LoginConfirmButton({ email, password }) {
  return (
    <div className="relative top-24">
      <Button
        size="large"
        sx={{ padding: "15px 50px", alignSelf: "center" }}
        variant="contained"
      >
        ENTRAR
      </Button>
    </div>
  );
}
