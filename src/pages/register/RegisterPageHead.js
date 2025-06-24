import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import UnivoxIcon from "../../icons/UnivoxIcon.png";
import { useNavigate } from "react-router-dom";

export function RegisterPageHead() {
  const navigate = useNavigate();
  return (
    <div className="relative h-min w-max">
      <div className=" relative top-0 left-0 w-min h-min">
        <Button
          size="large"
          onClick={() => navigate("/")}
          startIcon={<ArrowBack sx={{ color: "black" }} />}
        />
      </div>
      <div className=" flex items-center flex-col relative h-min ">
        <img
          className=" relative w-28 h-24"
          src={UnivoxIcon}
          alt="Univox_label_2"
        />
        <h1 className=" relative text-center text-4xl font-medium">
          Crie sua conta
        </h1>
      </div>
    </div>
  );
}
