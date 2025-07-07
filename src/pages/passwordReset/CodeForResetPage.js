import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomConfirmButton from "../../customComponents/CustomConfirmButton";
import authService from "../../services/authService";
import CustomSnackbar from "../../customComponents/CustomSnackbar";
import CustomCodeFragComponent from "../../customComponents/CustomCodeFragComponent";
import CustomPageHead from "../../customComponents/CustomPageHead";
import UnivoxIcon from "../../assets/UnivoxIcon.png";

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
    <div className="absolute -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col mt-12 sm:mt-2 md:mt-2 lg:mt-2 gap-[2vh] sm:gap-[4vh] md:gap-[4vh] lg:gap-[4vh] h-full w-10/12 sm:w-full md:w-full lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />
        <CustomPageHead
          icon={UnivoxIcon}
          text={"Insira abaixo o código enviado"}
        />
        <div className="relative flex items-center flex-row gap-4">
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
        </div>
        <CustomConfirmButton
          text={"CONTINUAR"}
          onClick={() => apiRequest(codeFrags)}
        />
      </div>
    </div>
  );
}
