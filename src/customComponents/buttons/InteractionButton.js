import { Button } from "@mui/material";
import { buttonIconSetter } from "../../utils/iconSetters";

export default function InteractionButton({
  counter,
  type,
  hidden,
  onClickFn,
  active = false,
}) {
  const icon = buttonIconSetter(type);
  return (
    <Button
      className={`!w-min !h-min ${
        active ? "!border-blue-600 !text-blue-600" : "!border-black !text-black"
      }`}
      variant={type === "comment" ? "text" : "outlined"}
      hidden={hidden}
      //TO DO: refatorar essa lógica estranha
      endIcon={counter !== null ? icon : ""}
      onClick={onClickFn}
    >
      {<p className="text-xs text-black">{counter}</p>}
    </Button>
  );
}
