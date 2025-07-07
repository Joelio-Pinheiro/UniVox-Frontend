import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextInputComponent from "../../customComponents/CustomTextInputComponent";
import CustomConfirmButton from "../../customComponents/CustomConfirmButton";
import authService from "../../services/authService";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import CustomPageHead from "../../customComponents/CustomPageHead";
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
    <div className="absolute -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col mt-12 sm:mt-2 md:mt-2 lg:mt-2 gap-[2vh] sm:gap-[4vh] md:gap-[4vh] lg:gap-[4vh] h-full w-10/12 sm:w-full md:w-full lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <CustomPageHead
          icon={UnivoxIcon}
          text={"Digite seu email para receber o código de confirmação"}
        />

        <CustomTextInputComponent
          name={"name"}
          text={"Email"}
          value={email}
          onChangeFn={handleEmailChange}
        />

        <CustomConfirmButton
          text={"CONTINUAR"}
          onClick={() => apiRequest(email)}
        />
      </div>
    </div>
  );
}
