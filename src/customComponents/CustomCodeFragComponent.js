import { TextField } from "@mui/material";

export default function CustomCodeFragComponent({ name, value, onChangeFn }) {
  return (
    <TextField
      className="w-14 h-14"
      variant="outlined"
      name={name}
      value={value}
      onChange={onChangeFn}
    />
  );
}
