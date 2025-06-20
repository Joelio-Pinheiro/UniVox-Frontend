import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { LoginPageHead } from "./LoginPageHead";
import { LoginConfirmButton } from "./LoginConfirmButton";
import { TextInputContainer } from "../../customComponents/TextInputContainer";
import { PasswordContainer } from "./PasswordContainer";
import { Link, Outlet } from "react-router-dom";

export function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="flex items-center flex-col absolute -translate-x-1/2  left-1/2 h-screen bg-white">
      <LoginPageHead />

      <TextInputContainer
        type={"email"}
        text={"Email"}
        email={email}
        onChangeFn={handleEmailChange}
      />

      <PasswordContainer
        password={password}
        onChangeFn={handlePasswordChange}
      />

      <div className="relative top-16">
        <FormControlLabel
          control={<Checkbox defaultValue={false} />}
          label={<span className="text-gray-500">Lembrar de mim</span>}
        />

        <Link className="text-blue-500 font-semibold" to="/recovery">
          Esqueceu a senha?
        </Link>
      </div>

      <LoginConfirmButton email={email} password={password} />

      <div className="relative top-40">
        <p className=" text-center text-gray-500">
          Ainda não possui uma conta?
          <Link to="/register" className=" text-blue-500 font-semibold">
            Cadastrar-se
          </Link>
        </p>
      </div>
    </div>
  );
}
