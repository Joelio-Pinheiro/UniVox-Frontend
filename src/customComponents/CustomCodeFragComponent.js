import { TextField } from "@mui/material";

export default function CustomCodeFragComponent({ name, value, onChangeFn }) {
  return (
    <TextField
      className="relative w-1/4 h-full sm:w-1/4 md:w-1/6 lg:w-1/4"
      variant="outlined"
      name={name}
      value={value}
      onChange={onChangeFn}
    />
  );
}
