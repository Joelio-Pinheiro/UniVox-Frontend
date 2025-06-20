import { TextField } from "@mui/material";

export function TextInputContainer({ type, name, text, value, onChangeFn }) {
  return (
    <div className=" relative">
      <p className=" text-gray-500 font-semibold">{text}</p>
      <TextField
        name={name}
        sx={{ width: "240px" }}
        variant="outlined"
        value={value}
        onChange={onChangeFn}
      />
    </div>
  );
}
