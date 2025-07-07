import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "../../customComponents/CustomTextInputComponent";
import CustomPassword from "../../customComponents/CustomPasswordComponent";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import authService from "../../services/authService";
import CustomConfirmButton from "../../customComponents/CustomConfirmButton";
import CustomPageHead from "../../customComponents/CustomPageHead";
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
      <div className="relative flex items-center flex-col gap-[1.5vh] sm:gap-[2.5vh] md:gap-[2.5vh] lg:gap-[2.5vh] h-full w-10/12 sm:w-full md:w-full lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <CustomPageHead icon={UnivoxIcon} text={"Crie sua conta"} />

        <CustomTextInput
          name={"name"}
          text={"Nome de Usuário"}
          value={fields.name}
          onChangeFn={handleChange}
        />
        <CustomTextInput
          name={"email"}
          text={"Email"}
          value={fields.email}
          onChangeFn={handleChange}
        />
        <CustomTextInput
          name={"contact_number"}
          text={"Telefone com DDD"}
          value={fields.contact_number}
          onChangeFn={handleChange}
        />
        <CustomPassword
          name={"password"}
          text={"Senha"}
          value={fields.password}
          onChangeFn={handleChange}
        />
        <CustomPassword
          name={"password_confirmation"}
          text={"Confirmar senha"}
          value={fields.password_confirmation}
          onChangeFn={handleChange}
        />

        <CustomConfirmButton
          text={"Cadastrar"}
          onClick={() => apiRequest(fields)}
        />
      </div>
    </div>
  );
}
