import { Snackbar } from "@mui/material";
export function CustomSnackbar({open, onCloseFn, message}) {
  return (
    <Snackbar
      open={open}
      onClose={onCloseFn}
      autoHideDuration={5000}
      message={message}
    />
  );
}
