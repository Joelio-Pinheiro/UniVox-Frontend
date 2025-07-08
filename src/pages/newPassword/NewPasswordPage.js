import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordComponent from "../../customComponents/PasswordComponent.js";
import CustomConfirmButton from "../../customComponents/ConfirmButton.js";
import Snackbar from "../../customComponents/CustomSnackbar.js";
import { NewPasswordPageHead } from "./NewPasswordPageHead.js";
import authService from "../../services/authService.js";
import UnivoxIcon from "../../assets/UnivoxIcon.png";

export function NewPasswordPage() {
  const navigate = useNavigate("");
  const [state, setState] = useState({ open: false, text: "" });
  const [fields, setFields] = useState({
    password: "",
    passwordConfirm: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          value={fields.password}
          onChangeFn={handleChange}
        />

        <PasswordComponent
          name={"password_confirmation"}
          text={"Confirmar senha"}
          value={fields.passwordConfirm}
          onChangeFn={handleChange}
        />

        <CustomConfirmButton
          text={"CONFIRMAR"}
          onClick={() => apiRequest(fields.password)}
        />
      </div>
    </div>
  );
}
