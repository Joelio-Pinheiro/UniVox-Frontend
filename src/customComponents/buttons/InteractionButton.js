import {Button} from "@mui/material";
import {buttonIconSetter} from "../../utils/iconSetters";

export default function InteractionButton({counter, type, hidden, onClickFn}) {
  const icon = buttonIconSetter(type);
  return (
    <Button
      className="!w-min !h-min !border-black"
      variant={type === "comment" ? "text" : "outlined"}
      hidden={hidden}
      startIcon={counter ? "" : icon}
      endIcon={counter !== null ? icon : ""}
      onClick={onClickFn}>
      {<p className="text-xs text-black">{counter}</p>}
    </Button>
  );
}
