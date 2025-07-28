import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteUserPageHead } from "./DeleteUserPageHead.js";
import ConfirmButton from "../../customComponents/buttons/ConfirmButton.js";
import CustomSnackbar from "../../customComponents/CustomSnackbar.js";
import authService from "../../services/authService.js";
import UnivoxIcon from "../../assets/UnivoxFullIcon.png";
import PasswordComponent from "../../customComponents/inputs/PasswordComponent.js";

export function DeleteUserPage() {
  const navigate = useNavigate();

  const [state, setState] = useState({ open: false, text: "" });
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState("invisible");

  function onClickFn() {
    setVisibility(visibility === "invisible" ? "visible" : "invisible");
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function onCloseFn() {
    setState({ open: false });
  }

  function handleClick() {
    apiRequest(password);
  }
  
  async function apiRequest(password) {
    try {
      await authService.deleteAccount(password);
      return navigate(`/login/`);
    } catch (error) {
      setState({ open: true, text: error.message });
    }
  }

  return (
    <div className="absolute flex items-center flex-col -translate-x-1/2 left-1/2 h-screen w-screen bg-white">
      <div className="relative flex items-center flex-col gap-[4vh] h-full w-11/12 sm:w-8/12 md:w-8/12 lg:w-8/12 bg-white">
        <CustomSnackbar
          open={state.open}
          message={state.text}
          onCloseFn={onCloseFn}
        />

        <DeleteUserPageHead
          icon={UnivoxIcon}
          text={"Digite sua senha abaixo para confirmar a remoção da conta."}
          warningText={"AVISO: ESSA AÇÃO É IRREVERSÍVEL"}
        />

        <div className="relative w-11/12 flex items-center flex-col gap-[16vh]">
          <PasswordComponent
            name={"password"}
            text={""}
            value={password}
            visibility={visibility}
            onClickFn={onClickFn}
            onChangeFn={handlePasswordChange}
          />

          <ConfirmButton
            text={"CONFIRMAR"}
            onClick={() => handleClick(password)}
          />
        </div>
      </div>
    </div>
  );
}
