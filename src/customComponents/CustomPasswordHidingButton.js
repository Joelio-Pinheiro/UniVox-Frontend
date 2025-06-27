import {IconSetter} from "../utils/iconSetter";

export default function CustomPasswordHidingButton({name, onClickFn}) {
  const icon = IconSetter(name);
  return (
    <button type="button" name={name} onClick={onClickFn}>
      {icon}
    </button>
  );
}
