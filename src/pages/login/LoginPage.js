import React, {useState} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {LoginPageHead} from "./LoginPageHead";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import CustomTextInput from "../../customComponents/CustomTextInputComponent";
import CustomPassword from "../../customComponents/CustomPasswordComponent";
import {Link, useNavigate} from "react-router-dom";
import authService from "../../services/authService";
import {LoginPageFooter} from "./LoginPageFooter";

export function LoginPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({open: false, text: ""});
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function dataValidation(email, password) {
    if (!email || !password) {
      setState({open: true, text: "Email e Senha obrigatórios"});
      return;
    }

    if (password.length < 7) {
      setState({open: true, text: "Senha não pode ter menos de 8 caracteres"});
      return;
    }

    apiRequest(email, password);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function onCloseFn() {
    setState({open: false});
  }

  async function apiRequest(email, password) {
    try {
      await authService.login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setState({open: true, text: error.response.data.message});
    }
  }

  return (
    <div className="flex items-center flex-col absolute -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <CustomSnackbar
        open={state.open}
        message={state.text}
        onCloseFn={onCloseFn}
      />

      <LoginPageHead />

      <CustomTextInput
        name={"email"}
        text={"Email"}
        email={email}
        onChangeFn={handleEmailChange}
      />

      <CustomPassword
        name={"password"}
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

      <LoginPageFooter onClickFn={() => dataValidation(email, password)} />
    </div>
  );
}
