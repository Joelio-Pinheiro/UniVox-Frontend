import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUserPageHead } from "./CreateUserPageHead";
import TextInputComponent from "../../customComponents/TextInputComponent";
import PasswordComponent from "../../customComponents/PasswordComponent";
import CustomSnackbar from "../../customComponents/CustomSnackbar.js";
import ConfirmButton from "../../customComponents/ConfirmButton";
import authService from "../../services/authService";
import UnivoxIcon from "../../assets/UnivoxIcon.png";

export function CreateUserPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({ open: false, text: "" });
  const [fields, setFields] = useState({
    name: "",
    email: "",
    contact_number: "",
    password: "",
    password_confirmation: "",
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

  async function apiRequest(fields) {
    try {
      await authService.createAccount(fields);
      navigate("/verifyemail"); //redireciona para a página de verificação do email
    } catch (error) {
      console.log(error);
      setState({ open: true, text: error.message });
    }
  }

  return (
    <div className="absolute flex items-center flex-col -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col gap-[1.5vh] sm:gap-[2.5vh] md:gap-[2.5vh] lg:gap-[2.5vh] h-full w-10/12 sm:w-6/12 md:w-6/12 lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <CreateUserPageHead icon={UnivoxIcon} text={"Crie sua conta"} />

        <TextInputComponent
          name={"name"}
          text={"Nome de Usuário"}
          value={fields.name}
          onChangeFn={handleChange}
        />
        <TextInputComponent
          name={"email"}
          text={"Email"}
          value={fields.email}
          onChangeFn={handleChange}
        />
        <TextInputComponent
          name={"contact_number"}
          text={"Telefone com DDD"}
          value={fields.contact_number}
          onChangeFn={handleChange}
        />
        <PasswordComponent
          name={"password"}
          text={"Senha"}
          value={fields.password}
          onChangeFn={handleChange}
        />
        <PasswordComponent
          name={"password_confirmation"}
          text={"Confirmar senha"}
          value={fields.password_confirmation}
          onChangeFn={handleChange}
        />

        <ConfirmButton text={"Cadastrar"} onClick={() => apiRequest(fields)} />
      </div>
    </div>
  );
}
