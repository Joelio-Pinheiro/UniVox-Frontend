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

  const getActiveClass = () => {
    if (!active) return "!border-gray-300 !text-gray-800 hover:!border-black";
    if (type === "likes") return "!border-blue-600 !text-blue-600";
    if (type === "dislikes") return "!border-red-600 !text-red-600";
    if (type === "comment") return "!border-green-600 !text-green-600";
    return "";
  };

  return (
    <Button
      className={`
        !min-w-0 !p-1 !m-0 !h-auto !rounded-md 
        sm:!px-2 sm:!py-1 
        ${getActiveClass()}
      `}
      variant="outlined"
      hidden={hidden}
      onClick={onClickFn}
    >
      {counter !== null ? (
        <>
          <span className="text-[10px] sm:text-xs mr-1">{counter}</span>
          {icon}
        </>
      ) : (
        <div className="flex justify-center items-center w-4 h-4 sm:w-5 sm:h-5">
          {icon}
        </div>
      )}
    </Button>
  );
}
