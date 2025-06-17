import React, { useState } from "react";
import { EmailContainer } from "./EmailContainer";
import { PasswordContainer } from "./PasswordContainer";
import { Checkbox, FormControlLabel } from "@mui/material";
import { LoginScreenHead } from "./LoginScreenHead";
import { LoginConfirmButton } from "./LoginConfirmButton";
export function LoginScreen() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div
      id="loginScreen"
      className="flex items-center flex-col absolute -translate-x-1/2  left-1/2 h-screen bg-white w-"
    >
      <LoginScreenHead />

      <EmailContainer email={email} onChangeFn={handleEmailChange} />

      <PasswordContainer
        password={password}
        onChangeFn={handlePasswordChange}
      />

      <div className="relative top-20">
        <FormControlLabel
          control={<Checkbox defaultValue={false}/>}
          label={
            <span className="text-gray-500">Lembrar de mim</span>
          }
        />

        <a href="_link_" className="text-blue-500 font-semibold">
          Esqueceu a senha?
        </a>
      </div>

      <LoginConfirmButton email={email} password={password} />

      <div className="relative top-32">
        <p className=" text-center text-gray-500">
          Ainda não possui uma conta?
          <a href="_link_" className=" text-blue-500 font-semibold">
            Cadastrar-se
          </a>
        </p>
      </div>
    </div>
  );
}
