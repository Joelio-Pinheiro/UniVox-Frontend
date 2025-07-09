import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailForResetPageHead } from "./EmailForResetPageHead.js";
import TextInputComponent from "../../customComponents/TextInputComponent.js";
import ConfirmButton from "../../customComponents/ConfirmButton.js";
import CustomSnackbar from "../../customComponents/CustomSnackbar.js";
import authService from "../../services/authService.js";
import UnivoxIcon from "../../assets/UnivoxFullIcon.png";

export function EmailForResetPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({ open: false, text: "" });
  const [email, setEmail] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function onCloseFn() {
    setState({ open: false });
  }

  async function apiRequest(email) {
    try {
      await authService.accountEmailForRecovery(email);
      navigate("/verify/password-reset"); //redireciona para a página de entrada do código de confirmação do email para alteração de senha
    } catch (error) {
      setState({ open: true, text: error.message });
    }
  }

  return (
    <div className="absolute flex items-center flex-col -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col gap-[12vh] h-full w-10/12 sm:w-6/12 md:w-6/12 lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <EmailForResetPageHead
          icon={UnivoxIcon}
          text={"Digite seu email cadastrado para verificação. Nós enviaremos um código de 4 dígitos para ele."}
        />

        <TextInputComponent
          name={"name"}
          text={"Email"}
          contentType={"text"}
          value={email}
          onChangeFn={handleEmailChange}
        />

        <ConfirmButton text={"CONTINUAR"} onClick={() => apiRequest(email)} />
      </div>
    </div>
  );
}
