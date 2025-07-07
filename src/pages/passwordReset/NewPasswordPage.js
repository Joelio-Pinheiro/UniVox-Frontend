import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextInputComponent from "../../customComponents/CustomTextInputComponent";
import authService from "../../services/authService";
import CustomConfirmButton from "../../customComponents/CustomConfirmButton";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import CustomPageHead from "../../customComponents/CustomPageHead";
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
    <div className="absolute -translate-x-1/2 left-1/2 h-screen w-scren bg-white">
      <div className="relative flex items-center flex-col mt-12 sm:mt-2 md:mt-2 lg:mt-2 gap-[2vh] sm:gap-[4vh] md:gap-[4vh] lg:gap-[4vh] h-full w-10/12 sm:w-full md:w-full lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <CustomPageHead
          icon={UnivoxIcon}
          text={"Insira e confirme abaixo a nova senha"}
        />

        <CustomTextInputComponent
          name={"password"}
          text={"Nova senha"}
          value={fields.password}
          onChangeFn={handleChange}
        />
        <CustomTextInputComponent
          name={"passwordConfirmation"}
          text={"Confirmar senha"}
          value={fields.passwordConfirm}
          onChangeFn={handleChange}
        />

        <CustomConfirmButton onClick={() => apiRequest(fields.password)} />
      </div>
    </div>
  );
}
