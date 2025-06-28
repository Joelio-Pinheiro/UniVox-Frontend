import { Link } from "react-router-dom";
import CustomConfirmButton from "../../customComponents/CustomConfirmButton";

export function LoginPageFooter({ onClickFn }) {
  return (
    <div className="relative flex items-center flex-col top-40">
      <div className="relative">
        <CustomConfirmButton text={"ENTRAR"} onClick={onClickFn} />
      </div>

      <div className="relative top-4">
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
