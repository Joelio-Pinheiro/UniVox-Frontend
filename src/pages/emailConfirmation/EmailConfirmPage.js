import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailConfirmPageHead } from "./EmailConfirmPageHead.js";
import ConfirmButton from "../../customComponents/ConfirmButton.js";
import CustomSnackbar from "../../customComponents/CustomSnackbar.js";
import authService from "../../services/authService.js";
import UnivoxIcon from "../../assets/UnivoxIcon.png";
import TextInputComponent from "../../customComponents/TextInputComponent.js";

export function EmailConfirmPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({ open: false, text: "" });
  const [confirmationcode, setConfirmationCode] = useState("");

  function handleChange(e) {
    setConfirmationCode(e.target.value);
  }

  function onCloseFn() {
    setState({ open: false });
  }

  async function apiRequest(confirmationcode) {
    try {
      const code = confirmationcode;

      await authService.accountConfirmation(code);
      navigate("/"); //redireciona para a home page, após o usuário terminar a verificação do email
    } catch (error) {
      setState({ open: true, text: error.message });
    }
  }

  async function apiNewCodeRequest() {
    try {
      await authService.newCodeRequest();
    } catch (error) {
      setState({ open: true, text: error.message });
    }
  }

  return (
    <div className="absolute flex items-center flex-col -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col gap-[12vh] h-full w-10/12 sm:w-full md:w-full lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <EmailConfirmPageHead
          icon={UnivoxIcon}
          text={"Digite o código que enviamos para seu email"}
        />

        <TextInputComponent
          name={""}
          text={""}
          value={confirmationcode}
          onChangeFn={handleChange}
        />

        <ConfirmButton
          text={"CONTINUAR"}
          onClick={() => apiRequest(confirmationcode)}
        />

        <div className="relative">
          <p className=" text-center text-gray-500">
            Não recebeu o código?
            <span
              onClick={() => apiNewCodeRequest()}
              className=" text-[#106FE2] font-semibold"
            >
              Reenviar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
