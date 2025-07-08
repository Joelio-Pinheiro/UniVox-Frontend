import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordComponent from "../../customComponents/PasswordComponent.js";
import CustomConfirmButton from "../../customComponents/ConfirmButton.js";
import Snackbar from "../../customComponents/CustomSnackbar.js";
import { NewPasswordPageHead } from "./NewPasswordPageHead.js";
import authService from "../../services/authService.js";
import UnivoxIcon from "../../assets/UnivoxIcon.png";
import TextInputComponent from "../../customComponents/TextInputComponent.js";

export function NewPasswordPage() {
  const navigate = useNavigate("");
  const [state, setState] = useState({ open: false, text: "" });
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [visibility, setVisibility] = useState("visible");
  
  function handleChange(e) {
    setPassword(e.target.value);
  }

  function handleChange2(e) {
    setPasswordConfirm(e.target.value);
  }

  function onClickFn() {
    setVisibility(visibility === "visible" ? "invisible" : "visible");
  }

  function onCloseFn() {
    setState({ open: false });
  }

  async function apiRequest(password, passwordConfirm) {
    try {
      await authService.accountNewPassword(password, passwordConfirm);
      navigate("/login"); //redireciona de volta para a página de login, onde deve ser usada a senha nova
    } catch (error) {
      setState({ open: true, text: error.message });
    }
  }

  return (
    <div className="absolute flex items-center flex-col -translate-x-1/2 left-1/2 h-screen w-scren bg-white">
      <div className="relative flex items-center flex-col gap-[8vh] h-full w-10/12 sm:w-full md:w-full lg:w-6/12 bg-white">
        <Snackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <NewPasswordPageHead
          icon={UnivoxIcon}
          text={"Insira e confirme abaixo a nova senha"}
        />

        <PasswordComponent
          name={"password"}
          text={"Nova senha"}
          contentType={"password"}
          value={password}
          visibility={visibility}
          onChangeFn={handleChange}
          onClickFn={onClickFn}
        />

        <TextInputComponent
          name={"password"}
          text={"Confirmar senha"}
          contentType={"password"}
          value={passwordConfirm}
          visibility={visibility}
          onChangeFn={handleChange2}
        />

        <CustomConfirmButton
          text={"CONFIRMAR"}
          onClick={() => apiRequest(password, passwordConfirm)}
        />
      </div>
    </div>
  );
}
