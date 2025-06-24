import React, { useState } from "react";
import { RegisterPageHead } from "./RegisterPageHead";
import { Button } from "@mui/material";
import { TextInputContainer } from "../../customComponents/TextInputContainer";
export function RegisterPage() {
  const [fields, setFields] = useState({
    userName: "",
    email: "",
    phone: "",
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
  const onSumbit = () => {};

  return (
    <div className="flex items-center flex-col absolute -translate-x-1/2  left-1/2 h-screen bg-white">
      <RegisterPageHead />
      <div className="relative top-4">
        <form>
          <TextInputContainer
            name={"userName"}
            value={fields.userName}
            onChangeFn={handleChange}
            text={"Nome de Usuário"}
          />
          <TextInputContainer
            name={"email"}
            value={fields.email}
            onChangeFn={handleChange}
            text={"Email"}
          />
          <TextInputContainer
            name={"phone"}
            value={fields.phone}
            onChangeFn={handleChange}
            text={"Telefone com DDD"}
          />
          <TextInputContainer
            name={"password"}
            value={fields.password}
            onChangeFn={handleChange}
            text={"Senha"}
          />
          <TextInputContainer
            name={"passwordConfirmation"}
            value={fields.passwordConfirmation}
            onChangeFn={handleChange}
            text={"Confirmar senha"}
          />
        </form>
      </div>
      <Button
        size="large"
        className="relative top-4"
        sx={{ backgroundColor: "#106FE2", padding: "12px 65px" }}
        onSubmit={onSumbit}
        variant="contained"
      >
        CADASTRAR
      </Button>
    </div>
  );
}
