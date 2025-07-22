import {InputAdornment, TextField} from "@mui/material";
import {inputIconSetter} from "../../utils/iconSetters";
import PasswordHideBtn from "../buttons/PasswordHideBtn";

export default function PasswordComponent({
  name,
  text,
  password,
  onChangeFn,
  onClickFn,
  visibility,
}) {
  const icon = inputIconSetter(name);

  return (
    <div className="relative w-full flex items-center flex-col">
      <div className="relative w-full sm:w-full md:w-full lg:w-9/12">
        <p className=" text-gray-500 font-semibold">{text}</p>
        <TextField
          className="w-full h-min"
          name={name}
          value={password}
          onChange={onChangeFn}
          type={visibility === "visivel" ? "text" : "password"}
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <PasswordHideBtn
                    name={visibility}
                    onClickFn={() => onClickFn(visibility)}
                  />
                </InputAdornment>
              ),
              style: {fontSize: "16px"},
            },
          }}
        />
      </div>
    </div>
  );
}
