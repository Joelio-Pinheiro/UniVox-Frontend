import {InputAdornment, TextField} from "@mui/material";
import {iconSetter} from "../utils/iconSetters";
export default function TextInputComponent({
  name,
  text,
  value,
  onChangeFn,
  contentType,
  visibility,
}) {
  const icon = iconSetter(name);

  return (
    <div className="relative w-full flex items-center flex-col">
      <div className="relative w-full sm:w-full md:w-full lg:w-9/12">
        {text && <p className=" text-gray-500 font-semibold">{text}</p>}
        <TextField
          className="w-full h-min"
          name={name}
          value={value}
          onChange={onChangeFn}
          type={
            contentType === "text" ||
            (contentType === "password" && visibility === "visivel") //oculta senhas, se exigido
              ? "text"
              : "password"
          }
          variant="outlined"
          slotProps={
            icon && {
              input: {
                startAdornment: (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
                style: {fontSize: "16px"},
              },
            }
          }
        />
      </div>
    </div>
  );
}
