import { Snackbar } from "@mui/material";
export default function CustomSnackbar({ open, onCloseFn, message }) {
  return (
    <Snackbar
      open={open}
      onClose={onCloseFn}
      autoHideDuration={3000}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );
}
