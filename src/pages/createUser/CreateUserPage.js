import React, {useState} from "react";
import {CreateUserPageHead} from "./CreateUserPageHead";
import {Button} from "@mui/material";
import CustomTextInput from "../../customComponents/CustomTextInputComponent";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import {useNavigate} from "react-router-dom";
import authService from "../../services/authService";

export function CreateUserPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({open: false, text: ""});
  const [fields, setFields] = useState({
    name: "",
    email: "",
    contact_number: "",
    password: "",
    passwordConfirmation: "",
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function dataValidation(fields) {
    for (const key of Object.keys(fields)) {
      if (fields[key] === "") {
        setState({open: true, text: "Campos não devem ser vazios"});
        return;
      }
    }

    if (fields.contact_number.length < 11) {
      setState({open: true, text: "Telefone inválido"});
      return;
    }

    if (fields.password.length < 8) {
      setState({open: true, text: "Senha deve ter ao menos 8 caracteres"});
      return;
    }

    if (fields.password !== fields.passwordConfirmation) {
      setState({open: true, text: "As senhas não podem ser diferentes"});
      return;
    }

    const obj = {
      name: fields.name,
      password: fields.password,
      email: fields.email,
      contact_number: fields.contact_number,
    };

    apiRequest(obj);
  }

  function onCloseFn() {
    setState({open: false});
  }

  async function apiRequest(obj) {
    try {
      await authService.createAccount(obj);
      navigate("/verifyemail");
    } catch (err) {
      console.log(err);
      setState({open: true, text: err.response.data.message});
    }
  }

  return (
    <div className="flex items-center flex-col absolute -translate-x-1/2  left-1/2 h-screen w-scren bg-white">
      <CustomSnackbar
        open={state.open}
        message={state.text}
        onCloseFn={onCloseFn}
      />

      <CreateUserPageHead />

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

      <Button
        size="large"
        className="relative top-4"
        sx={{backgroundColor: "#106FE2", padding: "12px 65px"}}
        onClick={() => dataValidation(fields)}
        variant="contained">
        CADASTRAR
      </Button>
    </div>
  );
}
