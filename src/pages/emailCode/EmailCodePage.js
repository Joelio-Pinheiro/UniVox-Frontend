import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmailCodePageHead } from "./EmailCodePageHead.js";
import ConfirmButton from "../../customComponents/buttons/ConfirmButton.js";
import CustomSnackbar from "../../customComponents/CustomSnackbar.js";
import authService from "../../services/authService.js";
import UnivoxIcon from "../../assets/UnivoxIcon.png";
import CodeInputComponent from "../../customComponents/inputs/CodeInputComponent.js";

//essa página é usada tanto na confirmação do email
//após criação de conta; quanto para recuperação de senha
export function EmailCodePage() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  if (email === null) {
    navigate("/login");
  }

  const routeParam = useParams();
  const [state, setState] = useState({ open: false, text: "" });
  const [code, setCode] = useState({
    firstDigit: "",
    secondDigit: "",
    thirdDigit: "",
    lastDigit: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (value.length > 1) {
      //impede que usuário digite mais de um caractere por input
      return;
    }

    setCode((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onCloseFn() {
    setState({ open: false });
  }

  async function apiNewCodeRequest() {
    try {
      await authService.accountNewCodeRequest();
    } catch (error) {
      setState({ open: true, text: error.message });
    }
  }

  async function handleRouteParam() {
    let path;
    try {
      const confirmationCode =
        code.firstDigit + code.secondDigit + code.thirdDigit + code.lastDigit;

      switch (routeParam.type) {
        case "email-change":
          await authService.accountConfirmation("email-change", confirmationCode);
          path = "/login";
          break;
        case "password-change":
          await authService.accountConfirmation("", confirmationCode);
          path = "/newpassword/password-change";
          break;
        case "email-confirm":
          await authService.accountConfirmation("", confirmationCode);
          path = "/login";
          break;
        default:
          await authService.accountCodeForRecovery(confirmationCode);
          path = "/newpassword";
          break;
      }
      navigate(path);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="absolute flex items-center flex-col -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col gap-[12vh] h-full w-10/12 sm:w-6/12 md:w-6/12 lg:w-6/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <EmailCodePageHead
          icon={UnivoxIcon}
          title={"Verificação"}
          text={"Insira o código de 4 dígitos que você recebeu"}
        />

        <div className="relative w-full flex items-center flex-col">
          <div className="relative grid grid-cols-4 gap-[3vh] w-full sm:w-full md:w-full lg:w-9/12">
            <CodeInputComponent
              name={"firstDigit"}
              value={code.firstDigit}
              onChangeFn={handleChange}
            />

            <CodeInputComponent
              name={"secondDigit"}
              value={code.secondDigit}
              onChangeFn={handleChange}
            />

            <CodeInputComponent
              name={"thirdDigit"}
              value={code.thirdDigit}
              onChangeFn={handleChange}
            />

            <CodeInputComponent
              name={"lastDigit"}
              value={code.lastDigit}
              onChangeFn={handleChange}
            />
          </div>
        </div>

        <ConfirmButton text={"CONTINUAR"} onClick={() => handleRouteParam()} />

        <div className="relative">
          <p className=" text-center text-gray-500">
            Não recebeu o código?
            <span
              className="text-[#106FE2] font-semibold"
              onClick={() => apiNewCodeRequest()}
            >
              Reenviar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
