import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {CreateUserPageHead} from "./CreateUserPageHead";
import TextInputComponent from "../../customComponents/inputs/TextInputComponent";
import PasswordComponent from "../../customComponents/inputs/PasswordComponent.js";
import CustomSnackbar from "../../customComponents/CustomSnackbar.js";
import ConfirmButton from "../../customComponents/buttons/ConfirmButton.js";
import authService from "../../services/authService";
import UnivoxIcon from "../../assets/UnivoxIcon.png";

export function CreateUserPage() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    name: "",
    email: "",
    contact_number: "",
    password: "",
    password_confirmation: "",
  });

  const [state, setState] = useState({open: false, text: ""});
  const [visibility, setVisibility] = useState("invisible");

  function handleChange(e) {
    const {name, value} = e.target;

    if (name === "telefone" && value.length > 11) {
      return;
    }

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onCloseFn() {
    setState({open: false});
  }

  function handleClick() {
    //uso de string para aproveitar a função de ícone
    setVisibility(visibility === "invisible" ? "visible" : "invisible");
  }

  async function apiRequest(fields) {
    try {
      await authService.createAccount(fields);
      navigate("/verify/email-confirm/"); //redireciona para a página de verificação do email
    } catch (error) {
      console.log(error);
      setState({open: true, text: error.message});
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

        <CreateUserPageHead icon={UnivoxIcon} title={"Crie sua conta"} />

        <TextInputComponent
          name={"nome"}
          text={"Nome de Usuário"}
          contentType={"text"}
          value={fields.name}
          onChangeFn={handleChange}
        />
        <TextInputComponent
          name={"email"}
          text={"Email"}
          contentType={"text"}
          value={fields.email}
          onChangeFn={handleChange}
        />

        <TextInputComponent
          name={"telefone"}
          text={"Telefone com DDD"}
          contentType={"text"}
          value={fields.contact_number}
          onChangeFn={handleChange}
        />

        <PasswordComponent
          name={"senha"}
          text={"Senha"}
          contentType={"password"}
          value={fields.password}
          visibility={visibility}
          onChangeFn={handleChange}
          onClickFn={handleClick}
        />

        <TextInputComponent
          name={"confirma_senha"}
          text={"Confirmar senha"}
          contentType={"password"}
          value={fields.password_confirmation}
          visibility={visibility}
          onChangeFn={handleChange}
        />

        <ConfirmButton text={"Cadastrar"} onClick={() => apiRequest(fields)} />
      </div>
    </div>
  );
}
