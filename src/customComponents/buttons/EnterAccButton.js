import { Button } from "@mui/material";

export default function EnterAccButton({onClickFn}){
  return (
    <Button
      className="!bg-white !py-1.5 !px-2 lg:!px-6 !border-[#106FE2]"
      variant="outlined"
      onClick={onClickFn}
    >
      {<p className="text-base font-light text-[#106FE2]">{"Entrar"}</p>}
    </Button>
  );
}