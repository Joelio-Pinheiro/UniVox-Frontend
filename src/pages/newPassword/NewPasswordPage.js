import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewPasswordPageHead } from "./NewPasswordPageHead.js";
import PasswordComponent from "../../customComponents/PasswordComponent.js";
import TextInputComponent from "../../customComponents/TextInputComponent.js";
import ConfirmButton from "../../customComponents/ConfirmButton.js";
import Snackbar from "../../customComponents/CustomSnackbar.js";
import authService from "../../services/authService.js";
import UnivoxIcon from "../../assets/UnivoxIcon.png";

export function NewPasswordPage() {
  const navigate = useNavigate("");
  const [state, setState] = useState({ open: false, text: "" });
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [visibility, setVisibility] = useState("visible");

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleConfirmationChange(e) {
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
    <div className="absolute flex items-center flex-col -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col gap-[6vh] h-full w-9/12 sm:w-6/12 md:w-6/12 lg:w-6/12 bg-white">
        <Snackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <NewPasswordPageHead
          icon={UnivoxIcon}
          title={"Nova Senha"}
          text={"Altere a senha e confirme"}
        />

        <PasswordComponent
          name={"password"}
          text={"Nova senha"}
          contentType={"password"}
          value={password}
          visibility={visibility}
          onChangeFn={handlePasswordChange}
          onClickFn={onClickFn}
        />

        <TextInputComponent
          name={"password"}
          text={"Confirmar senha"}
          contentType={"password"}
          value={passwordConfirm}
          visibility={visibility}
          onChangeFn={handleConfirmationChange}
        />

        <div className="relative flex items-center flex-col w-full h-max mt-12">
          <ConfirmButton
            text={"CONFIRMAR"}
            onClick={() => apiRequest(password, passwordConfirm)}
          />
        </div>
      </div>
    </div>
  );
}
