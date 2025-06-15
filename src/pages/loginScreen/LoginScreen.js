import React, { useState } from "react";
import { EmailContainer } from "./EmailContainer";
import { PasswordContainer } from "./PasswordContainer";
import { Checkbox } from "@mui/material";
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
      className=" absolute -translate-x-1/2  left-1/2 h-screen bg-white w-3/12 border-blue-500"
    >
      <LoginScreenHead />

      <EmailContainer email={email} onChangeFn={handleEmailChange} />

      <PasswordContainer
        password={password}
        onChangeFn={handlePasswordChange}
      />

      <div className="relative top-20">
        <div>
          <Checkbox id="reminder" />
          <label htmlFor="reminder" className="text-gray-500 font-semibold">
            Lembrar de mim
          </label>
        </div>

        <div>
          <a href="_link_" className="text-blue-500 font-semibold">
            Esqueceu a senha?
          </a>
        </div>
      </div>

      <LoginConfirmButton email={email} password={password}/>
      
      <div className="relative top-28">
        <p className=" text-center text-gray-500 font-semibold">
          Ainda não possui uma conta?
          <a href="_link_" className=" text-blue-500">
            Cadastrar-se
          </a>
        </p>
        {/**por enquanto sem link de redirecionamento*/}
      </div>
    </div>
  );
}
