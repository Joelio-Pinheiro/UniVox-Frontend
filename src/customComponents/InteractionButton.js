import {Button} from "@mui/material";
import {buttonIconSetter} from "../utils/iconSetters";

export default function InteractionButton({counter, type, hidden, onClickFn}) {
  const icon = buttonIconSetter(type);
  return (
    <Button
      className="!w-min !h-min"
      variant={type === "comment" ? "text" : "outlined"}
      hidden={hidden}
      endIcon={icon}
      onClick={onClickFn}>
      {<p className="text-xs">{counter}</p>}
    </Button>
  );
}
