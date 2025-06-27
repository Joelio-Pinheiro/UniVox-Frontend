import React, {useState} from "react";
import {InputAdornment, TextField} from "@mui/material";
import {IconSetter} from "../utils/iconSetter";
import CustomPasswordHidingButton from "./CustomPasswordHidingButton";
export default function CustomPasswordComponent({
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
    <div className=" relative top-12">
      <p className=" text-gray-500 font-semibold">{text}</p>
      <TextField
        name={name}
        type={visible === "visible" ? "text" : "password"}
        sx={{width: "240px"}}
        variant="outlined"
        value={password}
        onChange={onChangeFn}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CustomPasswordHidingButton
                  name={visible}
                  onClickFn={() => onClickFn(visible)}
                />
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
}
