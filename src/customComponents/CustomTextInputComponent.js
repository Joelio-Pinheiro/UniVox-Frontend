import { InputAdornment, TextField } from "@mui/material";
import { IconSetter } from "../utils/iconSetter";
export default function CustomTextInputComponent({
  name,
  text,
  value,
  onChangeFn,
}) {
  const icon = IconSetter(name);

  return (
    <div className=" relative top-2">
      {text !== "" && <p className=" text-gray-500 font-semibold">{text}</p>}
      <TextField
        name={name}
        value={value}
        variant="outlined"
        onChange={onChangeFn}
        sx={{ width: "240px", marginBottom: "10px" }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
}
