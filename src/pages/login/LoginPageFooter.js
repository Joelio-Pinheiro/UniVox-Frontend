import { Link } from "react-router-dom";
import CustomConfirmButton from "../../customComponents/CustomConfirmButton";

export function LoginPageFooter({ onClickFn }) {
  return (
    <div className="relative flex items-center flex-col gap-[3vh]">
      <div className="relative">
        <CustomConfirmButton text={"Entrar"} onClick={onClickFn} />
      </div>

      <div className="relative">
        <p className=" text-center text-gray-500 text-base sm:text-lg md:text-lg lg:text-lg">
          Ainda não possui conta?
          <Link to="/register" className=" text-[#106FE2] font-semibold">
             Cadastrar-se
          </Link>
        </p>
      </div>
    </div>
  );
}
