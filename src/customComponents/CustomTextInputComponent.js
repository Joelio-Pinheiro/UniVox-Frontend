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
    <div className="w-full flex items-center flex-col">
      <div className="relative w-full sm:w-6/12 md:w-5/12 lg:w-7/12">
        {text !== "" && <p className=" text-gray-500 font-semibold">{text}</p>}
        <TextField
          className="w-full h-min sm:w-full md:w-full lg:w-full bg-white"
          name={name}
          value={value}
          onChange={onChangeFn}
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}
