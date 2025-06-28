import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { LoginPageFooter } from "./LoginPageFooter";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import CustomTextInput from "../../customComponents/CustomTextInputComponent";
import CustomPassword from "../../customComponents/CustomPasswordComponent";
import authService from "../../services/authService";
import CustomPageHead from "../../customComponents/CustomPageHead";
import UnivoxFullIcon from "../../icons/UnivoxFullIcon.png";

export function LoginPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({ open: false, text: "" });
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function onCloseFn() {
    setState({ open: false });
  }

  async function apiRequest(email, password) {
    try {
      await authService.login(email, password);
      navigate("/"); //redireciona para a home page
    } catch (error) {
      console.log(error);
      setState({ open: true, text: error.message });
    }
  }

  return (
    <div className="flex items-center flex-col absolute -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <CustomSnackbar
        open={state.open}
        message={state.text}
        onCloseFn={onCloseFn}
      />

      <CustomPageHead icon={UnivoxFullIcon} text={"Entre na sua conta"} />
      <div className="relative top-2">
        <CustomTextInput
          name={"email"}
          text={"Email"}
          email={email}
          onChangeFn={handleEmailChange}
        />

        <CustomPassword
          name={"password"}
          text={"Senha"}
          password={password}
          onChangeFn={handlePasswordChange}
        />
      </div>

      <div className="relative top-16">
        <FormControlLabel
          control={<Checkbox defaultValue={false} />}
          label={<span className="text-gray-500">Lembrar de mim</span>}
        />
        <Link className="text-[#106FE2] font-semibold" to="/emailfornewpass">
          Esqueceu a senha?
        </Link>
      </div>

      <LoginPageFooter onClickFn={() => apiRequest(email, password)} />
    </div>
  );
}
