import React from "react";
import { TextField } from "@mui/material";
export function PasswordContainer({ password, onChangeFn }) {
  return (
    <div className=" relative top-12">
      <p className=" text-gray-500 font-semibold">Senha</p>
      <TextField
        sx={{ width: "240px" }}
        id="passwordInput"
        variant="outlined"
        value={password}
        onChange={onChangeFn}
      />
    </div>
  );
}
