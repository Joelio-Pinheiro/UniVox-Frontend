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
      className={`
        !min-w-0 !p-1 !m-0 !h-auto !rounded-md 
        sm:!px-2 sm:!py-1 
        ${active ? "!border-blue-600 !text-blue-600" : "!border-black !text-black"}
      `}
      variant="outlined"
      hidden={hidden}
      endIcon={counter !== null ? icon : null}
      onClick={onClickFn}
    >
      <span className="text-[10px] sm:text-xs text-black">{counter}</span>
    </Button>
  );
}
