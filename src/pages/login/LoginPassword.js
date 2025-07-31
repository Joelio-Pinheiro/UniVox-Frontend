import { useState } from "react";
import { Link } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import { inputIconSetter } from "../../utils/iconSetters";
import PasswordHideButton from "../../customComponents/buttons/PasswordHideButton";

export function LoginPassword({ name, text, password, onChangeFn }) {
  const icon = inputIconSetter(name);

  const [visibility, setVisibility] = useState("invisible");

  function onClickFn() {
    setVisibility(visibility === "invisible" ? "visible" : "invisible");
  }

  return (
    <div className="relative flex items-center flex-col w-full">
      <div className="relative w-full sm:w-full md:w-full lg:w-9/12">
        <p className=" text-gray-500 font-semibold">{text}</p>
        <TextField
          className="w-full h-min"
          name={name}
          value={password}
          onChange={onChangeFn}
          type={visibility === "visible" ? "text" : "password"}
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <PasswordHideButton
                    name={visibility}
                    onClickFn={() => onClickFn(visibility)}
                  />
                </InputAdornment>
              ),
              style: { fontSize: "16px" },
            },
          }}
        />
        <div className="relative float-end">
          <Link
            className="text-[#106FE2] font-semibold text-base sm:text-lg md:text-lg lg:text-lg"
            to="/email-new-pass/email-confirm"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </div>
    </div>
  );
}
