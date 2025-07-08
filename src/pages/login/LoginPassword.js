import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import { IconSetter } from "../../utils/iconSetter";
import CustomPasswordHidingButton from "../../customComponents/PasswordHideBtn";
import PasswordComponent from "../../customComponents/PasswordComponent";

export function LoginPassword({ name, text, password, onChangeFn }) {
  const icon = IconSetter(name);

  const [visible, setVisible] = useState("visible");

  function onClickFn() {
    setVisible(visible === "visible" ? "invisible" : "visible");
  }

  return (
    <div className="relative flex items-center flex-col w-full">
      <div className="relative w-full sm:w-full md:w-full lg:w-9/12">
        <p className=" text-gray-500 font-semibold">{text}</p>
        <TextField
          className="w-full h-min bg-white"
          name={name}
          value={password}
          onChange={onChangeFn}
          type={visible === "visible" ? "text" : "password"}
          variant="outlined"
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
        <div className="relative float-end">
          <Link
            className="text-[#106FE2] font-semibold text-base sm:text-lg md:text-lg lg:text-lg"
            to="/emailfornewpass"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </div>
    </div>
  );
}
