import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { LoginPageHead } from "./LoginPageHead";
import { CustomSnackbar } from "../../customComponents/CustomSnackbar";
import { LoginConfirmButton } from "./LoginConfirmButton";
import { TextInputContainer } from "../../customComponents/TextInputContainer";
import { PasswordContainer } from "./PasswordContainer";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function LoginPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({ open: false, text: "" });
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function dataValidation(email, password) {
    LoginConfirmation(email, password);
  }


  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function onCloseFn() {
    setState({ open: false });
  }

  async function LoginConfirmation(email, password) {
    try {
      await authService.login({ email, password });
      setState({ open: true, text: "Login bem sucedido." });
      navigate("/home");
    } catch (err) {
      console.error("Erro ao fazer login:", err.message);
      setState({ open: true, text: err.message});
    }
  }

  return (
    <div className="flex items-center flex-col absolute -translate-x-1/2  left-1/2 h-screen bg-white">
      <CustomSnackbar
        open={state.open}
        message={state.text}
        onCloseFn={onCloseFn}
      />

      <LoginPageHead />

      <TextInputContainer
        name={"email"}
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
        <Link className="text-[#106FE2] font-semibold" to="/recovery">
          Esqueceu a senha?
        </Link>
      </div>

      <LoginConfirmButton
        onClick={() => dataValidation(email, password)}
        email={email}
        password={password}
      />

      <div className="relative top-40">
        <p className=" text-center text-gray-500">
          Ainda não possui uma conta?
          <Link to="/register" className=" text-[#106FE2] font-semibold">
            Cadastrar-se
          </Link>
        </p>
      </div>
    </div>
  );
}
