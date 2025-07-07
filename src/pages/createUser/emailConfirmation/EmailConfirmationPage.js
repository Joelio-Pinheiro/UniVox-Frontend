import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import CustomConfirmButton from "../../../customComponents/CustomConfirmButton";
import CustomCodeFragComponent from "../../../customComponents/CustomCodeFragComponent";
import CustomSnackbar from "../../../customComponents/CustomSnackbar";
import CustomPageHead from "../../../customComponents/CustomPageHead";
import UnivoxIcon from "../../../assets/UnivoxIcon.png";

export function EmailConfirmationPage() {
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

      await authService.accountConfirmation(code);
      navigate("/"); //redireciona para a home page, após o usuário terminar a verificação do email
    } catch (error) {
      setState({ open: true, text: error.message });
    }
  }

  async function apiNewCodeRequest() {
    try {
      await authService.newCodeRequest();
    } catch (error) {
      setState({ open: true, text: error.message });
    }
  }

  return (
    <div className="absolute -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col gap-[12vh] sm:gap-[16vh] md:gap-[16vh] lg:gap-[16vh] h-full w-10/12 sm:w-full md:w-full lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <CustomPageHead
          icon={UnivoxIcon}
          text={"Digite o código que enviamos para seu email"}
        />

        <div className="relative h-1/6 w-full flex items-center flex-col">
          <div className="relative flex items-center flex-row h-full w-10/12 gap-[3vh] sm:gap-[6vh] md:gap-[8vh] lg:gap-[8vh]">
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
        </div>

        <CustomConfirmButton
          text={"CONTINUAR"}
          onClick={() => apiRequest(codeFrags)}
        />

        <div className="relative">
          <p className=" text-center text-gray-500">
            Não recebeu o código?
            <span
              onClick={() => apiNewCodeRequest()}
              className=" text-[#106FE2] font-semibold"
            >
              Reenviar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
