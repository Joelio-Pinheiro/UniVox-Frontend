import { InputAdornment, TextField } from "@mui/material";
import { IconSetter } from "../utils/iconSetter";
export function TextInputContainer({ name, text, value, onChangeFn }) {
  const icon = IconSetter(name);

  return (
    <div className=" relative">
      <p className=" text-gray-500 font-semibold">{text}</p>
      <TextField
        name={name}
        sx={{ width: "240px", marginBottom: "10px" }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          },
        }}
        variant="outlined"
        value={value}
        onChange={onChangeFn}
      />
    </div>
  );
}
