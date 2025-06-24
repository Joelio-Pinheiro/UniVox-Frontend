import { Snackbar } from "@mui/material";
export function LoginError({ open, onCloseFn }) {
  return (
    <Snackbar
      open={open}
      onClose={onCloseFn}
      autoHideDuration={5000}
      message="Nome de usuário ou senha errado(s)"
    />
  );
}
