import { InputAdornment, TextField } from "@mui/material";
import { IconSetter } from "../utils/iconSetter";
export default function TextInputComponent({
  name,
  text,
  value,
  onChangeFn,
}) {
  const icon = IconSetter(name);

  return (
    <div className="relative w-full flex items-center flex-col">
      <div className="relative w-full sm:w-full md:w-full lg:w-9/12">
        {text && <p className=" text-gray-500 font-semibold">{text}</p>}
        <TextField
          className="w-full h-min sm:w-full md:w-full lg:w-full bg-white"
          name={name}
          value={value}
          onChange={onChangeFn}
          variant="outlined"
          slotProps={
            icon && {
              input: {
                startAdornment: (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
              },
            }
          }
        />
      </div>
    </div>
  );
}
