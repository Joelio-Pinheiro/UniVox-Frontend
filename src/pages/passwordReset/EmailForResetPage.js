import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import TextInputComponent from "../../customComponents/TextInputComponent";
import ConfirmButton from "../../customComponents/ConfirmButton";
import CustomSnackbar from "../../customComponents/CustomSnackbar.js";
import PageHead from "../../customComponents/PageHead";
import UnivoxIcon from "../../assets/UnivoxIcon.png";

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
    <div className="absolute flex items-center flex-col -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col gap-[4vh]h-full w-10/12 sm:w-full md:w-full lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <PageHead
          icon={UnivoxIcon}
          text={"Digite seu email para receber o código de confirmação"}
        />

        <TextInputComponent
          name={"name"}
          text={"Email"}
          value={email}
          onChangeFn={handleEmailChange}
        />

        <ConfirmButton text={"CONTINUAR"} onClick={() => apiRequest(email)} />
      </div>
    </div>
  );
}
