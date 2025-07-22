import { TextField } from "@mui/material";

export default function ConfirmCodeInput({ name, value, onChangeFn }) {
  return (
    <TextField
      className="relative w-full h-full sm:w-1/2 md:w-1/2 lg:w-full"
      variant="outlined"
      name={name}
      value={value}
      onChange={onChangeFn}
    />
  );
}
