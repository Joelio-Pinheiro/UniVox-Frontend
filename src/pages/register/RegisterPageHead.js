import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import UnivoxIcon from "../../icons/UnivoxIcon.png";
import { useNavigate } from "react-router-dom";

export function RegisterPageHead() {
  const navigate = useNavigate();
  return (
    <div className=" flex items-center flex-col relative h-56 ">
      <Button onClick={() => navigate('/')} startIcon={<ArrowBack />}/>
      <img
        className=" relative top-4 w-40 h-28"
        src={UnivoxIcon}
        alt="Univox_label_2"
      />
      <h1 className=" relative text-center top-8 text-4xl font-medium">
        Crie na sua conta
      </h1>
    </div>
  );
}
