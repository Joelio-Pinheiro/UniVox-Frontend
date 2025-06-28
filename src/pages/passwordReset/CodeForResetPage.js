import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomConfirmButton from "../../customComponents/CustomConfirmButton";
import authService from "../../services/authService";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import CustomCodeFragComponent from "../../customComponents/CustomCodeFragComponent";
import CustomPageHead from "../../customComponents/CustomPageHead";

export function CodeForResetPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({ open: false, text: "" });
  const [codeFrags, setCodeFrags] = useState({
    firstDigit: "",
    secondDigit: "",
    thirdDigit: "",
    lastDigit: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCodeFrags((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onCloseFn() {
    setState({ open: false });
  }

  async function apiRequest(codeFrags) {
    try {
      //construção do código
      const code =
        codeFrags.firstDigit +
        codeFrags.secondDigit +
        codeFrags.thirdDigit +
        codeFrags.lastDigit;

      await authService.accountCodeForRecovery(code);
      navigate("/newpassword"); //redireciona para a página onde o usuário digita sua nova senha
    } catch (error) {
      setState({ open: true, text: error.message });
    }
  }
  return (
    <div className="flex items-center flex-col absolute -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <CustomSnackbar
        open={state.open}
        message={state.text}
        onCloseFn={onCloseFn}
      />

      <CustomPageHead text={"Insira abaixo o código que enviamos ao seu email"}/>

      <form>
        <CustomCodeFragComponent
          name={"firstDigit"}
          text={""}
          value={codeFrags.firstDigit}
          onChangeFn={handleChange}
        />
        <CustomCodeFragComponent
          name={"secondDigit"}
          text={""}
          value={codeFrags.secondDigit}
          onChangeFn={handleChange}
        />
        <CustomCodeFragComponent
          name={"thirdDigit"}
          text={""}
          value={codeFrags.thirdDigit}
          onChangeFn={handleChange}
        />
        <CustomCodeFragComponent
          name={"lastDigit"}
          text={""}
          value={codeFrags.lastDigit}
          onChangeFn={handleChange}
        />
      </form>

      <div className="relative flex items-center flex-col top-40">
        <CustomConfirmButton
          text={"CONTINUAR"}
          onClick={() => apiRequest(codeFrags)}
        />
      </div>
    </div>
  );
}
