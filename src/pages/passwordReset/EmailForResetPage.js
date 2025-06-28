import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextInputComponent from "../../customComponents/CustomTextInputComponent";
import CustomConfirmButton from "../../customComponents/CustomConfirmButton";
import authService from "../../services/authService";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import CustomPageHead from "../../customComponents/CustomPageHead";

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
      navigate("/codeconfirm"); //redireciona para a página de entrada do código de confirmação do email para alteração de senha
    } catch (error) {
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

      <CustomPageHead
        text={
          "Digite seu email cadastrado para o processo de verificação. Nós enviaremos um código de 4 dígitos para ele."
        }
      />

      <div>
        <CustomTextInputComponent
          name={"name"}
          text={"Email"}
          value={email}
          onChangeFn={handleEmailChange}
        />
      </div>

      <div className="relative flex items-center flex-col top-40">
        <CustomConfirmButton
          text={"CONTINUAR"}
          onClick={() => apiRequest(email)}
        />
      </div>
    </div>
  );
}
