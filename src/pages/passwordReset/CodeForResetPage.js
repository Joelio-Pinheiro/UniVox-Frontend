import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmButton from "../../customComponents/ConfirmButton";
import authService from "../../services/authService";
import CustomSnackbar from "../../customComponents/CustomSnackbar.js";
import UnivoxIcon from "../../assets/UnivoxIcon.png";
import TextInputComponent from "../../customComponents/TextInputComponent.js";

export function CodeForResetPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({ open: false, text: "" });
  const [confirmationcode, setConfirmationCode] = useState("");

  function handleChange(e) {
    setConfirmationCode(e.target.value);
  }

  function onCloseFn() {
    setState({ open: false });
  }

  async function apiRequest2(){
    try{
      await authService.accountNewCodeRequest();
    }catch(error){
      setState({ open: true, text: error.message });
    }
  }

  async function apiRequest(confirmationcode) {
    try {
      const code = confirmationcode;

      await authService.accountCodeForRecovery(code);
      navigate("/newpassword"); //redireciona para a página onde o usuário digita sua nova senha
    } catch (error) {
      setState({ open: true, text: error.message });
    }
  }

  return (
    <div className="absolute -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col gap-[4vh] h-full w-10/12 sm:w-full md:w-full lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
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

        <ConfirmButton text={"ENVIAR"} onClick={() => apiRequest2()} />
      </div>
    </div>
  );
}
