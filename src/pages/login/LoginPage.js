import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { LoginPageHead } from "./LoginPageHead";
import { LoginError } from "./LoginError";
import { LoginConfirmButton } from "./LoginConfirmButton";
import { TextInputContainer } from "../../customComponents/TextInputContainer";
import { PasswordContainer } from "./PasswordContainer";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function LoginPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function dataValidation(email, password){
    if(!email || !password){
      setOpen(true);
      return; 
    }

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    LoginConfirmation(formData);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function onCloseFn() {
    setOpen(false);
  }

  async function LoginConfirmation(formData) {
    await axios
      .post("https://univox-backend.onrender.com/login/", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="flex items-center flex-col absolute -translate-x-1/2  left-1/2 h-screen bg-white">
      <LoginError open={open} onCloseFn={onCloseFn} />
      <LoginPageHead />

      <TextInputContainer
        name={"email"}
        text={"Email"}
        email={email}
        onChangeFn={handleEmailChange}
      />

      <PasswordContainer
        password={password}
        onChangeFn={handlePasswordChange}
      />

      <div className="relative top-16">
        <FormControlLabel
          control={<Checkbox defaultValue={false} />}
          label={<span className="text-gray-500">Lembrar de mim</span>}
        />
        <Link className="text-[#106FE2] font-semibold" to="/recovery">
          Esqueceu a senha?
        </Link>
      </div>

      <LoginConfirmButton
        onClick={() => dataValidation(email, password)}
        email={email}
        password={password}
      />

      <div className="relative top-40">
        <p className=" text-center text-gray-500">
          Ainda não possui uma conta?
          <Link to="/register" className=" text-[#106FE2] font-semibold">
            Cadastrar-se
          </Link>
        </p>
      </div>
    </div>
  );
}
