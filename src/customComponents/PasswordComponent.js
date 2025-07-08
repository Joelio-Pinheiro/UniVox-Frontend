import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { IconSetter } from "../utils/iconSetter";
import PasswordHideBtn from "./PasswordHideBtn";

export default function PasswordComponent({
  name,
  text,
  password,
  onChangeFn,
}) {
  const icon = IconSetter(name);

  const [visible, setVisible] = useState("visible");

  function onClickFn() {
    setVisible(visible === "visible" ? "invisible" : "visible");
  }

  return (
      <TextField
        className="w-full h-min bg-white"
        name={name}
        value={password}
        onChange={onChangeFn}
        type={visible === "visible" ? "text" : "password"}
        variant="outlined"
        slotProps={{
          input: icon && {
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <PasswordHideBtn
                  name={visible}
                  onClickFn={() => onClickFn(visible)}
                />
              </InputAdornment>
            ),
          },
        }}
      />
  );
}
