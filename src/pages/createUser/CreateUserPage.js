import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "../../customComponents/CustomTextInputComponent";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import authService from "../../services/authService";
import CustomConfirmButton from "../../customComponents/CustomConfirmButton";
import CustomPageHead from "../../customComponents/CustomPageHead";
import UnivoxIcon from "../../icons/UnivoxIcon.png";

export function CreateUserPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({ open: false, text: "" });
  const [fields, setFields] = useState({
    name: "",
    email: "",
    contact_number: "",
    password: "",
    passwordConfirmation: "",
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
    <div className="flex items-center flex-col absolute -translate-x-1/2  left-1/2 h-screen w-scren bg-white">
      <CustomSnackbar
        open={state.open}
        message={state.text}
        onCloseFn={onCloseFn}
      />

      <CustomPageHead icon={UnivoxIcon} text={"Crie sua conta"} />

      <div className="relative top-4">
        <form>
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
          <CustomTextInput
            name={"password"}
            text={"Senha"}
            value={fields.password}
            onChangeFn={handleChange}
          />
          <CustomTextInput
            name={"passwordConfirmation"}
            text={"Confirmar senha"}
            value={fields.passwordConfirmation}
            onChangeFn={handleChange}
          />
        </form>
      </div>

      <div className="relative flex items-center flex-col top-8">
        <CustomConfirmButton
          text={"CADASTRAR"}
          onClick={() => apiRequest(fields)}
        />
      </div>
    </div>
  );
}
