import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import { LoginPageFooter } from "./LoginPageFooter";
import { LoginPageHead } from "./LoginPageHead";
import { LoginPassword } from "./LoginPassword.js";
import TextInputComponent from "../../customComponents/inputs/TextInputComponent";
import Snackbar from "../../customComponents/CustomSnackbar.js";
import authService from "../../services/authService";
import UnivoxFullIcon from "../../assets/UnivoxFullIcon.png";

export function LoginPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({ open: false, text: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <div className="relative flex items-center flex-col gap-[5vh] h-full w-10/12 sm:w-6/12 md:w-6/12 lg:w-6/12 bg-white">
        <Snackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <LoginPageHead icon={UnivoxFullIcon} title={"Entre na sua conta"} />

        <TextInputComponent
          name={"email"}
          text={"Email"}
          contentType={"text"}
          email={email}
          onChangeFn={handleEmailChange}
        />

        <LoginPassword
          name={"senha"}
          text={"Senha"}
          contentType={"password"}
          password={password}
          onChangeFn={handlePasswordChange}
        />

        <div className="relative w-full sm:w-full md:w-full lg:w-9/12">
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
