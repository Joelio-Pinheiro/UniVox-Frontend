import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { LoginPageFooter } from "./LoginPageFooter";
import { PasswordField } from "./PasswordField";
import CustomTextInput from "../../customComponents/CustomTextInputComponent";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import { LoginPageHead } from "./LoginPageHead";
import authService from "../../services/authService";
import UnivoxFullIcon from "../../assets/UnivoxFullIcon.png";

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
    <div className="absolute flex items-center flex-col -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col mt-12 sm:mt-2 md:mt-2 lg:mt-2 gap-[2vh] sm:gap-[4vh] md:gap-[4vh] lg:gap-[4vh] h-full w-10/12 sm:w-full md:w-full lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <LoginPageHead icon={UnivoxFullIcon} text={"Entre na sua conta"} />

        <CustomTextInput
          name={"email"}
          text={"Email"}
          email={email}
          onChangeFn={handleEmailChange}
        />

        <PasswordField
          name={"password"}
          text={"Senha"}
          password={password}
          onChangeFn={handlePasswordChange}
        />

        <div className="relative w-full sm:w-6/12 md:w-5/12 lg:w-7/12">
          <div className="relative float-start">
            <FormControlLabel
              control={<Checkbox defaultValue={false} />}
              label={
                <span className="text-gray-500 text-base sm:text-lg md:text-lg lg:text-lg">
                  Lembrar de mim
                </span>
              }
            />
          </div>
        </div>

        <LoginPageFooter onClickFn={() => apiRequest(email, password)} />
      </div>
    </div>
  );
}
